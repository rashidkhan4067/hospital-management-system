"""
apps/accounts/models.py
────────────────────────
Custom User model for the AI-Powered Hospital Management System.

Design decisions:
  • We extend AbstractUser instead of AbstractBaseUser because AbstractUser gives
    us the full Django auth plumbing (password hashing, permissions, admin
    integration, last_login, is_staff, etc.) for free. AbstractBaseUser is only
    needed when you want to completely replace all those fields — overkill here.

  • We add a `role` field with three choices: ADMIN, DOCTOR, PATIENT.
    Role-based access control (RBAC) is implemented in permissions.py using this
    field — no need for Django groups for a FYP-scale project.

  • `email` is made the unique identifier (USERNAME_FIELD = 'email') because:
      - Hospitals identify patients by email/ID, not by username handles.
      - Avoids the "what username did I register with?" support problem.
      - username field is still kept (required by AbstractUser) but set blank/null.

  • `phone_number` is stored as CharField not IntegerField because:
      - Phone numbers can start with 0 (e.g., 0300...) — integers drop leading zeros.
      - They may contain country codes (+92), spaces, or dashes.

  • `created_at` / `updated_at` on EVERY model is a production best-practice.
    Gives an audit trail without a separate audit log for basic debugging.
"""

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _  # For translatable strings


class UserManager(BaseUserManager):
    """
    Custom manager for the User model where email is the unique identifier
    instead of username.

    We override create_user and create_superuser so that:
      1. username is NOT required (it's optional in our model).
      2. email is always normalized (lowercased domain part).
      3. password is always hashed, never stored in plain text.
    """

    def create_user(self, email, password=None, **extra_fields):
        """
        Creates and saves a regular User with the given email and password.
        Called by register serializer and management commands.
        """
        if not email:
            # Raise immediately — an account without email is unusable
            raise ValueError(_("An email address is required to create a user."))

        # normalize_email lowercases the domain part: "User@GMAIL.COM" → "User@gmail.com"
        email = self.normalize_email(email)

        # extra_fields carries any additional model fields (role, first_name, etc.)
        user = self.model(email=email, **extra_fields)

        # set_password hashes the password using Django's configured hasher (PBKDF2 by default)
        user.set_password(password)
        user.save(using=self._db)  # using=self._db supports multi-database setups
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and saves a superuser (is_staff=True, is_superuser=True).
        Called by `python manage.py createsuperuser`.
        """
        # Force these fields on every superuser — cannot be overridden via CLI flags
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("role", "admin")  # Superusers always get admin role
        extra_fields.setdefault("auth_provider", "local") # Superusers are always local

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    """
    Custom User model that replaces Django's built-in User.
    All three user types (Admin, Doctor, Patient) share this model.
    Role-based permissions are enforced at the API layer via permissions.py.
    """

    # ── Role Choices ─────────────────────────────────────────────────────────
    # Using a nested class for choices keeps constants scoped to the model.
    # TextChoices stores human-readable labels alongside the DB value.
    class Role(models.TextChoices):
        ADMIN   = "admin",   _("Admin")    # Hospital administrator — full access
        DOCTOR  = "doctor",  _("Doctor")   # Medical professional — manage own schedule
        STAFF   = "staff",   _("Staff")    # Hospital support staff / desk
        PATIENT = "patient", _("Patient")  # Patient — book appointments, view own records

    class AuthProvider(models.TextChoices):
        LOCAL  = "local",  _("Local")
        GOOGLE = "google", _("Google")

    # ── Core Identity Fields ──────────────────────────────────────────────────

    # email is used as the login credential.
    # unique=True enforces one account per email at the database level.
    email = models.EmailField(
        _("email address"),
        unique=True,
        help_text=_("Required. Used as the login credential."),
    )

    # username is inherited from AbstractUser but we don't use it for login.
    # We keep it to avoid migration headaches with third-party packages that
    # expect the username field to exist on the User model.
    # blank=True, null=True makes it optional in forms and the database.
    username = models.CharField(
        _("username"),
        max_length=150,
        blank=True,       # Not required in forms / serializers
        null=True,        # Stored as NULL in the database (not an empty string)
        help_text=_("Optional display name. Not used for login."),
    )

    # ── Role Field ────────────────────────────────────────────────────────────

    # role is set at registration and drives all permission checks.
    # Default is PATIENT — the most common and least privileged account type.
    role = models.CharField(
        _("role"),
        max_length=10,
        choices=Role.choices,
        default=Role.PATIENT,
        help_text=_("Determines what the user can access in the system."),
    )

    auth_provider = models.CharField(
        _("authentication provider"),
        max_length=10,
        choices=AuthProvider.choices,
        default=AuthProvider.LOCAL,
        help_text=_("Identity stream source for authentication."),
    )

    onboarding_completed = models.BooleanField(
        _("onboarding completed"),
        default=False,
        help_text=_("Designates whether the user has completed the clinical onboarding flow."),
    )

    # ── Contact Information ───────────────────────────────────────────────────

    # Phone number stored as string to preserve leading zeros and international format.
    # blank=True allows creating users without a phone number (e.g., during seeding).
    phone_number = models.CharField(
        _("phone number"),
        max_length=20,
        blank=True,
        default="",
        help_text=_("Pakistani format: 0300-1234567 or +92-300-1234567"),
    )

    # ── Timestamps ────────────────────────────────────────────────────────────

    # auto_now_add sets the value once when the record is first created.
    # It cannot be overridden — the DB always records the true creation time.
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text=_("Timestamp when the account was created. Set automatically."),
    )

    # auto_now updates the value every time .save() is called.
    # Useful for knowing when a user last updated their profile.
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text=_("Timestamp of the last update. Updated automatically."),
    )

    # ── Django Auth Configuration ─────────────────────────────────────────────

    # Attach our custom manager — Django uses this for all User.objects.xxx() calls
    objects = UserManager()

    # Tell Django to use email as the login field instead of username.
    # This affects the admin login page and authenticate() calls.
    USERNAME_FIELD = "email"

    # REQUIRED_FIELDS: fields prompted when creating a superuser via `createsuperuser`.
    # email is excluded here because it is already USERNAME_FIELD.
    # username is excluded because we made it optional (blank=True, null=True).
    REQUIRED_FIELDS = ["first_name", "last_name"]

    class Meta:
        # app_label must match the `label` in AccountsConfig (apps.py).
        app_label = "accounts"

        # db_table: explicit table name in the database.
        # We use "hospital_users" instead of "users" because Supabase's own
        # auth system already owns a "users" table in the public schema.
        # Colliding with it causes a ProgrammingError during migrate.
        db_table = "hospital_users"

        # Ordering: newest users first in admin list views and querysets.
        ordering = ["-created_at"]

        verbose_name = _("user")
        verbose_name_plural = _("users")

    # ── Helper Properties ─────────────────────────────────────────────────────

    @property
    def full_name(self) -> str:
        """
        Returns the user's full name as a single string.
        Falls back to email if first_name and last_name are not set.
        Used in __str__ and API serializer display fields.
        """
        name = f"{self.first_name} {self.last_name}".strip()
        return name if name else self.email

    @property
    def is_admin(self) -> bool:
        """True if the user has the ADMIN role. Used in permission checks."""
        return self.role == self.Role.ADMIN

    @property
    def is_doctor(self) -> bool:
        """True if the user has the DOCTOR role."""
        return self.role == self.Role.DOCTOR

    @property
    def is_patient(self) -> bool:
        """True if the user has the PATIENT role."""
        return self.role == self.Role.PATIENT

    # ── Required Methods ──────────────────────────────────────────────────────

    def __str__(self) -> str:
        """
        String representation used in Django admin, shell, and log messages.
        Format: "Full Name (role)" — e.g. "Dr. Ahmed Khan (doctor)"
        """
        return f"{self.full_name} ({self.role})"


# ── Signals: Automated Clinical Provisioning ──────────────────────────────────
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Electronic Health Record (EHR) & Practitioner Node auto-provisioning.
    Ensures that every user has the appropriate specialized profile based on role.
    """
    from apps.doctors.models import Doctor
    from apps.patients.models import PatientProfile
    import uuid

    if created:
        # 🧪 Only create on initial signup (Google or Manual)
        if instance.role == User.Role.DOCTOR:
            Doctor.objects.get_or_create(
                user=instance,
                defaults={
                    'license_number': f"PROV-{uuid.uuid4().hex[:8].upper()}",
                    'specialization': 'general'
                }
            )
        elif instance.role == User.Role.PATIENT:
            PatientProfile.objects.get_or_create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Sync logic if profiles need to be updated alongside user."""
    pass
