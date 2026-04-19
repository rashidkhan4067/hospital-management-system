from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

class PatientProfile(models.Model):
    """
    🏥 Clinical Profile Shard
    Extends the User model with specific clinical metadata tracking.
    """
    BLOOD_GROUPS = [
        ('A+', 'A+'), ('A-', 'A-'),
        ('B+', 'B+'), ('B-', 'B-'),
        ('O+', 'O+'), ('O-', 'O-'),
        ('AB+', 'AB+'), ('AB-', 'AB-'),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="patient_profile",
        help_text=_("Associated user account for login."),
    )

    mrn = models.CharField(
        _("medical record number"),
        max_length=20,
        unique=True,
        blank=True,
        editable=False,
        help_text=_("Format: SHI-YYYY-XXXX")
    )

    class ClinicalStatus(models.TextChoices):
        COMPLETE   = "complete",   _("Verified/Complete")
        INCOMPLETE = "incomplete", _("Quick-Add/Incomplete")
        ARCHIVED   = "archived",   _("Archived")

    status = models.CharField(
        _("onboarding status"),
        max_length=15,
        choices=ClinicalStatus.choices,
        default=ClinicalStatus.INCOMPLETE,
    )

    blood_group = models.CharField(
        _("blood group"),
        max_length=5,
        choices=BLOOD_GROUPS,
        blank=True,
    )

    age = models.PositiveIntegerField(_("age"), null=True, blank=True)
    cnic = models.CharField(_("CNIC"), max_length=20, blank=True, null=True)
    
    father_name = models.CharField(_("father/husband name"), max_length=100, blank=True)
    national_id_type = models.CharField(
        _("ID type"), 
        max_length=20, 
        default="CNIC",
        choices=[("CNIC", "CNIC"), ("Passport", "Passport"), ("Other", "Other")]
    )

    date_of_birth = models.DateField(_("date of birth"), null=True, blank=True)
    gender = models.CharField(_("gender"), max_length=20, blank=True)
    address = models.TextField(_("physical address"), blank=True)
    
    occupation = models.CharField(_("occupation"), max_length=100, blank=True)
    marital_status = models.CharField(_("marital status"), max_length=20, blank=True)
    preferred_language = models.CharField(_("preferred language"), max_length=50, default="English")
    
    emergency_contact_name = models.CharField(_("emergency contact"), max_length=100, blank=True)
    emergency_contact_relationship = models.CharField(_("relationship"), max_length=50, blank=True)
    emergency_contact_phone = models.CharField(_("emergency contact phone"), max_length=20, blank=True)

    privacy_consent = models.BooleanField(_("privacy consent"), default=False)
    
    allergies = models.TextField(_("known allergies"), blank=True, help_text=_("List of drug/food allergies."))
    medical_history = models.TextField(_("chronic conditions"), blank=True, help_text=_("Diabetes, Hypertension, etc."))
    current_medications = models.TextField(_("current medications"), blank=True, help_text=_("List of active medications."))
    
    is_admitted = models.BooleanField(_("currently admitted"), default=False)
    room_number = models.CharField(_("room number"), max_length=10, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """
        🚀 Institutional identity protocol.
        Generates unique sequence-based MRN if not present.
        """
        if not self.mrn:
            import random
            # SHF-XXXXXX shape (6 digits)
            seq = random.randint(1, 999999)
            self.mrn = f"SHF-{str(seq).zfill(6)}"
            
        # If all core clinical fields are present, set status to complete
        if self.date_of_birth and self.gender and self.blood_group and self.address:
            self.status = self.ClinicalStatus.COMPLETE
            
        super().save(*args, **kwargs)

    class Meta:
        db_table = "hospital_patient_profiles"
        verbose_name = _("patient profile")

    def __str__(self):
        return f"{self.user.full_name} ({self.blood_group})"


class ClinicalRecord(models.Model):
    """
    📑 Immutable Log of Clinical Events
    Tracks notes, vitals, and diagnoses over time.
    """
    patient = models.ForeignKey(
        PatientProfile, 
        on_delete=models.CASCADE, 
        related_name="records"
    )
    doctor = models.ForeignKey(
        "doctors.Doctor", 
        on_delete=models.PROTECT, 
        related_name="clinical_observations"
    )
    
    observation_date = models.DateTimeField(auto_now_add=True)
    diagnosis = models.CharField(_("primary diagnosis"), max_length=255)
    clinical_notes = models.TextField(_("clinical summary"))
    prescription_summary = models.TextField(_("prescription summary"), blank=True)
    
    # Simple Vitals Node
    blood_pressure = models.CharField(max_length=20, blank=True)
    temperature = models.CharField(max_length=20, blank=True)
    heart_rate = models.CharField(max_length=20, blank=True)

    class Meta:
        db_table = "hospital_clinical_records"
        ordering = ["-observation_date"]

    def __str__(self):
        return f"{self.patient.user.full_name} - {self.diagnosis} ({self.observation_date.date()})"
