from django.db import models
from django.utils import timezone

class ClinicalMetric(models.Model):
    """
    🧬 High-Density Clinical Metric Shard
    Tracks growth, patient counts, and diagnostic trends over chronological nodes.
    """
    date = models.DateField(default=timezone.now, unique=True)
    total_patients = models.IntegerField(default=0)
    admitted_patients = models.IntegerField(default=0)
    critical_cases = models.IntegerField(default=0)
    lab_tests_performed = models.IntegerField(default=0)
    pharmacy_orders = models.IntegerField(default=0)
    
    # Growth metrics (% change from previous node)
    patient_growth_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    
    # 🧠 Intelligence Bookings
    voice_bookings = models.IntegerField(default=0)
    web_bookings = models.IntegerField(default=0)
    
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Clinical Node ({self.date})"

class FinancialMetric(models.Model):
    """
    💹 Fiscal Trend Shard
    Tracks revenue, expenses, and insurance propagation.
    """
    date = models.DateField(default=timezone.now, unique=True)
    total_revenue = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    total_expenses = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    net_profit = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    insurance_claims_processed = models.IntegerField(default=0)
    average_transaction_value = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Financial Node ({self.date})"
