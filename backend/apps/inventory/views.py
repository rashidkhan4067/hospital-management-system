from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count, F
from django.db import transaction

from .models import InventoryItem, InventoryCategory, StockLog
from .serializers import (
    InventoryItemSerializer, 
    InventoryCategorySerializer, 
    StockLogSerializer
)

class InventoryCategoryViewSet(viewsets.ModelViewSet):
    """
    🏢 Specialized Unit Categorization
    Manages the clinical supply shards for the resource allocation matrix.
    """
    queryset = InventoryCategory.objects.annotate(item_count=Count('items')).order_by('name')
    serializer_class = InventoryCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class InventoryItemViewSet(viewsets.ModelViewSet):
    """
    💊 Clinical Resource Shard Matrix
    Global command center for tracking medical inventory units and stock throughput.
    """
    queryset = InventoryItem.objects.all().order_by('name')
    serializer_class = InventoryItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Allow filtering by category shard
        category_id = self.request.query_params.get('category')
        if category_id:
            return self.queryset.filter(category_id=category_id)
        return self.queryset

    @action(detail=True, methods=['post'], url_path='adjust-stock')
    def adjust_stock(self, request, pk=None):
        """
        🧪 Stock level mutation protocol
        Adjusts the current stock of a clinical resource item and logs the transaction.
        """
        item = self.get_object()
        quantity = request.data.get('quantity', 0)
        action_type = request.data.get('type') # 'in', 'out', 'adj'
        reason = request.data.get('reason', '')

        if not action_type or action_type not in StockLog.TransactionType.values:
            return Response(
                {"error": "Invalid transaction type shard."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            with transaction.atomic():
                # Update item stock level
                if action_type == StockLog.TransactionType.IN:
                    item.current_stock += abs(int(quantity))
                elif action_type == StockLog.TransactionType.OUT:
                    if item.current_stock < abs(int(quantity)):
                        return Response(
                            {"error": "Insufficient stock for this allocation shard."}, 
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    item.current_stock -= abs(int(quantity))
                elif action_type == StockLog.TransactionType.ADJ:
                    item.current_stock = int(quantity)

                item.save()

                # Commit to audit trail
                StockLog.objects.create(
                    item=item,
                    transaction_type=action_type,
                    quantity=quantity if action_type == StockLog.TransactionType.ADJ else abs(int(quantity)),
                    reason=reason,
                    performed_by=request.user
                )

                return Response(self.get_serializer(item).data)
        except Exception as e:
            return Response(
                {"error": f"Protocol failure during stock alignment: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class StockLogViewSet(viewsets.ReadOnlyModelViewSet):
    """
    📜 Historical Resource Throughput Audit
    Provides high-fidelity logs of all clinical supply modifications.
    """
    queryset = StockLog.objects.all().order_by('-timestamp')
    serializer_class = StockLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Allow auditing specific item shards
        item_id = self.request.query_params.get('item')
        if item_id:
            return self.queryset.filter(item_id=item_id)
        return self.queryset
