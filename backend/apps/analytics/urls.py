from django.urls import path, include
from rest_framework import routers
from .views import ClinicalMetricViewSet, FinancialMetricViewSet, GlobalIntelligencePulse

router = routers.DefaultRouter()
router.register('clinical', ClinicalMetricViewSet, basename='analytics-clinical')
router.register('financial', FinancialMetricViewSet, basename='analytics-financial')

app_name = 'analytics'

urlpatterns = [
    path('', include(router.urls)),
    path('pulse/', GlobalIntelligencePulse.as_view(), name='analytics-pulse'),
]
