from rest_framework import viewsets, permissions, views, response
from .models import ClinicalMetric, FinancialMetric
from .serializers import ClinicalMetricSerializer, FinancialMetricSerializer
from .services.pulse_engine import PulseEngine
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
    Returns real-time clinical and financial shards for quick delta analysis.
    Uses the PulseEngine for high-performance live data aggregation.
    """
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]

    def get(self, request):
        try:
            metrics = PulseEngine.get_realtime_metrics()
            return response.Response(metrics)
        except Exception as e:
            return response.Response({"error": str(e)}, status=500)
