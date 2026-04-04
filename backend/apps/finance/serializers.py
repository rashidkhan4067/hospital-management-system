from rest_framework import serializers
from .models import Transaction, Invoice, InsuranceClaim, InvoiceItem
from apps.patients.models import PatientProfile

class TransactionSerializer(serializers.ModelSerializer):
    patient_name = serializers.ReadOnlyField(source='patient.user.full_name')
    
    class Meta:
        model = Transaction
        fields = '__all__'

class InvoiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceItem
        fields = ('id', 'name', 'item_type', 'quantity', 'unit_price', 'subtotal')
        read_only_fields = ('subtotal',)

class InvoiceSerializer(serializers.ModelSerializer):
    patient_name = serializers.ReadOnlyField(source='patient.user.full_name')
    items = InvoiceItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Invoice
        fields = (
            'id', 'invoice_no', 'patient', 'patient_name', 'appointment', 
            'total_amount', 'paid_amount', 'due_amount', 'status', 
            'created_at', 'due_date', 'items'
        )
        read_only_fields = ('invoice_no', 'total_amount', 'due_amount', 'status')

class InsuranceClaimSerializer(serializers.ModelSerializer):
    patient_name = serializers.ReadOnlyField(source='patient.user.full_name')
    
    class Meta:
        model = InsuranceClaim
        fields = '__all__'
