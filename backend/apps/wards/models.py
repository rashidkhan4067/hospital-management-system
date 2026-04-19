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

class Room(models.Model):
    """
    🚪 Physical Room Node within a Ward.
    """
    class RoomType(models.TextChoices):
        GENERAL = 'general', _('General Ward Room')
        PRIVATE = 'private', _('Private Suite')
        ICU = 'icu', _('ICU Cluster')
        ISOLATION = 'isolation', _('Isolation Unit')

    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='rooms')
    room_number = models.CharField(_("room number"), max_length=20)
    room_type = models.CharField(max_length=20, choices=RoomType.choices, default=RoomType.GENERAL)
    capacity = models.PositiveIntegerField(default=1)
    
    class Meta:
        db_table = 'hospital_clinical_rooms'
        unique_together = ('ward', 'room_number')
        verbose_name = _("room")
        verbose_name_plural = _("rooms")

    def __str__(self):
        return f"Room {self.room_number} ({self.ward.code})"

class Bed(models.Model):
    """
    🛏️ Individual Bed Allocation within a Room.
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

    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='beds', null=True, blank=True)
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
        unique_together = ('room', 'bed_number')
        verbose_name = _("bed")
        verbose_name_plural = _("beds")

    def __str__(self):
        return f"{self.room.room_number}-{self.bed_number} ({self.status.upper()})"
class PatientAdmission(models.Model):
    """
    🏥 Clinical Admission Lifecycle Shard.
    Tracks a patient's stay from intake to discharge.
    """
    class AdmissionSource(models.TextChoices):
        ER = 'emergency_room', _('Emergency Room')
        OPD = 'outpatient', _('Outpatient Department')
        REFERRAL = 'referral', _('External Referral')
        TRANSFER = 'transfer', _('Inter-Ward Transfer')

    class SeverityLevel(models.TextChoices):
        MILD = 'mild', _('Mild')
        MODERATE = 'moderate', _('Moderate')
        SEVERE = 'severe', _('Severe')
        CRITICAL = 'critical', _('Critical')

    class AdmissionStatus(models.TextChoices):
        ACTIVE = 'active', _('Active Care')
        DISCHARGED = 'discharged', _('Discharged')
        TRANSFERRED = 'transferred', _('Transferred')

    patient = models.ForeignKey('patients.PatientProfile', on_delete=models.PROTECT, related_name='admissions')
    ward = models.ForeignKey(Ward, on_delete=models.PROTECT, related_name='admissions')
    room = models.ForeignKey(Room, on_delete=models.PROTECT, related_name='admissions', null=True, blank=True)
    bed = models.ForeignKey(Bed, on_delete=models.PROTECT, related_name='admissions')
    admitted_by = models.ForeignKey('doctors.Doctor', on_delete=models.PROTECT, related_name='initiated_admissions')
    
    admission_date = models.DateTimeField(auto_now_add=True)
    expected_discharge_date = models.DateField(null=True, blank=True)
    actual_discharge_date = models.DateTimeField(null=True, blank=True)
    
    source = models.CharField(max_length=20, choices=AdmissionSource.choices, default=AdmissionSource.OPD)
    severity = models.CharField(max_length=20, choices=SeverityLevel.choices, default=SeverityLevel.MODERATE)
    status = models.CharField(max_length=20, choices=AdmissionStatus.choices, default=AdmissionStatus.ACTIVE)
    
    primary_diagnosis = models.TextField()
    clinical_notes = models.TextField(blank=True)
    
    is_emergency = models.BooleanField(default=False)

    class Meta:
        db_table = 'hospital_clinical_admissions'
        ordering = ['-admission_date']
        verbose_name = _("admission")
        verbose_name_plural = _("admissions")

    def __str__(self):
        return f"{self.patient.user.get_full_name()} - {self.ward.code} ({self.admission_date.date()})"
