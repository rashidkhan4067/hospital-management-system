"""
apps/doctors/models.py
───────────────────────
Doctor model for the AI-Powered Hospital Management System.

Design decisions:
  • Doctor is a SEPARATE model from User, linked via a OneToOneField.
    This is the standard Django pattern for "profile" extensions — it keeps
    the User model clean and the Doctor model focused on medical data only.
    Alternative (adding doctor fields directly to User) would bloat the User
    model and make non-doctor users carry irrelevant NULL columns.

  • OneToOneField with on_delete=CASCADE means: if the User account is deleted,
    the Doctor profile is automatically deleted too. This prevents orphaned
    doctor records with no linked user.

  • `specialization` uses a predefined choices list so the frontend can render
    a dropdown, and the API can validate against known values instead of
    accepting free-text like "cardiologst" (typo).

  • `consultation_fee` uses DecimalField (not FloatField) because floating point
    arithmetic is imprecise for money (0.1 + 0.2 ≠ 0.3 in float).
    DecimalField stores exact decimal values in the database.

  • `available_days` is stored as a JSON array (e.g., ["Monday", "Wednesday"]).
    Alternative: a ManyToMany to a DayOfWeek model — over-engineered for FYP.
    JSONField gives flexibility while keeping the schema simple.

  • `is_available` is a quick toggle for admin to mark a doctor as on leave
    without deleting their profile or all their appointments.
"""

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings  # Use settings.AUTH_USER_MODEL, never import User directly


class Doctor(models.Model):
    """
    Doctor profile model. Every Doctor must have a corresponding User account
    with role='doctor'. This model stores medical/professional details only.
    """

    # ── Specialization Choices ────────────────────────────────────────────────
    # Predefined list of medical specializations.
    # Using choices allows API validation and frontend dropdown population.
    class Specialization(models.TextChoices):
        GENERAL          = "general",           _("General Physician")
        CARDIOLOGY       = "cardiology",        _("Cardiology")
        DERMATOLOGY      = "dermatology",       _("Dermatology")
        NEUROLOGY        = "neurology",         _("Neurology")
        ORTHOPEDICS      = "orthopedics",       _("Orthopedics")
        PEDIATRICS       = "pediatrics",        _("Pediatrics")
        PSYCHIATRY       = "psychiatry",        _("Psychiatry")
        GYNECOLOGY       = "gynecology",        _("Gynecology & Obstetrics")
        OPHTHALMOLOGY    = "ophthalmology",     _("Ophthalmology")
        ENT              = "ent",               _("ENT (Ear, Nose & Throat)")
        ONCOLOGY         = "oncology",          _("Oncology")
        RADIOLOGY        = "radiology",         _("Radiology")
        EMERGENCY        = "emergency",         _("Emergency Medicine")
        INTERNAL         = "internal",          _("Internal Medicine")
        DENTISTRY        = "dentistry",         _("Dentistry")

    # ── Link to User ──────────────────────────────────────────────────────────

    # OneToOneField: each User can have AT MOST one Doctor profile.
    # We reference settings.AUTH_USER_MODEL (not User directly) to avoid circular
    # import issues and to be compatible with any future User model swaps.
    # related_name="doctor_profile" lets us access a user's profile as:
    #   user_instance.doctor_profile  (instead of user_instance.doctor)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,           # Delete Doctor profile when User is deleted
        related_name="doctor_profile",      # Access via user.doctor_profile
        help_text=_("The user account associated with this doctor profile."),
    )

    # ── Professional Information ───────────────────────────────────────────────

    # Medical license number — must be unique across all doctors.
    # Used to verify credentials and prevent duplicate registrations.
    license_number = models.CharField(
        _("license number"),
        max_length=50,
        unique=True,
        help_text=_("Unique medical license number issued by PMDC (Pakistan)."),
    )

    # Specialization stored as a choice field.
    # Default is GENERAL so a doctor can be created without knowing specialization.
    specialization = models.CharField(
        _("specialization"),
        max_length=30,
        choices=Specialization.choices,
        default=Specialization.GENERAL,
        help_text=_("Medical specialization area."),
    )

    # Years of professional experience — used for profile display and filtering.
    # PositiveSmallIntegerField: 0-32767, perfect for years of experience.
    experience_years = models.PositiveSmallIntegerField(
        _("years of experience"),
        default=0,
        help_text=_("Total years of medical practice."),
    )

    # Consultation fee per appointment.
    # max_digits=8, decimal_places=2 supports up to 999,999.99 PKR.
    consultation_fee = models.DecimalField(
        _("consultation fee (PKR)"),
        max_digits=8,
        decimal_places=2,
        default=0.00,
        help_text=_("Fee charged per appointment in Pakistani Rupees."),
    )

    # ── Availability ──────────────────────────────────────────────────────────

    # Which days of the week this doctor is available.
    # Stored as a JSON array: ["Monday", "Wednesday", "Friday"]
    # JSONField is supported natively in Django 3.1+ with PostgreSQL.
    available_days = models.JSONField(
        _("available days"),
        default=list,           # Default: empty list (no days set yet)
        blank=True,
        help_text=_("List of days doctor is available. E.g. ['Monday', 'Wednesday']."),
    )

    # Start time of daily consultation hours.
    # TimeField stores HH:MM:SS — used together with end_time for slot generation.
    consultation_start_time = models.TimeField(
        _("consultation start time"),
        null=True,
        blank=True,
        help_text=_("Daily consultation start time. E.g. 09:00."),
    )

    # End time of daily consultation hours.
    consultation_end_time = models.TimeField(
        _("consultation end time"),
        null=True,
        blank=True,
        help_text=_("Daily consultation end time. E.g. 17:00."),
    )

    # Duration of each appointment slot in minutes.
    # Default 30 minutes is standard for outpatient consultations.
    slot_duration_minutes = models.PositiveSmallIntegerField(
        _("slot duration (minutes)"),
        default=30,
        help_text=_("Duration of each appointment slot in minutes."),
    )

    # Quick on/off switch — marks doctor as temporarily unavailable (e.g., on leave).
    # Admin can toggle this without deleting the profile.
    is_available = models.BooleanField(
        _("is available"),
        default=True,
        help_text=_("Uncheck to temporarily hide this doctor from booking."),
    )

    # Short biography for the patient-facing profile page.
    bio = models.TextField(
        _("biography"),
        blank=True,
        default="",
        help_text=_("Short professional biography displayed to patients."),
    )

    # Education credentials (degree, university).
    education = models.CharField(
        _("education"),
        max_length=255,
        blank=True,
        default="",
        help_text=_("Medical degree and institution (e.g. MBBS, King Edward Medical University)."),
    )

    # Physical clinic location.
    clinic_address = models.CharField(
        _("clinic address"),
        max_length=255,
        blank=True,
        default="",
        help_text=_("Physical address of the clinic or hospital wing."),
    )

    # ── Timestamps ────────────────────────────────────────────────────────────

    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text=_("When the doctor profile was created."),
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        help_text=_("When the doctor profile was last updated."),
    )

    class Meta:
        app_label = "doctors"
        db_table = "hospital_doctors"   # Explicit table name — avoids "doctors_doctor"
        ordering = ["user__first_name", "user__last_name"]  # Alpha order by name
        verbose_name = _("doctor")
        verbose_name_plural = _("doctors")

    def __str__(self) -> str:
        """
        Format: "Dr. Ahmed Khan — Cardiology"
        Shown in admin, shell, and log messages.
        """
        return f"Dr. {self.user.full_name} — {self.get_specialization_display()}"
