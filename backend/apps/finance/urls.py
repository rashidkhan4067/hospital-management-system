from django.urls import path, include
from rest_framework import routers
from .views import TransactionViewSet, InvoiceViewSet, InsuranceClaimViewSet

app_name = "finance"

router = routers.DefaultRouter()
router.register(r"transactions", TransactionViewSet, basename="finance-transactions")
router.register(r"invoices", InvoiceViewSet, basename="finance-invoices")
router.register(r"claims", InsuranceClaimViewSet, basename="finance-claims")

urlpatterns = [
    path("", include(router.urls)),
]
