from django.urls import path, include
from rest_framework import routers
from .views import WardViewSet, RoomViewSet, BedViewSet, PatientAdmissionViewSet

app_name = 'wards'

router = routers.DefaultRouter()
router.register(r'wards', WardViewSet)
router.register(r'rooms', RoomViewSet)
router.register(r'beds', BedViewSet)
router.register(r'admissions', PatientAdmissionViewSet)

urlpatterns = [
    # 🎯 Explicit Architect Endpoints
    path('patients/search/', PatientAdmissionViewSet.as_view({'get': 'search_patients'}), name='patient-discovery'),
    path('beds/available/', PatientAdmissionViewSet.as_view({'get': 'available_beds'}), name='bed-inventory'),
    
    path('', include(router.urls)),
]
