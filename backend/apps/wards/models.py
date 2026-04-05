from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.system.models import Department

class Ward(models.Model):
    """
    🏥 Ward Unit Node. Represents a wing or floor within a department.
    """
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='wards')
    name = models.CharField(_("ward name"), max_length=100)
    code = models.CharField(_("ward code"), max_length=20, unique=True)
    floor = models.IntegerField(_("floor level"), default=1)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'hospital_clinical_wards'
        verbose_name = _("ward")
        verbose_name_plural = _("wards")

    def __str__(self):
        return f"{self.name} - {self.department.name}"

class Bed(models.Model):
    """
    🛏️ Individual Bed Allocation.
    """
    class BedType(models.TextChoices):
        GENERAL = 'general', _('General')
        ICU = 'icu', _('ICU')
        PRIVATE = 'private', _('Private')
        EMERGENCY = 'emergency', _('Emergency')

    class BedStatus(models.TextChoices):
        AVAILABLE = 'available', _('Available')
        OCCUPIED = 'occupied', _('Occupied')
        RESERVED = 'reserved', _('Reserved')
        MAINTENANCE = 'maintenance', _('Maintenance')

    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='beds')
    bed_number = models.CharField(_("bed number"), max_length=20)
    bed_type = models.CharField(max_length=20, choices=BedType.choices, default=BedType.GENERAL)
    status = models.CharField(max_length=20, choices=BedStatus.choices, default=BedStatus.AVAILABLE)
    patient = models.ForeignKey(
        'patients.PatientProfile',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='current_bed'
    )
    is_active = models.BooleanField(default=True)
    last_cleaned = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'hospital_clinical_beds'
        unique_together = ('ward', 'bed_number')
        verbose_name = _("bed")
        verbose_name_plural = _("beds")

    def __str__(self):
        return f"{self.ward.code}-{self.bed_number} ({self.status.upper()})"
