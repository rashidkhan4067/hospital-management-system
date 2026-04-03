"""
apps/appointments/serializers.py
──────────────────────────────────
Serializers for the appointments app.

Serializers in this file:
  1. AppointmentCreateSerializer  — validates + books a new appointment
  2. AppointmentSerializer        — full read representation (nested patient + doctor)
  3. AppointmentCancelSerializer  — validates + cancels an existing appointment
"""

import datetime
from rest_framework import serializers
from django.utils import timezone

from apps.accounts.models import User
from apps.doctors.models import Doctor
from apps.doctors.serializers import DoctorListSerializer
from apps.accounts.serializers import UserSerializer
from .models import Appointment


# ─────────────────────────────────────────────────────────────────────────────
# 1. AppointmentCreateSerializer
# ─────────────────────────────────────────────────────────────────────────────

class AppointmentCreateSerializer(serializers.ModelSerializer):
    """
    Handles POST /api/v1/appointments/ and POST /api/v1/voice/book/

    Validates:
      - doctor exists and is currently available
      - appointment date is not in the past
      - appointment date falls on one of the doctor's available days
      - start_time falls within the doctor's consultation hours
      - start_time aligns with a slot boundary (e.g., every 30 minutes for a 30-min slot)
      - no conflicting appointment exists for that doctor + date + time (HTTP 409 on conflict)

    On success:
      - Calculates end_time from start_time + doctor.slot_duration_minutes
      - Sets patient from request.user automatically (not from request body)
      - Creates the Appointment
    """

    # doctor_id: integer FK passed by the client.
    # We filter to is_available=True so patients can't book unavailable doctors.
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.filter(is_available=True),
        source="doctor",                # Maps to the `doctor` FK on Appointment
        write_only=True,
        help_text="ID of the doctor to book. Must be an available doctor.",
    )

    # booked_via_voice: optional flag — voice pipeline sets this to True
    booked_via_voice = serializers.BooleanField(
        default=False,
        required=False,
    )

    class Meta:
        model = Appointment
        fields = [
            "id",
            "doctor_id",
            "appointment_date",
            "start_time",
            "notes",
            "booked_via_voice",
        ]
        read_only_fields = ["id"]

    def validate_appointment_date(self, value):
        """
        Field-level validator: appointment date must not be in the past.
        timezone.localdate() gives today's date in the Django TIME_ZONE (Asia/Karachi).
        """
        today = timezone.localdate()
        if value < today:
            raise serializers.ValidationError(
                "Appointment date cannot be in the past."
            )
        return value

    def validate(self, attrs):
        """
        Object-level validator — runs after all field-level validators pass.
        Performs business logic checks that need multiple field values.
        """
        doctor          = attrs["doctor"]
        appt_date       = attrs["appointment_date"]
        start_time      = attrs["start_time"]

        # ── Check 1: Doctor is accepting on that day of the week ──────────────
        # appt_date.strftime("%A") gives "Monday", "Tuesday", etc.
        day_name = appt_date.strftime("%A")
        if doctor.available_days and day_name not in doctor.available_days:
            raise serializers.ValidationError(
                {
                    "appointment_date": (
                        f"Dr. {doctor.user.full_name} is not available on {day_name}. "
                        f"Available days: {', '.join(doctor.available_days)}."
                    )
                }
            )

        # ── Check 2: start_time is within consultation hours ──────────────────
        if doctor.consultation_start_time and doctor.consultation_end_time:
            if not (doctor.consultation_start_time <= start_time < doctor.consultation_end_time):
                raise serializers.ValidationError(
                    {
                        "start_time": (
                            f"Consultation hours are "
                            f"{doctor.consultation_start_time.strftime('%H:%M')} – "
                            f"{doctor.consultation_end_time.strftime('%H:%M')}."
                        )
                    }
                )

        # ── Check 3: start_time aligns with slot boundaries ───────────────────
        # If slot is 30 min and start is 09:15, that is not a valid slot start.
        # We check: (start_time.hour*60 + start_time.minute) % slot_duration == 0
        total_minutes = start_time.hour * 60 + start_time.minute
        if total_minutes % doctor.slot_duration_minutes != 0:
            raise serializers.ValidationError(
                {
                    "start_time": (
                        f"Start time must align to a {doctor.slot_duration_minutes}-minute slot. "
                        f"Valid examples: 09:00, 09:{doctor.slot_duration_minutes:02d}."
                    )
                }
            )

        # ── Calculate end_time BEFORE conflict check ──────────────────────────
        # timedelta arithmetic on a time object requires combining with a dummy date
        dummy_date = datetime.date(2000, 1, 1)
        start_dt   = datetime.datetime.combine(dummy_date, start_time)
        end_dt     = start_dt + datetime.timedelta(minutes=doctor.slot_duration_minutes)
        end_time   = end_dt.time()
        attrs["end_time"] = end_time

        # ── Check 4: No conflicting appointment (application-level pre-check) ─
        # The actual race-condition-safe check uses select_for_update() in the view.
        # This pre-check runs here to give a fast validation error BEFORE hitting the DB lock.
        conflict_exists = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=appt_date,
            start_time=start_time,
        ).exclude(status=Appointment.Status.CANCELLED).exists()

        if conflict_exists:
            raise serializers.ValidationError(
                {
                    "start_time": (
                        "This time slot is already booked. "
                        "Please choose a different time."
                    )
                }
            )

        return attrs

    def create(self, validated_data):
        """
        Called after validation passes.
        patient is set from request.user — never from the request body.
        This prevents a patient from booking on behalf of another patient.
        """
        # Get the current user from request context (injected by the view)
        patient = self.context["request"].user
        validated_data["patient"] = patient
        return super().create(validated_data)

    def to_representation(self, instance):
        """
        After creation, return the full AppointmentSerializer representation
        (nested patient + doctor) instead of the flat input format.
        """
        return AppointmentSerializer(instance, context=self.context).data

class AdminAppointmentCreateSerializer(serializers.ModelSerializer):
    """
    🏢 Admin-only Appointment Creation
    Specialized serializer for provisioning visit shards via the administrative hub.
    Allows selecting both the patient and the doctor.
    """
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.all(),
        source="doctor",
        write_only=True
    )
    patient_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='patient'),
        source="patient",
        write_only=True
    )

    class Meta:
        model = Appointment
        fields = [
            "id", "doctor_id", "patient_id", 
            "appointment_date", "start_time", "notes"
        ]
        read_only_fields = ["id"]

    def validate(self, attrs):
        import datetime
        doctor = attrs.get('doctor')
        start_time = attrs.get('start_time')
        
        if doctor and start_time:
            dummy_date = datetime.date(2000, 1, 1)
            start_dt = datetime.datetime.combine(dummy_date, start_time)
            end_dt = start_dt + datetime.timedelta(minutes=doctor.slot_duration_minutes)
            attrs["end_time"] = end_dt.time()
            
        return attrs

    def create(self, validated_data):
        return super().create(validated_data)

    def to_representation(self, instance):
        return AppointmentSerializer(instance, context=self.context).data

# ─────────────────────────────────────────────────────────────────────────────
# 2. AppointmentSerializer
# ─────────────────────────────────────────────────────────────────────────────

class AppointmentSerializer(serializers.ModelSerializer):
    """
    Full read representation of an Appointment.
    Used for:
      - Response body after POST (booking confirmation)
      - GET /api/v1/appointments/mine/
      - GET /api/v1/admin/appointments/

    Nests patient and doctor objects for a rich response.
    is_upcoming and is_cancellable are derived from model @property fields
    and included here for frontend convenience (avoids duplicate logic in UI).
    """

    # Nested representations
    patient             = UserSerializer(read_only=True)
    doctor              = DoctorListSerializer(read_only=True)

    # Human-readable status label: "pending" → "Pending"
    status_display      = serializers.SerializerMethodField()

    # Computed properties from the model — included for frontend convenience
    is_upcoming         = serializers.SerializerMethodField()
    is_cancellable      = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = [
            "id",
            "patient",
            "doctor",
            "appointment_date",
            "start_time",
            "end_time",
            "status",
            "status_display",
            "notes",
            "doctor_notes",
            "cancellation_reason",
            "booked_via_voice",
            "is_upcoming",
            "is_cancellable",
            "created_at",
            "updated_at",
        ]
        read_only_fields = fields     # This serializer is read-only

    def get_status_display(self, obj) -> str:
        """Returns the human-readable label for the status choice."""
        return obj.get_status_display()

    def get_is_upcoming(self, obj) -> bool:
        """Delegates to the model @property."""
        return obj.is_upcoming

    def get_is_cancellable(self, obj) -> bool:
        """Delegates to the model @property."""
        return obj.is_cancellable


# ─────────────────────────────────────────────────────────────────────────────
# 3. AppointmentCancelSerializer
# ─────────────────────────────────────────────────────────────────────────────

class AppointmentCancelSerializer(serializers.ModelSerializer):
    """
    Handles PATCH /api/v1/appointments/{id}/cancel/

    Only accepts `cancellation_reason` in the request body.
    The view verifies the user is the appointment owner and calls .save()
    after setting status=CANCELLED.

    Design decision: PATCH (not DELETE) is used for cancellation because
    the appointment record must be preserved for medical audit purposes.
    Deleting records in a healthcare system is generally not acceptable.
    """

    cancellation_reason = serializers.CharField(
        required=False,
        allow_blank=True,
        help_text="Optional reason for cancellation.",
    )

    class Meta:
        model = Appointment
        fields = ["cancellation_reason"]

    def validate(self, attrs):
        """
        Check that the appointment can actually be cancelled.
        Uses the model's is_cancellable property.
        self.instance is set by the view before calling .is_valid().
        """
        if self.instance and not self.instance.is_cancellable:
            raise serializers.ValidationError(
                f"This appointment cannot be cancelled. "
                f"Current status: '{self.instance.get_status_display()}'."
            )
        return attrs

    def update(self, instance, validated_data):
        """
        Sets status to CANCELLED and saves the cancellation reason.
        Called by the view: serializer.save() → update(instance, validated_data).
        """
        instance.status = Appointment.Status.CANCELLED
        instance.cancellation_reason = validated_data.get("cancellation_reason", "")
        instance.save()
        return instance
