from django.utils import timezone
from django.db.models import Sum, Count
from datetime import timedelta
from apps.patients.models import PatientProfile
from apps.appointments.models import Appointment
from apps.finance.models import Transaction
from apps.doctors.models import Doctor

class PulseEngine:
    """
    🧠 THE ANALYTICS PROPAGATION ENGINE
    Calculates operational throughput and financial velocity shards.
    """

    @staticmethod
    def get_realtime_metrics():
        today = timezone.now().date()
        yesterday = today - timedelta(days=1)

        # 🧬 CLINICAL SHARDS (Handles multi-app-label constraints)
        clinical_today = {
            "total_patients": PatientProfile.objects.count(),
            "doctors": Doctor.objects.count(),
            "admissions": PatientProfile.objects.filter(is_admitted=True).count(),
            "appointments": Appointment.objects.filter(appointment_date=today).count(),
        }

        # 💹 FINANCIAL SHARDS (Fiscal through-put logic)
        financial_today = Transaction.objects.filter(
            timestamp__date=today, 
            type='INCOME',
            status='completed'
        ).aggregate(total=Sum('amount'))['total'] or 0

        financial_yesterday = Transaction.objects.filter(
            timestamp__date=yesterday, 
            type='INCOME',
            status='completed'
        ).aggregate(total=Sum('amount'))['total'] or 0

        # 📈 VELOCITY CALCULATIONS
        rev_delta = PulseEngine._calculate_delta(float(financial_today), float(financial_yesterday))
        
        return {
            "status": "Operational",
            "counts": {
                "patients": clinical_today["total_patients"],
                "doctors": clinical_today["doctors"],
                "appointments": clinical_today["appointments"],
                "admissions": clinical_today["admissions"]
            },
            "clinical": {
                "today": clinical_today,
                "delta": "+0.0%", 
            },
            "finance": { # Shard aliasing for Dashboard compatibility
                "net_revenue": float(financial_today),
                "delta": f"{rev_delta:+.1f}%",
            },
            "financial": {
                "today": { "total_revenue": float(financial_today) },
                "delta": f"{rev_delta:+.1f}%",
                "net_revenue": float(financial_today)
            }
        }

    @staticmethod
    def _calculate_delta(current, previous):
        if previous == 0: return 100.0 if current > 0 else 0.0
        return ((current - previous) / previous) * 100

    @staticmethod
    def sync_daily_node():
        from apps.analytics.models import ClinicalMetric, FinancialMetric
        today = timezone.now().date()
        metrics = PulseEngine.get_realtime_metrics()
        
        ClinicalMetric.objects.update_or_create(
            date=today,
            defaults={"total_patients": metrics["counts"]["patients"]}
        )
        FinancialMetric.objects.update_or_create(
            date=today,
            defaults={"total_revenue": metrics["financial"]["today"]["total_revenue"]}
        )
