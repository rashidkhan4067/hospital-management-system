from django.db import models
from apps.patients.models import PatientProfile
from apps.appointments.models import Appointment

class Transaction(models.Model):
    """
    💳 CLINICAL TRANSACTION SHARD
    Tracks the atomic flow of credits/debits across the hospital node.
    """
    TRANSACTION_TYPES = [
        ('INCOME', 'Revenue Inflow'),
        ('EXPENSE', 'Operational Outflow'),
        ('REFUND', 'Clinical Refund'),
    ]
    PAYMENT_METHODS = [
        ('CASH', 'Physical Currency'),
        ('CARD', 'Digital Stripe/Card'),
        ('INSURANCE', 'Policy Claim Shard'),
        ('TRANSFER', 'Direct Bank Sync'),
    ]

    transaction_id = models.CharField(max_length=50, unique=True, editable=False)
    patient = models.ForeignKey(PatientProfile, on_delete=models.SET_NULL, null=True, related_name="transactions")
    type = models.CharField(max_length=10, choices=TRANSACTION_TYPES, default='INCOME')
    method = models.CharField(max_length=10, choices=PAYMENT_METHODS, default='CARD')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='completed')

    def save(self, *args, **kwargs):
        if not self.transaction_id:
            import uuid
            self.transaction_id = f"TRX-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-timestamp']
        verbose_name = "Clinical Transaction Matrix"

class Invoice(models.Model):
    """
    🧾 CLINICAL INVOICE MODULE
    Immutable fiscal record for a patient encounter.
    """
    invoice_no = models.CharField(max_length=50, unique=True)
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name="invoices")
    appointment = models.OneToOneField(Appointment, on_delete=models.SET_NULL, null=True, blank=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    paid_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    due_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=[('PAID', 'Settled'), ('PARTIAL', 'Partial Shard'), ('DUE', 'Outstanding')], default='DUE')
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"INV-{self.invoice_no}"

class InsuranceClaim(models.Model):
    """
    🛡️ INSURANCE POLICY SHARD
    Tracks health insurance propagation for patient claims.
    """
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name="claims")
    provider = models.CharField(max_length=100)
    policy_number = models.CharField(max_length=100)
    claim_amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')
    filed_at = models.DateTimeField(auto_now_add=True)
