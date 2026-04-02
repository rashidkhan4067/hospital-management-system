from django.urls import path, include
from rest_framework import routers
from .views import (
    DepartmentViewSet, 
    GlobalAlertViewSet, 
    SecurityAuditLogViewSet, 
    SystemConfigViewSet
)

router = routers.DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'alerts', GlobalAlertViewSet)
router.register(r'audit-logs', SecurityAuditLogViewSet)
router.register(r'config', SystemConfigViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
