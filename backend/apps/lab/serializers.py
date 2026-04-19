from rest_framework import serializers
from .models import LabTest, TestResult, LabOrder

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

class LabOrderSerializer(serializers.ModelSerializer):
    """
    🔬 Lab Order Shard Serializer
    Groups multiple tests into a single requisition.
    """
    patient_name = serializers.ReadOnlyField(source="patient.user.full_name")
    doctor_name = serializers.ReadOnlyField(source="doctor.user.full_name")
    test_names = serializers.StringRelatedField(source="tests", many=True, read_only=True)

    class Meta:
        model = LabOrder
        fields = (
            'id', 'order_id', 'patient', 'patient_name', 'doctor', 'doctor_name',
            'context_type', 'tests', 'test_names', 'doctor_notes', 'status', 'created_at'
        )
        read_only_fields = ('order_id', 'created_at', 'status')
