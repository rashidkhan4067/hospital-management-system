from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

class Department(models.Model):
    """
    Clinical Unit Node. Represents a medical department.
    """
    name = models.CharField(_("unit name"), max_length=100)
    code = models.CharField(_("unit code"), max_length=10, unique=True)
    description = models.TextField(_("description"), blank=True)
    head = models.ForeignKey(
        'doctors.Doctor',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='headed_departments'
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'hospital_system_departments'

    def __str__(self):
        return f"{self.name} ({self.code})"

class GlobalAlert(models.Model):
    """
    System-wide announcement sharding.
    """
    class Priority(models.TextChoices):
        INFO = 'info', _('Information')
        WARNING = 'warning', _('Warning')
        CRITICAL = 'critical', _('Critical Payload')

    title = models.CharField(max_length=200)
    message = models.TextField()
    priority = models.CharField(max_length=10, choices=Priority.choices, default=Priority.INFO)
    issuer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    expires_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'hospital_system_alerts'

class SecurityAuditLog(models.Model):
    """
    Immutable ledger of administrative actions.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=255)
    resource = models.CharField(max_length=100)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    status = models.CharField(max_length=20) # Success, Failure
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'hospital_system_audit_logs'

class SystemConfig(models.Model):
    """
    Global system topology and operational flags.
    """
    key = models.CharField(max_length=100, unique=True)
    value = models.JSONField()
    description = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'hospital_system_config'
