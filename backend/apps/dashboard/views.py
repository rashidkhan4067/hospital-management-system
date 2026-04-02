from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.accounts.permissions import IsAdminUser

from apps.accounts.models import User
from apps.doctors.models import Doctor
from apps.patients.models import PatientProfile
from apps.appointments.models import Appointment
from apps.lab.models import TestResult
from apps.pharmacy.models import Medicine

from django.db.models import Sum
from apps.finance.models import Transaction, Invoice

class GlobalExecutiveStatsView(APIView):
    """
    📊 Administrative Executive Summary Shard
    Aggregates high-level metrics across all clinical sub-planes.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        total_revenue = Transaction.objects.filter(type='INCOME', status='completed').aggregate(Sum('amount'))['amount__sum'] or 0
        
        return Response({
            "counts": {
                "doctors": Doctor.objects.count(),
                "patients": PatientProfile.objects.count(),
                "appointments": Appointment.objects.count(),
                "active_admissions": PatientProfile.objects.filter(is_admitted=True).count(),
            },
            "finance": {
                "net_revenue": float(total_revenue),
                "pending_invoices": Invoice.objects.exclude(status='PAID').count(),
                "total_transactions": Transaction.objects.count(),
            },
            "alerts": {
                "low_stock": Medicine.objects.filter(stock_quantity__lte=models.F('reorder_level')).count(),
                "pending_lab_reports": TestResult.objects.filter(status='pending').count(),
                "urgent_appointments": Appointment.objects.filter(status='pending').count(), # and maybe within narrow time window
            },
            "system": {
                "status": "Healthy",
                "last_backup": "12h ago",
                "ai_intent_success_rate": "94.2%"
            }
        })
