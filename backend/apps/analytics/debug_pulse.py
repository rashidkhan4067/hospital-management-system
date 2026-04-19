import os
import django
import json
from django.utils import timezone
from datetime import timedelta
from django.db.models import Count, Sum
from django.db.models.functions import TruncDay

# Setup Django environment
import sys
project_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.append(project_path)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from apps.appointments.models import Appointment
from apps.finance.models import Transaction

def debug():
    points = 7
    now = timezone.now()
    start_date = now - timedelta(days=points)
    
    print(f"DEBUG: now={now}")
    print(f"DEBUG: start_date={start_date}")
    
    clinical_data = (
        Appointment.objects.filter(created_at__gte=start_date)
        .annotate(day=TruncDay('created_at'))
        .values('day')
        .annotate(count=Count('id'))
        .order_by('day')
    )
    
    print("DEBUG: clinical_data query results:")
    for d in clinical_data:
        print(f"  Day: {d['day']}, Count: {d['count']}, Type: {type(d['day'])}")
        
    clinical_trend = []
    for i in range(points + 1): # Include today
        target_date = (start_date + timedelta(days=i)).date()
        match = next((x for x in clinical_data if x['day'].date() == target_date), None)
        clinical_trend.append({
            "name": target_date.strftime('%d %b'),
            "value": match['count'] if match else 0
        })
        print(f"  Target: {target_date}, Match Found: {match is not None}")

    print("\nDEBUG: Trend Output:")
    print(json.dumps(clinical_trend, indent=2))

if __name__ == "__main__":
    debug()
