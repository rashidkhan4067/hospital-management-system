"""
apps/appointments/models.py
────────────────────────────
Appointment model for the AI-Powered Hospital Management System.

Design decisions:
  • Appointment links Patient (User) and Doctor via ForeignKey, not
    OneToOneField, because one patient can have MANY appointments and one
    doctor can have MANY appointments.

  • on_delete=PROTECT on the Patient FK means: we CANNOT delete a patient user
    if they have appointments. This is intentional — medical records (including
    appointments) must be preserved for compliance. If you want to allow deletion,
    change to SET_NULL with null=True, but that loses the patient link forever.

  • on_delete=PROTECT on the Doctor FK: same reasoning — past appointments must
    remain even if a doctor leaves the hospital.

  • `appointment_date` and `start_time` are stored separately instead of a single
    DateTimeField. Reason: querying "all appointments on Monday" or "all slots
    for Dr. X on 2024-03-15" is simpler with separate fields. The conflict check
    also becomes a clean query: filter(doctor=doctor, date=date, start_time=start).

  • `end_time` is calculated from start_time + doctor.slot_duration_minutes and
    stored (not computed on read) so conflict queries can use:
    Q(start_time__lt=end_time) & Q(end_time__gt=start_time) — the overlap formula.

  • STATUS choices follow a clear state machine:
    PENDING → CONFIRMED → COMPLETED
    PENDING → CANCELLED
    CONFIRMED → CANCELLED

  • `booked_via_voice` flag tracks AI-booked appointments for analytics and
    audit — lets the hospital know how many bookings came through the voice pipeline.

  • `notes` is for the patient to add symptoms/reason for visit.
    `doctor_notes` is for the doctor's post-appointment notes (locked to patient).
"""

from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.conf import settings


class IdempotencyKey(models.Model):
    """
    Architecture Principle: API Idempotency.
    Stores UUID keys sent by the client in the `Idempotency-Key` header.
    Prevents duplicate POST processing (e.g., if a client retries a booking due to network timeout).
    """
    key = models.CharField(max_length=100, unique=True, help_text="The idempotency key from the client.")
    created_at = models.DateTimeField(auto_now_add=True)
    # We could store the response body/status here to replay it, but for a 
    # simple FYP, just detecting the duplicate key is enough to return a 409.
    
    class Meta:
        app_label = "appointments"
        db_table = "hospital_idempotency_keys"


class Appointment(models.Model):
    """
    Represents a scheduled appointment between a patient and a doctor.
    Core entity of the hospital management system.
    Conflict detection uses transaction.atomic() + select_for_update() in views.py.
    """

    # ── Status Choices ────────────────────────────────────────────────────────

    class Status(models.TextChoices):
        PENDING    = "pending",    _("Pending")     # Booked, awaiting confirmation
        CONFIRMED  = "confirmed",  _("Confirmed")   # Doctor/admin confirmed the slot
        COMPLETED  = "completed",  _("Completed")   # Appointment has taken place
        CANCELLED  = "cancelled",  _("Cancelled")   # Cancelled by patient or admin

    # ── Relationships ─────────────────────────────────────────────────────────

    # The patient who booked this appointment.
    # ForeignKey allows one patient to have many appointments.
    # PROTECT prevents deleting a patient who has existing appointments.
    # related_name="appointments" allows: patient_user.appointments.all()
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,               # Can't delete user with appointments
        related_name="appointments",            # patient_user.appointments.all()
        help_text=_("The patient who booked this appointment."),
        limit_choices_to={"role": "patient"},   # DB-level hint: only patients book
    )

    # The doctor for this appointment.
    # PROTECT prevents deleting a doctor who has scheduled appointments.
    # related_name="doctor_appointments" allows: doctor.doctor_appointments.all()
    doctor = models.ForeignKey(
        "doctors.Doctor",                       # String reference avoids circular import
        on_delete=models.PROTECT,               # Can't delete doctor with appointments
        related_name="doctor_appointments",     # doctor_instance.doctor_appointments.all()
        help_text=_("The doctor this appointment is with."),
    )

    # ── Scheduling Fields ─────────────────────────────────────────────────────

    # Date of the appointment. Separate from time for easier date-based queries.
    appointment_date = models.DateField(
        _("appointment date"),
        help_text=_("The date of the appointment (YYYY-MM-DD)."),
    )

    # Start time of the appointment slot.
    # Stored separately so we can query: "all 9:00 AM slots for Dr. X".
    start_time = models.TimeField(
        _("start time"),
        help_text=_("Appointment start time (HH:MM)."),
    )

    # End time calculated from start_time + doctor.slot_duration_minutes.
    # Stored explicitly so overlap queries work without computation:
    # Overlap condition: existing.start_time < new.end_time AND existing.end_time > new.start_time
    end_time = models.TimeField(
        _("end time"),
        help_text=_("Appointment end time (HH:MM). Set automatically from slot duration."),
    )

    class PaymentStatus(models.TextChoices):
        UNPAID         = "unpaid",         _("Unpaid")
        PARTIALLY_PAID = "partially_paid", _("Partially Paid")
        FULLY_PAID     = "fully_paid",     _("Fully Paid")
        REFUNDED       = "refunded",       _("Refunded")

    status = models.CharField(
        _("status"),
        max_length=10,
        choices=Status.choices,
        default=Status.PENDING,
        help_text=_("Current status of the appointment."),
    )

    payment_status = models.CharField(
        _("payment status"),
        max_length=20,
        choices=PaymentStatus.choices,
        default=PaymentStatus.UNPAID,
        help_text=_("Transaction status of this appointment."),
    )

    class Priority(models.TextChoices):
        ROUTINE = "routine", _("Routine")
        URGENT = "urgent", _("Urgent (24h)")
        EMERGENCY = "emergency", _("Emergency (Immediate)")
        
    priority = models.CharField(max_length=15, choices=Priority.choices, default=Priority.ROUTINE)
    
    class AppointmentType(models.TextChoices):
        IN_PERSON = "in_person", _("In-Person Consultation")
        TELEHEALTH = "telehealth", _("Telehealth/Virtual")
        FOLLOW_UP = "follow_up", _("Follow-up Review")
        
    appointment_type = models.CharField(max_length=20, choices=AppointmentType.choices, default=AppointmentType.IN_PERSON)

    # ── Content Fields ────────────────────────────────────────────────────────

    # Patient's reason for the appointment (symptoms, concerns).
    # blank=True: not required — some patients may not fill this in.
    notes = models.TextField(
        _("patient notes"),
        blank=True,
        default="",
        help_text=_("Patient's symptoms, concerns, or reason for visit."),
    )

    # Doctor's notes written after the appointment is completed.
    # Blank until the appointment is marked COMPLETED.
    doctor_notes = models.TextField(
        _("doctor notes"),
        blank=True,
        default="",
        help_text=_("Doctor's post-appointment notes. Only visible to doctor and admin."),
    )

    # ── AI Voice Booking Flag ─────────────────────────────────────────────────

    # Tracks whether this appointment was booked via the voice AI pipeline.
    # Used for analytics: "X% of bookings came through voice interface."
    booked_via_voice = models.BooleanField(
        _("booked via voice"),
        default=False,
        help_text=_("True if this appointment was booked using the AI voice pipeline."),
    )

    # ── Cancellation Reason ───────────────────────────────────────────────────

    # Optional reason when status changes to CANCELLED.
    # Useful for patient feedback and admin reporting.
    cancellation_reason = models.TextField(
        _("cancellation reason"),
        blank=True,
        default="",
        help_text=_("Reason provided when the appointment was cancelled."),
    )

    # ── Timestamps ────────────────────────────────────────────────────────────

    # When the appointment was booked.
    created_at = models.DateTimeField(
        default=timezone.now,
        help_text=_("When the appointment was booked."),
    )

    # When the appointment record was last modified.
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text=_("When the appointment was last updated."),
    )

    class Meta:
        app_label = "appointments"
        db_table = "hospital_appointments"      # Explicit table name

        # Composite unique constraint: a doctor can only have ONE appointment
        # at any given date+start_time. This is the DB-level conflict guard.
        # The application-level guard (select_for_update) is in views.py.
        # Both layers are needed: the DB constraint catches race conditions
        # that slip through the application check.
        constraints = [
            models.UniqueConstraint(
                fields=["doctor", "appointment_date", "start_time"],
                name="unique_doctor_slot",
                # Error message shown when this constraint is violated:
                violation_error_message=_(
                    "This doctor already has an appointment at this date and time."
                ),
            )
        ]

        # Default sort: upcoming appointments first, then by time within a day.
        ordering = ["appointment_date", "start_time"]

        verbose_name = _("appointment")
        verbose_name_plural = _("appointments")

    def __str__(self) -> str:
        """
        Format: "Ahmed Khan → Dr. Smith — 2024-03-15 at 10:00"
        Used in admin, shell, and log messages.
        """
        return (
            f"{self.patient.full_name} → {self.doctor} "
            f"— {self.appointment_date} at {self.start_time.strftime('%H:%M')}"
        )

    # ── Helper Properties ─────────────────────────────────────────────────────

    @property
    def is_upcoming(self) -> bool:
        """
        True if the appointment is in the future and not cancelled/completed.
        Used in serializers to filter "my upcoming appointments".
        """
        from django.utils import timezone
        import datetime

        now = timezone.localdate()
        return (
            self.appointment_date >= now
            and self.status in [self.Status.PENDING, self.Status.CONFIRMED]
        )

    @property
    def is_cancellable(self) -> bool:
        """
        True if the appointment can still be cancelled.
        Only PENDING and CONFIRMED appointments can be cancelled.
        COMPLETED and already-CANCELLED appointments cannot.
        """
        return self.status in [self.Status.PENDING, self.Status.CONFIRMED]
