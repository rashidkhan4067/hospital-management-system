from rest_framework import serializers
from .models import LabTest, TestResult

class LabTestSerializer(serializers.ModelSerializer):
    """
    🧪 Lab Test Shard Serializer
    Used for retrieving diagnostic menus and pricing.
    """
    class Meta:
        model = LabTest
        fields = '__all__'

class TestResultSerializer(serializers.ModelSerializer):
    """
    📑 Lab Result Shard Serializer
    Used for retrieving clinical findings and report status.
    """
    test_name = serializers.ReadOnlyField(source="test.name")
    patient_name = serializers.ReadOnlyField(source="patient.user.full_name")
    doctor_name = serializers.ReadOnlyField(source="doctor.user.full_name")
    
    class Meta:
        model = TestResult
        fields = '__all__'
