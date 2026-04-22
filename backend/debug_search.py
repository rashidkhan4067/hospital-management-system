
import os
import django
import sys

# Setup django environment
sys.path.append('e:\\Download\\solid project\\hospital-management-system\\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.dashboard.views import GlobalIntelligenceSearchView
from rest_framework.test import APIRequestFactory
factory = APIRequestFactory()

from apps.accounts.models import User
user = User.objects.filter(role='admin').first()
if not user:
    user = User.objects.create_user(email='admin@test.com', cnic='1234567890123', password='password', role='admin')

request = factory.get('/api/v1/dashboard/intelligence/search/', {'q': 'emergency'})
from rest_framework.test import force_authenticate
force_authenticate(request, user=user)

view = GlobalIntelligenceSearchView.as_view()
try:
    response = view(request)
    print(f"STATUS CODE: {response.status_code}")
    print(f"DATA: {response.data}")
except Exception as e:
    import traceback
    traceback.print_exc()
