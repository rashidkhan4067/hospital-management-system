from rest_framework import viewsets, permissions, views, response
from .models import LabTest, TestResult
from .serializers import LabTestSerializer, TestResultSerializer
from apps.accounts.permissions import IsAdminUser

class LabTestViewSet(viewsets.ModelViewSet):
    """
    🧪 Lab Test Registry HUB
    Centralizes all available clinical diagnostics and pricing menus.
    """
    queryset = LabTest.objects.all()
    serializer_class = LabTestSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    
    search_fields = ['name', 'category']

class TestResultViewSet(viewsets.ModelViewSet):
    """
    📑 Diagnostic Finding registry
    Exposes immutable reports of medical tests for specific patients.
    """
    queryset = TestResult.objects.select_related('patient', 'test', 'doctor').all()
    serializer_class = TestResultSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    
    # 🔍 Search matrix for high-speed diagnostic discovery
    search_fields = ['patient__user__first_name', 'patient__user__last_name', 'test__name']
