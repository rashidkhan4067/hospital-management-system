from django.urls import path, include
from rest_framework import routers
from .views import PatientViewSet, ClinicalRecordViewSet

app_name = "patients"

router = routers.DefaultRouter()
router.register(r"profiles", PatientViewSet, basename="patient-profiles")
router.register(r"records", ClinicalRecordViewSet, basename="clinical-records")

urlpatterns = [
    path("", include(router.urls)),
]
