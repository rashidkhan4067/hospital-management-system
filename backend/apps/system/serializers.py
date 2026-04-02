from rest_framework import serializers
from .models import Department, GlobalAlert, SecurityAuditLog, SystemConfig
from apps.doctors.models import Doctor

class DepartmentSerializer(serializers.ModelSerializer):
    head_name = serializers.CharField(source='head.user.full_name', read_only=True)
    doctor_count = serializers.IntegerField(default=0, read_only=True) # Placeholder for doctor count in this dept

    class Meta:
        model = Department
        fields = '__all__'

class GlobalAlertSerializer(serializers.ModelSerializer):
    issuer_name = serializers.CharField(source='issuer.full_name', read_only=True)

    class Meta:
        model = GlobalAlert
        fields = '__all__'

class SecurityAuditLogSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = SecurityAuditLog
        fields = '__all__'

class SystemConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemConfig
        fields = '__all__'
