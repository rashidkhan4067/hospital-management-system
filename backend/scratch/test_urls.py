import os
import django
from django.urls import resolve
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

try:
    match = resolve('/api/v1/dashboard/intelligence/search/')
    print(f"FOUND: {match.view_name}")
except Exception as e:
    print(f"NOT FOUND: {e}")
