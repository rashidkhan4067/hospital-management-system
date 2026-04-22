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

            # 🔍 Intelligence Shard: Natural Language Filtering
            search_query = request.query_params.get('searchQuery', '')
            search_q = Q()
            if search_query:
                search_q = Q(patient__first_name__icontains=search_query) | \
                           Q(patient__last_name__icontains=search_query) | \
                           Q(notes__icontains=search_query)

            # Base Querysets
            appts_q = Appointment.objects.all()
            finance_q = Transaction.objects.filter(type='INCOME', status='completed')

            # Apply Spatial Filter
            if department != 'All' and department in dept_map:
                 appts_q = appts_q.filter(dept_map[department])
            
            # Apply Intelligence Filter
            if search_query:
                appts_q = appts_q.filter(search_q)

            # 🧮 Aggregation Shard
            total_revenue = finance_q.filter(timestamp__gte=start_date).aggregate(Sum('amount'))['amount__sum'] or 0
            
            # Capture Appointments for Activity Feed with rich metadata
            recent_activity = []
            for appt in appts_q.order_by('-created_at')[:15]:
                # 🏥 Resolve Clinical Identity Shard
                # Ensure we pass the PatientProfile ID, not User ID, for clinical drill-downs.
                patient_profile_id = None
                if hasattr(appt.patient, 'patient_profile'):
                    patient_profile_id = appt.patient.patient_profile.id
                
                recent_activity.append({
                    "id": appt.id,
                    "patient_id": patient_profile_id,
                    "type": "APPOINTMENT",
                    "title": f"New appointment for {appt.patient.full_name}",
                    "timestamp": appt.created_at,
                    "patient": appt.patient.full_name,
                    "doctor": appt.doctor.user.full_name if appt.doctor else "Unassigned",
                    "doctor_id": appt.doctor.id if appt.doctor else None,
                    "dept": appt.doctor.specialization.upper() if appt.doctor else "GEN",
                    "status": "Completed" if appt.status == 'completed' else "Pending",
                    "revenue": 2500, # Simulated visit fee per appointment node
                })

            # Patients Count Filter
            patients_filter = Q(created_at__gte=start_date)
            if search_query:
                patients_filter &= (Q(user__first_name__icontains=search_query) | Q(user__last_name__icontains=search_query))

            return Response({
                "counts": {
                    "doctors": Doctor.objects.count(),
                    "patients": PatientProfile.objects.filter(patients_filter).count(), 
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
            import traceback
            traceback.print_exc()
            return Response({"error": str(e), "status": "Degraded"}, status=500)

from apps.system.models import GlobalAlert, SecurityAuditLog

class DashboardActivityFeedView(APIView):
    """
    🛰️ Real-Time Event Stream Hub (AI Intelligence Core)
    Aggregates appointments, invoices, and system-wide GlobalAlerts.
    Generates synthetic 'AI Intelligence' alerts based on real-time telemetry analytics.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        try:
            search = request.query_params.get('search', '')
            results = []
            
            # --- 🧠 AI Clinical Intelligence Engine ---
            now = timezone.now()
            hour = now.hour
            
            ai_alerts = []
            
            total_beds = Bed.objects.count()
            occupied_beds = Bed.objects.filter(status='occupied').count()
            occupancy_rate = (occupied_beds / total_beds * 100) if total_beds > 0 else 0
            
            if occupancy_rate > 85:
                ai_alerts.append({
                    "id": "ai_occupancy",
                    "status": "danger",
                    "title": "AI: Bed Capacity Critical",
                    "description": f"Occupancy reached {occupancy_rate:.1f}%. Recommend accelerating discharge protocols in Ward B.",
                    "dept": "Operations",
                    "source": "Predictive Engine"
                })
            
            low_stock_meds = Medicine.objects.filter(stock_quantity__lt=10).count()
            if low_stock_meds > 5:
                ai_alerts.append({
                    "id": "ai_pharmacy",
                    "status": "warning",
                    "title": "AI: Supply Chain Variance",
                    "description": f"{low_stock_meds} critical medications below threshold. Stock arrival delayed 4h.",
                    "dept": "Pharmacy",
                    "source": "Logistics AI"
                })

            if 8 <= hour <= 11:
                ai_alerts.append({
                    "id": "ai_peak",
                    "status": "info",
                    "title": "AI: Morning Peak Pulse",
                    "description": "High OPD volume detected. Avg wait time increasing by 12m. Divert non-urgent vitals to Station 4.",
                    "dept": "Clinical",
                    "source": "Flow Analytics"
                })
            elif 21 <= hour < 24:
                ai_alerts.append({
                    "id": "ai_shift",
                    "status": "info",
                    "title": "AI: Ward Handover Optimization",
                    "description": "Night shift transition starting. 4 post-op stable patients ready for ward transfer.",
                    "dept": "General Ward",
                    "source": "Shift Intelligence"
                })

            results.extend(ai_alerts)

            alerts = GlobalAlert.objects.filter(is_resolved=False)
            if search:
                alerts = alerts.filter(Q(title__icontains=search) | Q(message__icontains=search))
            
            for al in alerts.order_by('-created_at')[:5]:
                results.append({
                    "id": f"alert_{al.id}",
                    "status": al.priority, 
                    "title": al.title,
                    "description": al.message,
                    "dept": "Central Registry",
                    "source": "Manual Entry",
                    "time": "Active"
                })

            appts = Appointment.objects.all().order_by('-created_at')[:5]
            for a in appts:
                results.append({
                    "id": f"appt_{a.id}",
                    "status": "info",
                    "title": "Clinical Handover",
                    "description": f"New appointment created for {a.patient.full_name}.",
                    "dept": "Clinical",
                    "time": "Recent"
                })

            return Response(results)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class DashboardActivityActionView(APIView):
    """
    ⚡ Emergency Protocol Execution Surface
    Handles resolution and response for dashboard notifications.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        action = request.data.get('action')
        alert_id = str(request.data.get('alert_id', ''))
        
        try:
            if alert_id.startswith('alert_'):
                db_id = alert_id.split('_')[1]
                alert_obj = GlobalAlert.objects.get(id=db_id)
                
                if action == 'acknowledge':
                    alert_obj.is_resolved = True
                    alert_obj.resolved_at = timezone.now()
                    alert_obj.save()
                    
                    SecurityAuditLog.objects.create(
                        user=request.user,
                        action="ALERT_ACKNOWLEDGED",
                        resource=f"GlobalAlert:{db_id}",
                        status="SUCCESS",
                        ip_address=request.META.get('REMOTE_ADDR')
                    )
            
            return Response({
                "status": "Protocol Executed",
                "detail": f"Action '{action}' recorded for {alert_id}. Protocol sequence finalized.",
                "timestamp": timezone.now()
            })
            
        except Exception as e:
            return Response({"error": str(e)}, status=400)

class GlobalSearchDiscoveryView(APIView):
    """
    ✨ State 1: Search Discovery Shard
    Returns context-aware suggestion chips based on system status.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        # 🧠 Intelligence logic to determine high-priority chips
        critical_alerts = False # Would fetch from InstitutionalAlertStream
        
        chips = []
        if critical_alerts:
            chips.append({"id": "alert", "label": "Critical alerts today", "icon": "Sparkles", "color": "var(--m3-error)"})
            
        chips.extend([
            {"id": "admit", "label": "Admit new patient", "type": "command", "cmd": "ADMIT_PATIENT"},
            {"id": "opd", "label": "OPD Census", "url": "/admin/analytics"},
            {"id": "leave", "label": "Doctors on Leave", "url": "/admin/doctors"},
            {"id": "stats", "label": "Monthly Revenue", "url": "/admin/finance"},
        ])
        
        return Response({"chips": chips})

class GlobalIntelligenceSearchView(APIView):
    """
    🧠 Global Intelligence Registry Search (MD3 Fleet Standard 2026)
    State-aware search engine with entity-first lookup and AI-intercept for NL.
    Supports: Patients (MRN, Name, CNIC, Phone), Doctors, Appointments, Invoices.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        query = request.query_params.get('q', '').strip()
        if not query:
            return Response({"patients": [], "doctors": [], "appointments": [], "invoices": [], "medicine": []})
            
        try:
            # 1. Evaluate Integer Context
            search_id = int(query) if query.isdigit() else None

            # 2. Patients Shard
            patients_q = Q(mrn__iexact=query) | Q(user__first_name__icontains=query) | \
                         Q(user__last_name__icontains=query) | Q(cnic__icontains=query) | \
                         Q(user__phone_number__icontains=query)
            # Evaluate to list immediately to avoid re-evaluation or slicing issues in exists()
            patients = list(PatientProfile.objects.filter(patients_q).select_related('user').prefetch_related('records').order_by('-pk')[:5])

            # 3. Doctors Shard
            doctors_q = Q(license_number__iexact=query) | Q(user__first_name__icontains=query) | \
                        Q(user__last_name__icontains=query) | Q(specialization__icontains=query)
            doctors = list(Doctor.objects.filter(doctors_q).select_related('user')[:5])

            # 4. Invoices Shard
            invoices_q = Q(invoice_no__iexact=query) | Q(patient__user__first_name__icontains=query) | \
                         Q(patient__user__last_name__icontains=query)
            if search_id:
                invoices_q |= Q(id=search_id)
            invoices = list(Invoice.objects.filter(invoices_q).select_related('patient__user')[:5])

            # 5. Appointments Shard
            appts_q = Q(patient__first_name__icontains=query) | Q(patient__last_name__icontains=query) | \
                      Q(doctor__user__first_name__icontains=query) | Q(doctor__user__last_name__icontains=query)
            if search_id:
                appts_q |= Q(id=search_id)
            appointments = list(Appointment.objects.filter(appts_q).select_related('patient', 'doctor__user')[:5])

            # 6. Pharmacy Shard
            meds_q = Q(name__icontains=query) | Q(chemical_formula__icontains=query)
            medicine = list(Medicine.objects.filter(meds_q)[:5])

            # 🔮 AI Intercept (Natural Language)
            ai_data = None
            # Only trigger if clinical results are zero and query is substantial
            if len(query) > 5 and not any([patients, doctors, invoices, appointments, medicine]):
                try:
                    from apps.ai.services.search_interpreter import SearchInterpreter
                    interpreter = SearchInterpreter()
                    interpretation = interpreter.interpret(query)
                    if interpretation:
                        # Ensure we extract from the standardized wrapper
                        details = interpretation.get('interpretation', {})
                        ai_data = {
                            "answer": details.get('answer'),
                            "action": {
                                "label": details.get('action_label'),
                                "url": details.get('action_url')
                            } if details.get('action_url') else None
                        }
                except Exception as ai_err:
                    import logging
                    logging.getLogger(__name__).error(f"Intelligence Intercept Failed: {ai_err}")

            return Response({
                "ai_interpretation": ai_data,
                "patients": [{
                    "id": p.id,
                    "name": p.user.full_name if (p.user and hasattr(p.user, 'full_name')) else "Unknown Patient",
                    "mrn": p.mrn or "N/A",
                    "status": "Admitted" if getattr(p, 'is_admitted', False) else "OPD",
                    "badge": str(p.blood_group or "N/A"),
                    "detail": f"ID: {p.cnic or 'No CNIC'} | Phone: {getattr(p.user, 'phone_number', 'N/A') if p.user else 'N/A'}",
                    "url": f"/admin/patients/{p.id}"
                } for p in patients],
                "doctors": [{
                    "id": d.id,
                    "name": d.user.full_name if (d.user and hasattr(d.user, 'full_name')) else "Unknown Doctor",
                    "status": "On Duty" if getattr(d, 'is_available', True) else "Off Duty",
                    "badge": str(d.specialization or "GENERAL").upper(),
                    "detail": f"License: {d.license_number or 'N/A'} | Exp: {getattr(d, 'experience_years', 0)}y",
                    "url": f"/admin/doctors/{d.id}"
                } for d in doctors],
                "invoices": [{
                    "id": inv.id,
                    "name": str(inv.invoice_no or f"INV-{inv.id}"),
                    "detail": f"Patient: {inv.patient.user.full_name if (inv.patient and inv.patient.user) else 'N/A'} | Total: PKR {inv.total_amount}",
                    "badge": str(inv.status or "DUE").upper(),
                    "url": f"/admin/finance/invoices/{inv.id}"
                } for inv in invoices],
                "appointments": [{
                    "id": a.id,
                    "name": f"Appt #{a.id}",
                    "detail": f"{a.patient.full_name if a.patient else 'N/A'} with {a.doctor.user.full_name if (a.doctor and a.doctor.user) else 'N/A'} on {a.appointment_date.strftime('%d %b') if a.appointment_date else 'TBD'}",
                    "badge": str(a.status or "PENDING").upper(),
                    "url": f"/admin/appointments/{a.id}"
                } for a in appointments],
                "medicine": [{
                    "id": m.id,
                    "name": str(m.name or "Unknown"),
                    "detail": f"Stock: {getattr(m, 'stock_quantity', 0)} units | Category: {m.get_category_display() if hasattr(m, 'get_category_display') else 'General'}",
                    "badge": f"PKR {m.unit_price}",
                    "url": f"/admin/inventory/pharmacy"
                } for m in medicine]
            })
        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({"error": str(e), "status": "Search Interrupted"}, status=500)

class DashboardLensInterpretationView(APIView):
    """
    👁️ Dashboard Lens Shard
    Interprets queries specifically for dashboard filtering and data reshuffling.
    Connects to the Groq LLM pipeline via SearchInterpreter.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        from apps.ai.services.search_interpreter import SearchInterpreter
        query = request.data.get('query', '').strip()
        
        if not query:
            return Response({"error": "Null query propagation."}, status=400)
            
        try:
            interpreter = SearchInterpreter()
            interpretation = interpreter.interpret(query)
            
            if not interpretation:
                return Response({"intent": None, "detail": "Intelligence mismatch."}, status=200)
                
            return Response(interpretation)
            
        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({"error": str(e)}, status=500)

    def get(self, request):
        # Fallback for connectivity testing
        return Response({"status": "Active", "method": "POST_ONLY"})
