from rest_framework import viewsets, permissions, filters
from .models import LabTest, TestResult, LabOrder
from .serializers import LabTestSerializer, TestResultSerializer, LabOrderSerializer
from apps.accounts.permissions import IsAdminUser

class LabTestViewSet(viewsets.ModelViewSet):
    """
    🧪 Lab Test Registry HUB
    Centralizes all available clinical diagnostics and pricing menus.
    """
    queryset = LabTest.objects.all()
    serializer_class = LabTestSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    search_fields = ['name', 'category']

class TestResultViewSet(viewsets.ModelViewSet):
    """
    📑 Diagnostic Finding registry
    Exposes immutable reports of medical tests for specific patients.
    """
    queryset = TestResult.objects.select_related('patient', 'test', 'doctor').all()
    serializer_class = TestResultSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    search_fields = ['patient__user__first_name', 'patient__user__last_name', 'test__name']

class LabOrderViewSet(viewsets.ModelViewSet):
    """
    🔬 Lab Order Requisition HUB
    Manages clinical test groups and orders for patients.
    """
    queryset = LabOrder.objects.select_related('patient', 'doctor').prefetch_related('tests').all()
    serializer_class = LabOrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['order_id', 'patient__user__full_name', 'status']
