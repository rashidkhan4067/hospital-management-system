from django.urls import path, include
from rest_framework import routers
from .views import LabTestViewSet, TestResultViewSet, LabOrderViewSet

router = routers.DefaultRouter()
router.register('tests', LabTestViewSet, basename='lab-tests')
router.register('results', TestResultViewSet, basename='lab-results')
router.register('orders', LabOrderViewSet, basename='lab-orders')

app_name = 'lab'

urlpatterns = [
    path('', include(router.urls)),
]
