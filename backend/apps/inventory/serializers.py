from rest_framework import serializers
from .models import InventoryItem, InventoryCategory, StockLog

class InventoryCategorySerializer(serializers.ModelSerializer):
    """
    Serializer for the categorization shards of the clinical supply chain.
    """
    item_count = serializers.IntegerField(read_only=True, default=0)
    
    class Meta:
        model = InventoryCategory
        fields = ["id", "name", "description", "item_count", "created_at"]
        read_only_fields = ["id", "item_count", "created_at"]

class InventoryItemSerializer(serializers.ModelSerializer):
    """
    Serializer for the Individual clinical resource shards.
    Includes human-readable unit details and Stock Levels.
    """
    category_name = serializers.CharField(source="category.name", read_only=True)
    status        = serializers.CharField(read_only=True)
    unit_display  = serializers.CharField(source="get_unit_display", read_only=True)

    class Meta:
        model = InventoryItem
        fields = [
            "id", "category", "category_name", "name", "sku", 
            "unit", "unit_display", "current_stock", "min_stock_level", 
            "unit_price", "supplier_info", "location", "status", "updated_at"
        ]
        read_only_fields = ["id", "status", "updated_at", "category_name", "unit_display"]

class StockLogSerializer(serializers.ModelSerializer):
    """
    Audit shard for resource allocation transactions.
    """
    item_name = serializers.CharField(source="item.name", read_only=True)
    performer_name = serializers.CharField(source="performed_by.full_name", read_only=True)
    transaction_display = serializers.CharField(source="get_transaction_type_display", read_only=True)

    class Meta:
        model = StockLog
        fields = [
            "id", "item", "item_name", "transaction_type", "transaction_display", 
            "quantity", "reason", "performer_name", "timestamp"
        ]
        read_only_fields = ["id", "timestamp"]
