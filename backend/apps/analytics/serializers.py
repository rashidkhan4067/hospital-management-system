from rest_framework import serializers
from .models import ClinicalMetric, FinancialMetric

class ClinicalMetricSerializer(serializers.ModelSerializer):
    """
    🧬 Clinical Trend Serializer
    Used for line charts and diagnostic growth propagation.
    """
    class Meta:
        model = ClinicalMetric
        fields = '__all__'

class FinancialMetricSerializer(serializers.ModelSerializer):
    """
    💹 Fiscal Trend Serializer
    Used for revenue charts and Net Profit tracking.
    """
    class Meta:
        model = FinancialMetric
        fields = '__all__'
