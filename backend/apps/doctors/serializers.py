"""
apps/doctors/serializers.py
────────────────────────────
Serializers for the doctors app.

Serializers in this file:
  1. DoctorSerializer      — full CRUD representation (admin use, includes nested user)
  2. DoctorListSerializer  — lightweight list representation for patients browsing doctors
  3. DoctorCreateSerializer — handles creating a Doctor profile linked to an existing User
"""

from rest_framework import serializers
from django.conf import settings

from apps.accounts.serializers import UserSerializer
from apps.accounts.models import User
from .models import Doctor


# ─────────────────────────────────────────────────────────────────────────────
# 1. DoctorSerializer
# ─────────────────────────────────────────────────────────────────────────────

class DoctorSerializer(serializers.ModelSerializer):
    """
    Full detail serializer for a Doctor.
    Used for:
      - GET /api/v1/doctors/{id}/   (patient view — full detail)
      - PUT /api/v1/doctors/{id}/   (admin update)

    Nests UserSerializer so the response includes the doctor's personal info
    without exposing the raw user FK integer. Patients see one clean object.

    Example response:
    {
        "id": 1,
        "user": { "id": 2, "email": "...", "full_name": "Dr. Ahmed", ... },
        "specialization": "cardiology",
        "specialization_display": "Cardiology",
        "experience_years": 10,
        "consultation_fee": "1500.00",
        "is_available": true,
        ...
    }
    """

    # Nested user object — read_only because user FK is set at creation, not updated here
    user = UserSerializer(read_only=True)

    # Human-readable label for the specialization choice code.
    # e.g. "cardiology" → "Cardiology".
    # SerializerMethodField because get_specialization_display() is a Django method.
    specialization_display = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = [
            "id",
            "user",
            "license_number",
            "specialization",
            "specialization_display",
            "experience_years",
            "consultation_fee",
            "available_days",
            "consultation_start_time",
            "consultation_end_time",
            "slot_duration_minutes",
            "is_available",
            "bio",
            "education",
            "clinic_address",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def get_specialization_display(self, obj) -> str:
        """Returns the human-readable label for the specialization choice."""
        return obj.get_specialization_display()

    def validate_consultation_fee(self, value):
        """
        Field-level validator for consultation_fee.
        Fee must be a positive number — a fee of 0 or negative makes no sense.
        """
        if value < 0:
            raise serializers.ValidationError(
                "Consultation fee cannot be negative."
            )
        return value

    def validate_available_days(self, value):
        """
        Field-level validator for available_days.
        Ensures only valid day names are stored — prevents typos like "Mondy".
        """
        valid_days = {
            "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday", "Sunday",
        }
        if not isinstance(value, list):
            raise serializers.ValidationError(
                "available_days must be a list of day names."
            )
        invalid = [day for day in value if day not in valid_days]
        if invalid:
            raise serializers.ValidationError(
                f"Invalid days: {invalid}. Must be full day names like 'Monday'."
            )
        return value

    def validate(self, attrs):
        """
        Object-level validator.
        If both start and end times are provided, end must be after start.
        This ensures we don't store impossible schedules (e.g., 5 PM → 9 AM).
        """
        start = attrs.get("consultation_start_time")
        end   = attrs.get("consultation_end_time")

        if start and end and end <= start:
            raise serializers.ValidationError(
                {"consultation_end_time": "End time must be after start time."}
            )
        return attrs


# ─────────────────────────────────────────────────────────────────────────────
# 2. DoctorListSerializer
# ─────────────────────────────────────────────────────────────────────────────

class DoctorListSerializer(serializers.ModelSerializer):
    """
    Lightweight serializer for the doctor list view.
    Used for GET /api/v1/doctors/ — returns only the fields
    a patient needs to browse and choose a doctor.

    Keeps the list response small by excluding bio, timestamps, and admin fields.
    The full detail (DoctorSerializer) is only fetched when a patient
    clicks on a specific doctor.
    """

    # Flatten the user fields directly into the doctor object
    # instead of nesting. Avoids frontend having to do response.user.full_name
    full_name         = serializers.CharField(source="user.full_name", read_only=True)
    email             = serializers.EmailField(source="user.email", read_only=True)
    specialization_display = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = [
            "id",
            "full_name",
            "email",
            "specialization",
            "specialization_display",
            "experience_years",
            "consultation_fee",
            "available_days",
            "consultation_start_time",
            "consultation_end_time",
            "is_available",
            "bio",
            "education",
            "clinic_address",
        ]

    def get_specialization_display(self, obj) -> str:
        return obj.get_specialization_display()


# ─────────────────────────────────────────────────────────────────────────────
# 3. DoctorCreateSerializer
# ─────────────────────────────────────────────────────────────────────────────

class DoctorCreateSerializer(serializers.ModelSerializer):
    """
    Used by admins to create a new Doctor profile.
    Handles POST /api/v1/doctors/

    Requires a `user_id` — the admin must first create a User account
    with role='doctor', then link it to a Doctor profile via this serializer.

    Design decision: we separate User creation from Doctor profile creation
    because an admin may need to create the user first, verify the email,
    and then add the medical profile details.
    """

    # user_id: integer FK — admin passes the ID of an existing User with role=doctor
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role=User.Role.DOCTOR),
        source="user",                  # Maps to the `user` FK field on Doctor
        write_only=True,                # Only used for input, not shown in output
        help_text="ID of an existing User account with role='doctor'.",
    )

    class Meta:
        model = Doctor
        fields = [
            "id",
            "user_id",
            "license_number",
            "specialization",
            "experience_years",
            "consultation_fee",
            "available_days",
            "consultation_start_time",
            "consultation_end_time",
            "slot_duration_minutes",
            "is_available",
            "bio",
            "education",
            "clinic_address",
        ]
        read_only_fields = ["id"]

    def validate_user_id(self, user):
        """
        Check that the selected user does not already have a Doctor profile.
        Prevents creating two Doctor profiles for the same user.
        `user` here is already a User instance (DRF resolves PrimaryKeyRelatedField).
        """
        if hasattr(user, "doctor_profile"):
            raise serializers.ValidationError(
                "This user already has a Doctor profile linked to their account."
            )
        return user

    def validate_consultation_fee(self, value):
        """Fee must not be negative."""
        if value < 0:
            raise serializers.ValidationError("Consultation fee cannot be negative.")
        return value

    def validate_available_days(self, value):
        """Validate day names are correct English day names."""
        valid_days = {
            "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday", "Sunday",
        }
        if not isinstance(value, list):
            raise serializers.ValidationError("available_days must be a list.")
        invalid = [d for d in value if d not in valid_days]
        if invalid:
            raise serializers.ValidationError(f"Invalid days: {invalid}.")
        return value

    def to_representation(self, instance):
        """
        After creation, return the full DoctorSerializer representation
        (with nested user data) instead of the flat create input format.
        This means the API response after POST shows the complete doctor object.
        """
        return DoctorSerializer(instance, context=self.context).data
