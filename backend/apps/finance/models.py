from django.db import models
from django.utils import timezone
from ..patients.models import PatientProfile
from ..appointments.models import Appointment

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
    timestamp = models.DateTimeField(default=timezone.now)
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
    STATUS_CHOICES = [
        ('PAID', 'Settled'),
        ('PARTIAL', 'Partial'),
        ('DUE', 'Outstanding'),
        ('CANCELLED', 'Voided')
    ]
    PAYMENT_METHODS = [
        ('CASH', 'Cash'),
        ('CARD', 'Card'),
        ('BANK', 'Bank Transfer'),
        ('INSURANCE', 'Insurance Claim'),
    ]

    CONTEXT_CHOICES = [
        ('WALKIN', 'Walk-in'),
        ('APPOINTMENT', 'Appointment'),
        ('ADMISSION', 'Admission'),
    ]

    invoice_no = models.CharField(max_length=50, unique=True, editable=False)
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name="invoices")
    appointment = models.OneToOneField(Appointment, on_delete=models.SET_NULL, null=True, blank=True)
    admission = models.ForeignKey('wards.PatientAdmission', on_delete=models.SET_NULL, null=True, blank=True, related_name="invoices")
    context_type = models.CharField(max_length=20, choices=CONTEXT_CHOICES, default='WALKIN')
    
    # Financial breakdown
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    paid_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    due_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='DUE')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS, default='CASH')
    
    # Metadata
    patient_notes = models.TextField(blank=True)
    internal_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    invoice_date = models.DateField(default=timezone.localdate)
    due_date = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.invoice_no:
            import uuid
            self.invoice_no = f"INV-{uuid.uuid4().hex[:6].upper()}"
        
        # Calculate due amount before saving
        # Due = Total (which includes items) - Paid
        self.due_amount = self.total_amount - self.paid_amount
        
        if self.paid_amount >= self.total_amount and self.total_amount > 0:
            self.status = 'PAID'
        elif self.paid_amount > 0:
            self.status = 'PARTIAL'
        else:
            self.status = 'DUE'
            
        super().save(*args, **kwargs)

    def __str__(self):
        return self.invoice_no

    class Meta:
        ordering = ['-created_at']

class InvoiceItem(models.Model):
    """
    📦 ITEM SEGMENT
    Individual line items within an invoice (Service, Medicine, Lab Test).
    """
    ITEM_TYPES = [
        ('CONSULTATION', 'Doctor Consultation'),
        ('MEDICINE', 'Pharmacy/Medicine'),
        ('LAB_TEST', 'Laboratory Test'),
        ('PROCEDURE', 'Medical Procedure'),
        ('OTHER', 'Miscellaneous'),
    ]

    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name="items")
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, blank=True)
    item_type = models.CharField(max_length=20, choices=ITEM_TYPES, default='OTHER')
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):
        self.subtotal = self.quantity * self.unit_price
        super().save(*args, **kwargs)
        
        # Update parent invoice total whenever an item is saved
        items_total = self.invoice.items.aggregate(total=models.Sum('subtotal'))['total'] or 0
        
        # Total = Items Total + Tax - Discount
        self.invoice.total_amount = items_total + self.invoice.tax_amount - self.invoice.discount_amount
        self.invoice.save()

    def __str__(self):
        return f"{self.name} ({self.invoice.invoice_no})"

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
