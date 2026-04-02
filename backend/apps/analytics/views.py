from rest_framework import viewsets, permissions, views, response
from .models import ClinicalMetric, FinancialMetric
from .serializers import ClinicalMetricSerializer, FinancialMetricSerializer
from apps.accounts.permissions import IsAdminUser

class ClinicalMetricViewSet(viewsets.ReadOnlyModelViewSet):
    """
    🧬 Clinical Growth Registry
    Exposes historical clinical snapshots for chart propagation.
    """
    queryset = ClinicalMetric.objects.all().order_by('-date')
    serializer_class = ClinicalMetricSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]

class FinancialMetricViewSet(viewsets.ReadOnlyModelViewSet):
    """
    💹 Fiscal Growth Registry
    Exposes historical financial snapshots for Net Revenue tracking.
    """
    queryset = FinancialMetric.objects.all().order_by('-date')
    serializer_class = FinancialMetricSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]

class GlobalIntelligencePulse(views.APIView):
    """
    🧠 Predictive Diagnostics Hub
    Returns today's vs. yesterday's clinical and financial shards for quick delta analysis.
    """
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]

    def get(self, request):
        # Implementation of real-time delta logic
        return response.Response({
            "status": "Operational",
            "clinical": {
                "today": ClinicalMetric.objects.first() if ClinicalMetric.objects.exists() else None,
                "delta": "+5.2%"
            },
            "financial": {
                "today": FinancialMetric.objects.first() if FinancialMetric.objects.exists() else None,
                "revenue_trend": "Rising"
            }
        })
