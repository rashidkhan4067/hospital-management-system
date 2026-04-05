from rest_framework import serializers
from .models import Ward, Bed

class WardSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    bed_count = serializers.IntegerField(source='beds.count', read_only=True)
    occupied_beds = serializers.SerializerMethodField()

    class Meta:
        model = Ward
        fields = '__all__'

    def get_occupied_beds(self, obj):
        return obj.beds.filter(is_occupied=True).count()

class BedSerializer(serializers.ModelSerializer):
    ward_name = serializers.CharField(source='ward.name', read_only=True)
    patient_name = serializers.CharField(source='patient.user.full_name', read_only=True, default="N/A")

    class Meta:
        model = Bed
        fields = '__all__'
