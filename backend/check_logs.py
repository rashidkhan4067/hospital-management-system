import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()
from apps.ai.models import AISystemLog
for l in AISystemLog.objects.all().order_by('-timestamp')[:10]:
    print(f"{l.event} {l.status}: {l.message}")
