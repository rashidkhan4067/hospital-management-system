from django.urls import path, include
from rest_framework import routers
from .views import LabTestViewSet, TestResultViewSet

router = routers.DefaultRouter()
router.register('tests', LabTestViewSet, basename='lab-tests')
router.register('results', TestResultViewSet, basename='lab-results')

app_name = 'lab'

urlpatterns = [
    path('', include(router.urls)),
]
