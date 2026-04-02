from rest_framework import serializers
from .models import Medicine

class MedicineSerializer(serializers.ModelSerializer):
    """
    💊 Pharmacy Shard Serializer
    Used for retrieving medication profiles and stock levels.
    """
    class Meta:
        model = Medicine
        fields = '__all__'
