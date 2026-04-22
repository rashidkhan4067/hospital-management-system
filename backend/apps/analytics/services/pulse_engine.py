from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum, Count, Q
from django.db.models.functions import TruncDay
from apps.appointments.models import Appointment
from apps.patients.models import PatientProfile
from apps.finance.models import Transaction
from apps.doctors.models import Doctor
from apps.wards.models import Bed

class PulseEngine:
    """ 🧬 REAL-TIME CLINICAL & FINANCIAL PULSE ENGINE """
    
    @staticmethod
    def get_realtime_metrics(filters=None):
        # 🧪 Temporal Range Determination
        date_range = filters.get('dateRange', 'Today') if filters else 'Today'
        granularity = filters.get('granularity', 'daily') 
        
        now = timezone.now()
        
        # 🏢 Spatial Context
        department = filters.get('department', 'All') if filters else 'All'
        dept_q = Q()
        if department.lower() == 'emergency':
            dept_q = Q(doctor__specialization__iexact='emergency') # Resolve clinical context
        elif department != 'All':
            dept_q = Q(doctor__specialization__iexact=department)

        if granularity == 'hourly':
            # Focus on the last 24 hours for high-fidelity clinical monitoring
            points = 24
            start_date = now - timedelta(hours=points)
            
            # 1️⃣ Clinical Trend Shard (Hourly appointment volume)
            from django.db.models.functions import TruncHour
            clinical_data = (
                Appointment.objects.filter(dept_q, created_at__gte=start_date)
                .annotate(hour=TruncHour('created_at'))
                .values('hour')
                .annotate(count=Count('id'))
                .order_by('hour')
            )
            
            clinical_trend = []
            for i in range(points + 1):
                target_time = (start_date + timedelta(hours=i))
                match = next((x for x in clinical_data if x['hour'].replace(tzinfo=target_time.tzinfo) == target_time.replace(minute=0, second=0, microsecond=0)), None)
                clinical_trend.append({
                    "name": target_time.strftime('%H:00'),
                    "value": match['count'] if match else 0
                })

            # 2️⃣ Financial Trend Shard (Hourly revenue sum)
            financial_data = (
                Transaction.objects.filter(timestamp__gte=start_date, type='INCOME', status='completed')
                .annotate(hour=TruncHour('timestamp'))
                .values('hour')
                .annotate(total=Sum('amount'))
                .order_by('hour')
            )
            
            financial_trend = []
            for i in range(points + 1):
                target_time = (start_date + timedelta(hours=i))
                match = next((x for x in financial_data if x['hour'].replace(tzinfo=target_time.tzinfo) == target_time.replace(minute=0, second=0, microsecond=0)), None)
                financial_trend.append({
                    "name": target_time.strftime('%H:00'),
                    "revenue": float(match['total'] or 0) if match else 0
                })
        else:
            points = 7 if date_range == 'Today' else (14 if date_range == 'Week' else 30)
            start_date = now - timedelta(days=points)
            
            # 1️⃣ Clinical Trend Shard (Daily appointment volume)
            clinical_data = (
                Appointment.objects.filter(dept_q, created_at__gte=start_date)
                .annotate(day=TruncDay('created_at'))
                .values('day')
                .annotate(count=Count('id'))
                .order_by('day')
            )
            
            clinical_trend = []
            for i in range(points + 1):
                target_date = (start_date + timedelta(days=i)).date()
                match = next((x for x in clinical_data if x['day'].date() == target_date), None)
                clinical_trend.append({
                    "name": target_date.strftime('%d %b'),
                    "value": match['count'] if match else 0
                })

            # 2️⃣ Financial Trend Shard (Daily revenue sum)
            financial_data = (
                Transaction.objects.filter(timestamp__gte=start_date, type='INCOME', status='completed')
                .annotate(day=TruncDay('timestamp'))
                .values('day')
                .annotate(total=Sum('amount'))
                .order_by('day')
            )
            
            financial_trend = []
            for i in range(points + 1):
                target_date = (start_date + timedelta(days=i)).date()
                match = next((x for x in financial_data if x['day'].date() == target_date), None)
                financial_trend.append({
                    "name": target_date.strftime('%d %b'),
                    "revenue": float(match['total'] or 0) if match else 0
                })

        # 3️⃣ Department Distribution (Doctor Specialization)
        dept_stats = []
        specs = Doctor.objects.values('specialization').annotate(total=Count('id'))
        for s in specs:
            dept_stats.append({
                "name": s['specialization'].title(),
                "value": s['total']
            })
            
        if not any(d['name'] == 'Icu' for d in dept_stats):
             icu_beds = Bed.objects.filter(bed_type='icu', status='occupied').count()
             if icu_beds > 0:
                dept_stats.append({"name": "ICU", "value": icu_beds})

        return {
            "status": "Operational",
            "clinical": {"trend": clinical_trend},
            "financial": {"trend": financial_trend},
            "departments": dept_stats if dept_stats else [
                { "name": "General", "value": 1 },
            ]
        }

    @staticmethod
    def sync_daily_node():
        pass 
