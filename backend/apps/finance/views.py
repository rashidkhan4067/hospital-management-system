from rest_framework import serializers, viewsets, permissions, filters
from .models import Transaction, Invoice, InsuranceClaim

class TransactionSerializer(serializers.ModelSerializer):
    patient_name = serializers.ReadOnlyField(source='patient.user.full_name')
    class Meta:
        model = Transaction
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    patient_name = serializers.ReadOnlyField(source='patient.user.full_name')
    class Meta:
        model = Invoice
        fields = '__all__'

class InsuranceClaimSerializer(serializers.ModelSerializer):
    patient_name = serializers.ReadOnlyField(source='patient.user.full_name')
    class Meta:
        model = InsuranceClaim
        fields = '__all__'

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['type', 'method', 'status', 'patient']
    search_fields = ['transaction_id', 'description']

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['status', 'patient']

class InsuranceClaimViewSet(viewsets.ModelViewSet):
    queryset = InsuranceClaim.objects.all()
    serializer_class = InsuranceClaimSerializer
    permission_classes = [permissions.IsAuthenticated]
