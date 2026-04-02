from django.db import models
from rest_framework import viewsets, permissions, views, response
from rest_framework.decorators import action
from .models import Medicine
from .serializers import MedicineSerializer
from apps.accounts.permissions import IsAdminUser

class MedicineViewSet(viewsets.ModelViewSet):
    """
    💊 Pharmacy Inventory HUB
    Centralizes all medical stock CRUD and alert protocols.
    """
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    
    # 🔍 Search matrix for high-speed medication discovery
    ordering_fields = ['stock_quantity', 'expiry_date']
    search_fields = ['name', 'chemical_formula', 'batch_number']
    
    @action(detail=False, methods=['get'])
    def critical_stock(self, request):
        """
        ⚠ Low Stock Analysis
        Retrieves medication shards that have fallen below the reorder threshold.
        """
        critical_medicines = self.queryset.filter(stock_quantity__lte=models.F('reorder_level'))
        serializer = self.get_serializer(critical_medicines, many=True)
        return response.Response(serializer.data)
