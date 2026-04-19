from django.db import models
from django.utils.translation import gettext_lazy as _

class LabTest(models.Model):
    """
    🧪 Laboratory Diagnostic Shard
    Defines available clinical tests and pricing.
    """
    name = models.CharField(_("test name"), max_length=200, unique=True)
    category = models.CharField(_("diagnostic area"), max_length=100)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    turnaround_time = models.CharField(_("ETA"), max_length=50, help_text=_("e.g. 24 hours"))
    
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "hospital_lab_tests"
    def __str__(self):
        return self.name

class TestResult(models.Model):
    """
    📑 Clinical Diagnostic Shard
    Immutable report of a laboratory finding for a patient.
    """
    STATUS = [
        ('pending', _('Pending')),
        ('processing', _('Processing')),
        ('completed', _('Completed')),
        ('cancelled', _('Cancelled')),
    ]

    patient = models.ForeignKey("patients.PatientProfile", on_delete=models.CASCADE, related_name="lab_results")
    test = models.ForeignKey(LabTest, on_delete=models.PROTECT)
    doctor = models.ForeignKey("doctors.Doctor", on_delete=models.SET_NULL, null=True, blank=True)
    
    result_value = models.TextField(_("findings"), blank=True)
    report_file = models.FileField(_("clinical report (PDF)"), upload_to="lab_reports/", blank=True, null=True)
    
    status = models.CharField(max_length=20, choices=STATUS, default='pending')
    
    test_date = models.DateTimeField(auto_now_add=True)
    result_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "hospital_lab_results"
        ordering = ["-test_date"]


class LabOrder(models.Model):
    """
    🔬 LABORATORY ORDER NODE
    Groups multiple diagnostic tests into a single clinical requisition.
    """
    STATUS = [
        ('pending', _('Pending')),
        ('processing', _('Processing')),
        ('completed', _('Completed')),
        ('cancelled', _('Cancelled')),
    ]
    CONTEXT = [
        ('WALKIN', _('Walk-in')),
        ('APPOINTMENT', _('Appointment')),
        ('ADMISSION', _('Admission')),
    ]

    order_id = models.CharField(_("lab order ID"), max_length=20, unique=True, editable=False)
    patient = models.ForeignKey("patients.PatientProfile", on_delete=models.CASCADE, related_name="lab_orders")
    doctor = models.ForeignKey("doctors.Doctor", on_delete=models.SET_NULL, null=True, blank=True)
    
    context_type = models.CharField(max_length=20, choices=CONTEXT, default='WALKIN')
    tests = models.ManyToManyField(LabTest, related_name="orders")
    doctor_notes = models.TextField(_("clinical notes"), blank=True)
    
    status = models.CharField(max_length=20, choices=STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.order_id:
            import uuid
            self.order_id = f"LAB-{uuid.uuid4().hex[:6].upper()}"
        super().save(*args, **kwargs)

    class Meta:
        db_table = "hospital_lab_orders"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.order_id} - {self.patient.user.full_name}"
