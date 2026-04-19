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

  • `cnic` is made the unique identifier (USERNAME_FIELD = 'cnic') because:
      - Hospitals identify patients by national identity, ensuring zero collision.
      - Standard protocol for high-fidelity identity verification.
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


import re

from django.core.exceptions import ValidationError

def normalize_cnic(cnic):
    """
    🏥 Identity Normalization Protocol
    Strips non-numeric artifacts (dashes, spaces) to ensure consistent lookups.
    Example: "35202-1234567-1" -> "3520212345671"
    """
    if not cnic:
        return ""
    return re.sub(r'[^0-9]', '', str(cnic))

def validate_cnic_format(value):
    """
    🛡️ Identity Validation Protocol
    1. Validates length (13 digits) or specific PK format (XXXXX-XXXXXXX-X).
    2. Normalizes to digits only.
    3. Handles error reporting for clinical identity shards.
    """
    if not value:
        raise ValidationError(_("CNIC is required for identity verification."))
    
    # Accept both raw 13 digits or the hyphenated format
    pattern = r'^\d{13}$|^\d{5}-\d{7}-\d{1}$'
    if not re.match(pattern, str(value)):
        raise ValidationError(_("Invalid CNIC format. Use 13 digits or XXXXX-XXXXXXX-X."))
    
    normalized = normalize_cnic(value)
    if len(normalized) != 13:
        raise ValidationError(_("CNIC must resolve to exactly 13 digits."))
    
    return normalized

class UserManager(BaseUserManager):
    """
    Custom manager for the User model where identity is verified via CNIC.
    """

    def create_user(self, email, cnic, password=None, **extra_fields):
        """
        Creates and saves a regular User with normalized identity shards.
        """
        if not email:
            raise ValueError(_("An email address is required for clinical reporting."))
        if not cnic:
            raise ValueError(_("A valid National ID (CNIC) is required for identity verification."))

        email = self.normalize_email(email)
        try:
            cnic = validate_cnic_format(cnic)
        except ValidationError as e:
            raise ValueError(str(e.message))

        user = self.model(email=email, cnic=cnic, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, cnic, password=None, **extra_fields):
        # Override for superuser
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("role", "admin")
        
        return self.create_user(email, cnic, password, **extra_fields)

class Role(models.TextChoices):
    """
    🏥 Clinical Hierarchy Shards
    """
    ADMIN = "admin", _("Administrator")
    DOCTOR = "doctor", _("Doctor")
    PATIENT = "patient", _("Patient")
    STAFF = "staff", _("Staff")

class AuthProvider(models.TextChoices):
    """
    🔐 Identity Stream Sources
    """
    LOCAL = "local", _("Local")
    GOOGLE = "google", _("Google")
    MAGIC_LINK = "magic_link", _("Magic Link")

class User(AbstractUser):
    """
    Custom User model where CNIC is the high-fidelity identity credential.
    """
    Role = Role
    AuthProvider = AuthProvider

    # ── Core Identity Shards ──────────────────────────────────────────────────

    cnic = models.CharField(
        max_length=15, 
        unique=True, 
        null=True,
        blank=True,
        help_text=_("National Identity Card Number (13 digits). Must be unique for each user."),
    )

    email = models.EmailField(
        _("email address"),
        unique=True,
        help_text=_("Required. Used for clinical alerts and notifications."),
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

    notify_on_all_logins = models.BooleanField(
        _("notify on all logins"),
        default=False,
        help_text=_("If enabled, receiving an email alert on every successful authentication."),
    )

    # ── Brute Force Protection Shards ─────────────────────────────────────────
    failed_login_attempts = models.IntegerField(default=0)
    is_locked = models.BooleanField(default=False)
    lock_until = models.DateTimeField(null=True, blank=True)

    def check_lock_status(self):
        """
        🧠 Evaluates if the identity shard is currently under suspension.
        Auto-releases lock if the cooling period has elapsed.
        """
        from django.utils import timezone
        if self.is_locked:
            if self.lock_until and timezone.now() > self.lock_until:
                self.is_locked = False
                self.failed_login_attempts = 0
                self.lock_until = None
                self.save()
                return False
            return True
        return False

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
    # Attach our custom manager
    objects = UserManager()

    # Tell Django to use cnic as the login field instead of email.
    USERNAME_FIELD = "cnic"

    # email and names are prompted during createsuperuser
    REQUIRED_FIELDS = ["email", "first_name", "last_name"]

    class Meta:
        app_label = "accounts"
        db_table = "hospital_users"
        ordering = ["-created_at"]
        verbose_name = _("user")
        verbose_name_plural = _("users")

    # ── Helper Properties ─────────────────────────────────────────────────────

    @property
    def full_name(self) -> str:
        """
        Returns the user's full name. Falls back to cnic if names are absent.
        """
        name = f"{self.first_name} {self.last_name}".strip()
        return name if name else self.cnic

    @property
    def is_admin(self) -> bool:
        """True if the user has the ADMIN role. Used in permission checks."""
        return self.role == Role.ADMIN

    @property
    def is_doctor(self) -> bool:
        """True if the user has the DOCTOR role."""
        return self.role == Role.DOCTOR

    @property
    def is_patient(self) -> bool:
        """True if the user has the PATIENT role."""
        return self.role == Role.PATIENT

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
    from ..doctors.models import Doctor
    from ..patients.models import PatientProfile
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

# ── Login Intelligence Shard: Risk Detection ──────────────────────────────────

class LoginRecord(models.Model):
    """
    🛡️ Authentication Telemetry Node
    Tracks every login attempt to build an identity profile and detect anomalies.
    """
    class RiskLevel(models.TextChoices):
        LOW    = "LOW",    _("Low Risk (Trusted Device/IP)")
        MEDIUM = "MEDIUM", _("Medium Risk (New IP or Device)")
        HIGH   = "HIGH",   _("High Risk (Suspicious Pattern)")

    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="login_history",
        help_text=_("Associated user shard.")
    )
    
    ip_address = models.GenericIPAddressField(_("IP Address"))
    user_agent = models.TextField(_("Device Signature (User-Agent)"))
    timestamp = models.DateTimeField(auto_now_add=True)
    
    risk_level = models.CharField(
        max_length=10, 
        choices=RiskLevel.choices, 
        default=RiskLevel.LOW
    )
    
    is_successful = models.BooleanField(default=True)

    class Meta:
        db_table = "security_login_records"
        ordering = ["-timestamp"]

def classify_login_risk(user, ip, user_agent):
    """
    🧠 Heuristic Risk Analysis Engine
    Compares the current login attempt against the user's historical identity shards.
    """
    from django.utils import timezone
    from datetime import timedelta

    # 🧪 Fetch historical trusted shards
    history = LoginRecord.objects.filter(user=user, is_successful=True).order_by('-timestamp')[:10]
    
    if not history.exists():
        return LoginRecord.RiskLevel.LOW  # First login is baseline

    # Check for exact matches (Trusted Context)
    last_login = history[0]
    is_same_ip = last_login.ip_address == ip
    is_same_device = last_login.user_agent == user_agent

    if is_same_ip and is_same_device:
        return LoginRecord.RiskLevel.LOW

    # 🛡️ Threshold Logic: New IP or Device
    if not is_same_ip or not is_same_device:
        # Check if they have USED this IP/Device before at all
        ever_used_ip = any(h.ip_address == ip for h in history)
        ever_used_device = any(h.user_agent == user_agent for h in history)

        if ever_used_ip or ever_used_device:
            return LoginRecord.RiskLevel.MEDIUM
        
        # High Risk: Completely unknown IP AND unknown Device
        # OR multiple failed attempts recently from this IP
        suspicious_attempts = LoginRecord.objects.filter(
            ip_address=ip, 
            timestamp__gte=timezone.now() - timedelta(minutes=30),
            is_successful=False
        ).count()

        if suspicious_attempts > 3:
            return LoginRecord.RiskLevel.HIGH
            
        return LoginRecord.RiskLevel.MEDIUM

    return LoginRecord.RiskLevel.LOW

class SecurityOTP(models.Model):
    """
    🔐 Higher-Order Identity Verification
    Transient codes for high-risk authentication intersections.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)

    class Meta:
        db_table = "security_otp_registry"
        ordering = ["-created_at"]

    @property
    def is_usable(self):
        from django.utils import timezone
        return not self.is_used and self.expires_at > timezone.now()

def generate_verification_otp(user):
    """
    🧠 Randomizes a 6-digit identity shard and persists it with short-term expiry (10m).
    """
    import random
    from django.utils import timezone
    from datetime import timedelta
    
    code = f"{random.randint(100000, 999999)}"
    expiry = timezone.now() + timedelta(minutes=10)
    
    return SecurityOTP.objects.create(
        user=user,
        otp_code=code,
        expires_at=expiry
    )
