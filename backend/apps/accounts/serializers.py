"""
apps/accounts/serializers.py
─────────────────────────────
Serializers for the accounts app.

Serializers sit between the HTTP request/response layer and the model layer.
They validate incoming JSON, convert it to Python objects, call model methods,
and convert model instances back to JSON for responses.

Serializers in this file:
  1. UserRegisterSerializer  — validate + create a new User account
  2. UserSerializer          — read-only representation of a User (used in nested output)
  3. ChangePasswordSerializer — validate + change a user's own password
"""

from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import User


# ─────────────────────────────────────────────────────────────────────────────
# 1. UserRegisterSerializer
# ─────────────────────────────────────────────────────────────────────────────

class UserRegisterSerializer(serializers.ModelSerializer):
    """
    Handles POST /api/v1/auth/register/

    Validates:
      - email must be unique
      - password meets Django's validators (min 8 chars, not common, not numeric)
      - password and confirm_password must match
      - role can only be 'patient' or 'doctor' (not 'admin' via API — admins are created via CLI)

    On success: creates and returns a User with hashed password.
    """

    # email: add UniqueValidator so the error message is returned at the field
    # level ("email: This email is already registered.") not as a non-field error.
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="An account with this email already exists.",
            )
        ],
    )

    # password: write_only=True means it is NEVER returned in any response.
    # This prevents password hashes from leaking in API responses.
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"},  # Renders as password field in browsable API
    )

    # confirm_password: only exists for validation — not a model field.
    # write_only=True ensures it is never echoed back in the response.
    confirm_password = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"},
    )

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "role",
            "password",
            "confirm_password",
        ]
        # id is returned in the response so the frontend knows the new user's ID
        read_only_fields = ["id"]
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name":  {"required": True},
        }

    def validate_role(self, value):
        """
        Field-level validator for `role`.
        Rejects 'admin' role at registration — admins must be created via CLI.
        This prevents privilege escalation: a malicious user cannot POST role=admin.
        """
        if value == User.Role.ADMIN:
            raise serializers.ValidationError(
                "Admin accounts cannot be created via the registration API."
            )
        return value

    def validate_password(self, value):
        """
        Field-level validator for `password`.
        Runs Django's built-in password validators (length, common passwords, numeric).
        We call validate_password() here so clear field-level errors are returned.
        """
        try:
            validate_password(value)
        except DjangoValidationError as e:
            # e.messages is a list of individual error strings
            raise serializers.ValidationError(list(e.messages))
        return value

    def validate(self, attrs):
        """
        Object-level validator (runs AFTER all field validators).
        Used for cross-field validation: confirm_password must match password.
        Object-level errors appear under the "non_field_errors" key in the response.
        """
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."}
            )
        return attrs

    def create(self, validated_data):
        """
        Called after all validation passes.
        Removes confirm_password (not a model field) and creates the User
        using our custom manager's create_user() which hashes the password.
        """
        # Remove confirm_password — it is only for validation, not stored in DB
        validated_data.pop("confirm_password")

        # Use the custom manager to create the user with hashed password
        # create_user() is defined in UserManager and calls set_password() internally
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            phone_number=validated_data.get("phone_number", ""),
            role=validated_data.get("role", User.Role.PATIENT),
        )
        return user

class UserAdminCreateSerializer(serializers.ModelSerializer):
    """
    🏢 Admin-only User Creation
    Specialized serializer for provisioning identities via the administrative hub.
    Allows creating any role, including specialized faculty and administrative staff.
    """
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            'email', 'first_name', 'last_name', 
            'phone_number', 'role', 'password', 'confirm_password'
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        from apps.doctors.models import Doctor
        from apps.patients.models import Patient
        
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        
        # 🧪 Automatic Profile Provisioning
        if user.role == User.Role.DOCTOR:
            # Generate temporary license number to avoid DB constraint failures
            import uuid
            Doctor.objects.create(
                user=user, 
                license_number=f"TEMP-{uuid.uuid4().hex[:8].upper()}",
                specialization=Doctor.Specialization.GENERAL
            )
        elif user.role == User.Role.PATIENT:
            Patient.objects.create(user=user)
            
        return user

# ─────────────────────────────────────────────────────────────────────────────
# 2. UserSerializer
# ─────────────────────────────────────────────────────────────────────────────

class UserSerializer(serializers.ModelSerializer):
    """
    Read-only representation of a User.

    Used in:
      - Response body after successful registration / login
      - Nested inside DoctorSerializer (to show doctor's user details)
      - Profile endpoints (GET /api/v1/auth/me/ — future extension)

    `full_name` is a SerializerMethodField because it is a model @property
    (not a DB column) — DRF cannot auto-detect @property fields.
    """

    # Returns user.full_name (first_name + last_name, falls back to email)
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "full_name",
            "first_name",
            "last_name",
            "phone_number",
            "role",
            "is_active",
            "created_at",
        ]
        # All fields are read-only in this serializer — it is output-only
        read_only_fields = fields

    def get_full_name(self, obj) -> str:
        """
        SerializerMethodField handler.
        Must be named get_<field_name> — DRF calls this automatically.
        """
        return obj.full_name


# ─────────────────────────────────────────────────────────────────────────────
# 3. ChangePasswordSerializer
# ─────────────────────────────────────────────────────────────────────────────

class ChangePasswordSerializer(serializers.Serializer):
    """
    Handles PATCH /api/v1/auth/change-password/
    (future endpoint — serializer is ready for Phase D)

    Not a ModelSerializer because we don't create/update a model directly —
    we call user.set_password() manually after validation.

    Validates:
      - old_password must match the user's current password
      - new_password meets Django's validators
      - confirm_new_password must match new_password
    """

    old_password = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"},
    )

    new_password = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"},
    )

    confirm_new_password = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"},
    )

    def validate_old_password(self, value):
        """
        Verify the old password is correct.
        `self.context["request"].user` gives us the currently authenticated user.
        check_password() compares the plain-text value against the stored hash.
        """
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value

    def validate_new_password(self, value):
        """Run Django's password validators on the new password."""
        try:
            validate_password(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value

    def validate(self, attrs):
        """Cross-field: new passwords must match."""
        if attrs["new_password"] != attrs["confirm_new_password"]:
            raise serializers.ValidationError(
                {"confirm_new_password": "New passwords do not match."}
            )
        return attrs

    def save(self, **kwargs):
        """
        Called by the view after validation.
        Sets the new hashed password and saves the user.
        """
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password"])
        user.save()
        return user
