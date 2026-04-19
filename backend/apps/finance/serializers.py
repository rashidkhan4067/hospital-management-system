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
        fields = ('id', 'name', 'code', 'item_type', 'quantity', 'unit_price', 'subtotal')
        read_only_fields = ('subtotal',)

class InvoiceSerializer(serializers.ModelSerializer):
    patient_name = serializers.ReadOnlyField(source='patient.user.full_name')
    items = InvoiceItemSerializer(many=True, required=False)
    
    class Meta:
        model = Invoice
        fields = (
            'id', 'invoice_no', 'patient', 'patient_name', 'appointment', 
            'admission', 'context_type',
            'total_amount', 'tax_amount', 'discount_amount', 'paid_amount', 
            'due_amount', 'status', 'payment_method', 'patient_notes', 
            'internal_notes', 'created_at', 'invoice_date', 'due_date', 'items'
        )
        read_only_fields = ('invoice_no', 'total_amount', 'due_amount', 'status')

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        invoice = Invoice.objects.create(**validated_data)
        
        for item_data in items_data:
            InvoiceItem.objects.create(invoice=invoice, **item_data)
        
        # Recalculate total is handled by InvoiceItem.save()
        return invoice

class InsuranceClaimSerializer(serializers.ModelSerializer):
    patient_name = serializers.ReadOnlyField(source='patient.user.full_name')
    
    class Meta:
        model = InsuranceClaim
        fields = '__all__'
