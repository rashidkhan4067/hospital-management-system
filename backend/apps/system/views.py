from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Department, GlobalAlert, SecurityAuditLog, SystemConfig
from .serializers import (
    DepartmentSerializer, 
    GlobalAlertSerializer, 
    SecurityAuditLogSerializer, 
    SystemConfigSerializer
)

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all().order_by('name')
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticated]

class GlobalAlertViewSet(viewsets.ModelViewSet):
    queryset = GlobalAlert.objects.all().order_by('-created_at')
    serializer_class = GlobalAlertSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(issuer=self.request.user)

class SecurityAuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SecurityAuditLog.objects.all().order_by('-timestamp')
    serializer_class = SecurityAuditLogSerializer
    permission_classes = [permissions.IsAdminUser]

class SystemConfigViewSet(viewsets.ModelViewSet):
    queryset = SystemConfig.objects.all()
    serializer_class = SystemConfigSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'key'
