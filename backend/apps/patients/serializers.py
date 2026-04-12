from rest_framework import serializers
from .models import PatientProfile, ClinicalRecord
from apps.accounts.serializers import UserSerializer

class ClinicalRecordSerializer(serializers.ModelSerializer):
    """
    🧬 Clinical Observation Serializer
    Used for retrieving individual diagnosis and prescription shards.
    """
    doctor_name = serializers.ReadOnlyField(source="doctor.user.full_name")
    
    class Meta:
        model = ClinicalRecord
        fields = [
            'id', 'patient', 'doctor', 'doctor_name',
            'observation_date', 'diagnosis', 'clinical_notes', 
            'prescription_summary', 'blood_pressure', 
            'temperature', 'heart_rate'
        ]


class PatientProfileSerializer(serializers.ModelSerializer):
    """
    🏥 Patient Identity Serializer
    Orchestrates the entire patient medical card for admin display.
    """
    user_details = UserSerializer(source="user", read_only=True)
    full_name = serializers.ReadOnlyField(source="user.full_name")
    email = serializers.ReadOnlyField(source="user.email")
    phone = serializers.ReadOnlyField(source="user.phone_number")
    
    # Nested clinical history for the deep-view charts
    records = ClinicalRecordSerializer(many=True, read_only=True)
    
    class Meta:
        model = PatientProfile
        fields = [
            'id', 'user_details', 'full_name', 'email', 'phone',
            'blood_group', 'date_of_birth', 'gender', 'address',
            'emergency_contact_name', 'emergency_contact_phone',
            'allergies', 'medical_history', 'current_medications', 'is_admitted', 
            'room_number', 'records', 'created_at', 'updated_at'
        ]

class PatientCreateSerializer(serializers.ModelSerializer):
    """
    💉 Patient intake Serializer
    Used by admins to quickly register new medical profiles.
    """
    class Meta:
        model = PatientProfile
        fields = ['user', 'blood_group', 'date_of_birth', 'gender', 'address', 'emergency_contact_name', 'emergency_contact_phone']
