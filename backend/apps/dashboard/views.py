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
from apps.wards.models import Bed

from django.db.models import Sum, Q, Count
from apps.finance.models import Transaction, Invoice
from django.utils import timezone
from datetime import timedelta

class GlobalExecutiveStatsView(APIView):
    """
    📊 Administrative Executive Summary Shard
    Aggregates high-level metrics across all clinical sub-planes.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        try:
            # 🧬 Extract Matrix Context
            date_range = request.query_params.get('dateRange', 'Today')
            department = request.query_params.get('department', 'All')
            
            # 📅 Temporal Propagation Focus
            now = timezone.now()
            if date_range == 'Today':
                start_date = now.replace(hour=0, minute=0, second=0, microsecond=0)
            elif date_range == 'Week':
                start_date = now - timedelta(days=7)
            else: # Month
                start_date = now - timedelta(days=30)

            # 🏢 Spatial Node Filtering (Logic Mappings)
            dept_map = {
                'OPD': Q(status='SCHEDULED'),
                'IPD': Q(patient__patient_profile__is_admitted=True),
                'ICU': Q(doctor__specialization='emergency'), 
                'Emergency': Q(doctor__specialization='emergency'),
                'Pharmacy': Q(notes__icontains='Pharmacy')
            }

            # Base Querysets
            appts_q = Appointment.objects.all()
            finance_q = Transaction.objects.filter(type='INCOME', status='completed')

            # Apply Spatial Filter
            if department != 'All' and department in dept_map:
                 appts_q = appts_q.filter(dept_map[department])
            
            # 🧮 Aggregation Shard
            total_revenue = finance_q.filter(timestamp__gte=start_date).aggregate(Sum('amount'))['amount__sum'] or 0
            
            # Capture Appointments for Activity Feed
            recent_activity = []
            for appt in appts_q.order_by('-created_at')[:5]:
                recent_activity.append({
                    "id": f"appt_{appt.id}",
                    "type": "APPOINTMENT",
                    "title": f"New appointment for {appt.patient.full_name}",
                    "timestamp": appt.created_at
                })

            return Response({
                "counts": {
                    "doctors": Doctor.objects.count(),
                    "patients": PatientProfile.objects.filter(created_at__gte=start_date).count(), 
                    "appointments": appts_q.filter(created_at__gte=start_date).count(),
                    "active_admissions": PatientProfile.objects.filter(is_admitted=True).count(),
                },
                "finance": {
                    "net_revenue": float(total_revenue), 
                    "pending_invoices": Invoice.objects.exclude(status='PAID').count(),
                    "total_transactions": Transaction.objects.count(),
                },
                "recent_activity": sorted(recent_activity, key=lambda x: x['timestamp'], reverse=True),
                "system": {
                    "status": "Operational",
                    "sync_rate": "100%",
                    "last_pulse": timezone.now()
                }
            })
        except Exception as e:
            return Response({"error": str(e), "status": "Degraded"}, status=500)

class DashboardActivityFeedView(APIView):
    """
    🛰️ Real-Time Event Stream Hub
    """
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        try:
            search = request.query_params.get('search', '')
            results = []
            
            # Fetch Recent Appointments
            appts = Appointment.objects.all()
            if search:
                appts = appts.filter(Q(patient__first_name__icontains=search) | Q(patient__last_name__icontains=search) | Q(doctor__user__first_name__icontains=search) | Q(doctor__user__last_name__icontains=search))
            
            for a in appts.order_by('-created_at')[:10]:
                results.append({
                    "id": f"appt_{a.id}",
                    "status": "warning" if a.status == 'SCHEDULED' else "info",
                    "title": "Appointment Scheduled",
                    "description": f"{a.patient.full_name} with {a.doctor.user.full_name}",
                    "target_url": f"/admin/appointments/{a.id}"
                })
                
            # Fetch Recent Invoices
            invoices = Invoice.objects.filter(status='UNPAID')
            if search:
                invoices = invoices.filter(Q(patient__user__first_name__icontains=search) | Q(patient__user__last_name__icontains=search))
            
            for inv in invoices.order_by('-created_at')[:5]:
                results.append({
                    "id": f"inv_{inv.id}",
                    "status": "danger",
                    "title": "Unpaid Invoice",
                    "description": f"Outstanding payment for {inv.patient.user.full_name}",
                    "target_url": f"/admin/finance/invoices/{inv.id}"
                })

            return Response(results)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class GlobalIntelligenceSearchView(APIView):
    """
    🧠 Global Intelligence Registry Search
    High-speed searching across clinical, administrative and operational nodes.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        query = request.query_params.get('q', '').strip()
        if not query or len(query) < 2:
            return Response({"patients": [], "doctors": [], "appointments": [], "medicine": []})

        try:
            # 🔍 Advanced Matrix Search (Parallel Simulation via Serial Q Filters)
            # 1. Patients
            patients = PatientProfile.objects.filter(
                Q(user__first_name__icontains=query) | 
                Q(user__last_name__icontains=query) |
                Q(user__email__icontains=query)
            ).select_related('user')[:5]

            # 2. Doctors
            doctors = Doctor.objects.filter(
                Q(user__first_name__icontains=query) | 
                Q(user__last_name__icontains=query) |
                Q(specialization__icontains=query)
            ).select_related('user')[:5]

            # 3. Appointments
            appointments = Appointment.objects.filter(
                Q(patient__first_name__icontains=query) | 
                Q(patient__last_name__icontains=query) |
                Q(doctor__user__first_name__icontains=query) |
                Q(doctor__user__last_name__icontains=query)
            ).select_related('patient', 'doctor__user')[:5]

            # 4. Medicine
            medicine = Medicine.objects.filter(
                Q(name__icontains=query) | 
                Q(chemical_formula__icontains=query)
            )[:5]

            return Response({
                "patients": [{
                    "id": p.id,
                    "name": p.user.full_name,
                    "detail": f"Blood: {p.blood_group} | Gender: {p.gender}",
                    "url": f"/admin/clinical/patients/{p.id}"
                } for p in patients],
                "doctors": [{
                    "id": d.id,
                    "name": d.user.full_name,
                    "detail": d.specialization.title(),
                    "url": f"/admin/doctors/{d.id}"
                } for d in doctors],
                "appointments": [{
                    "id": a.id,
                    "name": f"Appt: {a.patient.full_name}",
                    "detail": f"With {a.doctor.user.full_name} on {a.appointment_date}",
                    "url": f"/admin/appointments/{a.id}"
                } for a in appointments],
                "medicine": [{
                    "id": m.id,
                    "name": m.name,
                    "detail": f"Formula: {m.chemical_formula}",
                    "url": f"/admin/pharmacy/inventory/{m.id}"
                } for m in medicine]
            })
        except Exception as e:
            return Response({"error": str(e)}, status=500)
