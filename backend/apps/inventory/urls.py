from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InventoryCategoryViewSet, InventoryItemViewSet, StockLogViewSet

# ── Router Initialization ─────────────────────────────────────────────────────
# Using DefaultRouter for automatic URL shard generation.
router = DefaultRouter()
router.register(r'categories', InventoryCategoryViewSet, basename='category')
router.register(r'items', InventoryItemViewSet, basename='item')
router.register(r'logs', StockLogViewSet, basename='log')

# ── Global Resource Allocation Shards ─────────────────────────────────────────
app_name = "inventory"

urlpatterns = [
    path('', include(router.urls)),
]
