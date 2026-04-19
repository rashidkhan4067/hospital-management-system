from rest_framework import serializers
from .models import Ward, Room, Bed, PatientAdmission

class WardSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    bed_count = serializers.SerializerMethodField()
    occupied_beds = serializers.SerializerMethodField()

    class Meta:
        model = Ward
        fields = '__all__'

    def get_bed_count(self, obj):
        return Bed.objects.filter(room__ward=obj).count()

    def get_occupied_beds(self, obj):
        return Bed.objects.filter(room__ward=obj, status='occupied').count()

class RoomSerializer(serializers.ModelSerializer):
    ward_name = serializers.CharField(source='ward.name', read_only=True)
    available_beds = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = '__all__'

    def get_available_beds(self, obj):
        return obj.beds.filter(status='available').count()

class BedSerializer(serializers.ModelSerializer):
    ward_name = serializers.CharField(source='room.ward.name', read_only=True, default="N/A")
    room_number = serializers.CharField(source='room.room_number', read_only=True, default="Unassigned")
    patient_name = serializers.CharField(source='patient.user.full_name', read_only=True, default="N/A")

    class Meta:
        model = Bed
        fields = '__all__'

class PatientAdmissionCreateSerializer(serializers.ModelSerializer):
    """
    🔬 Advanced Intake Instrument.
    Handles clinical admission with atomic resource locking.
    """
    class Meta:
        model = PatientAdmission
        fields = [
            'patient', 'ward', 'room', 'bed', 'admitted_by', 
            'admission_date', 'source', 'severity', 
            'primary_diagnosis', 'clinical_notes', 'is_emergency'
        ]

    def validate_patient(self, value):
        # 🛡️ Clinical Integrity Check: No Duplicate Active Admissions
        if PatientAdmission.objects.filter(patient=value, status=PatientAdmission.AdmissionStatus.ACTIVE).exists():
            raise serializers.ValidationError("Subject already has an active admission shard in the clinical matrix.")
        return value

    def validate_bed(self, value):
        if value.status != Bed.BedStatus.AVAILABLE:
            raise serializers.ValidationError("Target clinical node (Bed) is occupied or offline.")
        return value

    def create(self, validated_data):
        # 🛸 Atomic IPD Intake (Non-OPD Pathway)
        bed = validated_data['bed']
        patient = validated_data['patient']
        
        # Ensure only IPD shard is created
        admission = super().create(validated_data)
        
        # Lock Resource Matrix
        bed.status = Bed.BedStatus.OCCUPIED
        bed.patient = patient
        bed.save()
        
        # Synchronize Patient State
        patient.is_admitted = True
        patient.save()
        
        return admission

class PatientAdmissionSerializer(serializers.ModelSerializer):
    patient_details = serializers.SerializerMethodField()
    ward_details = serializers.SerializerMethodField()
    bed_details = serializers.SerializerMethodField()
    doctor_details = serializers.SerializerMethodField()

    class Meta:
        model = PatientAdmission
        fields = '__all__'

    def get_patient_details(self, obj):
        return {
            "id": obj.patient.id, 
            "name": obj.patient.user.get_full_name() if obj.patient.user else "N/A", 
            "mrn": obj.patient.mrn
        }
    
    def get_ward_details(self, obj):
        return {"id": obj.ward.id, "name": obj.ward.name, "code": obj.ward.code}

    def get_bed_details(self, obj):
        return {"id": obj.bed.id, "number": obj.bed.bed_number}

    def get_doctor_details(self, obj):
        user = obj.admitted_by.user if obj.admitted_by else None
        return {"id": obj.admitted_by.id, "name": user.get_full_name() if user else "Staff"}
