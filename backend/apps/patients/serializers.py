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
    
    # Nested clinical history
    records = ClinicalRecordSerializer(many=True, read_only=True)
    invoices = serializers.SerializerMethodField()
    appointments = serializers.SerializerMethodField()
    admissions = serializers.SerializerMethodField()
    lab_orders = serializers.SerializerMethodField()
    
    class Meta:
        model = PatientProfile
        fields = [
            'id', 'user', 'user_details', 'full_name', 'email', 'phone',
            'mrn', 'status', 'blood_group', 'date_of_birth', 'gender', 'address',
            'emergency_contact_name', 'emergency_contact_phone',
            'allergies', 'medical_history', 'current_medications', 'is_admitted', 
            'room_number', 'records', 'invoices', 'appointments', 'admissions', 'lab_orders', 'created_at', 'updated_at'
        ]

    def get_invoices(self, obj):
        from apps.finance.serializers import InvoiceSerializer
        return InvoiceSerializer(obj.invoices.all().order_by('-created_at')[:5], many=True, read_only=True).data

    def get_appointments(self, obj):
        from apps.appointments.serializers import AppointmentSerializer
        return AppointmentSerializer(obj.user.appointments.all().order_by('-appointment_date')[:5], many=True, read_only=True).data

    def get_admissions(self, obj):
        from apps.wards.serializers import PatientAdmissionSerializer
        return PatientAdmissionSerializer(obj.admissions.all().order_by('-admission_date')[:5], many=True, read_only=True).data

    def get_lab_orders(self, obj):
        from apps.lab.serializers import LabOrderSerializer
        return LabOrderSerializer(obj.lab_orders.all().order_by('-created_at')[:5], many=True, read_only=True).data

class PatientListSerializer(serializers.ModelSerializer):
    """
    ⚡ Lightweight Patient List Serializer
    Minimal fields for dashboard widgets — avoids all nested queries.
    """
    full_name = serializers.ReadOnlyField(source="user.full_name")
    email = serializers.ReadOnlyField(source="user.email")
    phone = serializers.ReadOnlyField(source="user.phone_number")

    class Meta:
        model = PatientProfile
        fields = [
            'id', 'full_name', 'email', 'phone',
            'mrn', 'status', 'blood_group', 'gender',
            'is_admitted', 'room_number', 'created_at',
        ]


class PatientCreateSerializer(serializers.ModelSerializer):
    """
    💉 Patient intake Serializer
    Used by admins to quickly register new medical profiles.
    """
    class Meta:
        model = PatientProfile
        fields = ['user', 'blood_group', 'date_of_birth', 'gender', 'address', 'emergency_contact_name', 'emergency_contact_phone']

class AdministrativePatientCreateSerializer(serializers.Serializer):
    """
    🏥 Global Patient Provisioning Serializer
    Handles atomic creation of both Account Identity and Clinical Shard.
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    fullName = serializers.CharField(required=True)
    phone_number = serializers.CharField(required=True)
    
    # Clinical Fields
    age = serializers.IntegerField(required=False, allow_null=True)
    cnic = serializers.CharField(required=True)
    father_name = serializers.CharField(required=False, allow_blank=True)
    national_id_type = serializers.CharField(required=False, default="CNIC")
    marital_status = serializers.CharField(required=False, allow_blank=True)
    occupation = serializers.CharField(required=False, allow_blank=True)
    preferred_language = serializers.CharField(required=False, allow_blank=True)
    
    # Emergency Contact
    emergency_contact_name = serializers.CharField(required=False, allow_blank=True)
    emergency_contact_relationship = serializers.CharField(required=False, allow_blank=True)
    emergency_contact_phone = serializers.CharField(required=False, allow_blank=True)
    
    # Compliance
    privacy_consent = serializers.BooleanField(required=False, default=False)
    
    date_of_birth = serializers.DateField(required=True)
    gender = serializers.CharField(required=True)
    blood_group = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    allergies = serializers.CharField(required=False, allow_blank=True)

    def validate_email(self, value):
        from apps.accounts.models import User
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("An account with this institutional email already exists.")
        return value

    def validate_cnic(self, value):
        from apps.accounts.models import User
        if value and User.objects.filter(cnic=value).exists():
            raise serializers.ValidationError("A clinical record with this National ID already exists.")
        return value

    def create(self, validated_data):
        from apps.accounts.models import User
        
        # 1. Identity Orchestration
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        fullName = validated_data.pop('fullName', 'New Patient')
        phone = validated_data.pop('phone_number', '')
        cnic = validated_data.pop('cnic', '')
        
        # Split name securely
        name_parts = fullName.strip().split(' ')
        first_name = name_parts[0]
        last_name = ' '.join(name_parts[1:]) if len(name_parts) > 1 else ""
        
        user = User.objects.create_user(
            email=email,
            cnic=cnic,
            password=password,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone,
            role=User.Role.PATIENT,
            onboarding_completed=True
        )
        
        # 2. Clinical Shard Update
        # Profile is auto-created by signal, we update it
        profile = PatientProfile.objects.get(user=user)
        for attr, value in validated_data.items():
            if hasattr(profile, attr):
                setattr(profile, attr, value)
        profile.save()
        
        return profile

    def to_representation(self, instance):
        """
        🚀 Output Shard Transition
        We transition from the input schema to the full PatientProfile schema for the response.
        """
        return PatientProfileSerializer(instance).data

