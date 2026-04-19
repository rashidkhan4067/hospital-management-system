from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Transaction, Invoice, InsuranceClaim, InvoiceItem
from .serializers import TransactionSerializer, InvoiceSerializer, InsuranceClaimSerializer, InvoiceItemSerializer
from .services import BillingService

class TransactionViewSet(viewsets.ModelViewSet):
    """
    💳 FISCAL AUDIT REPOSITORY
    Tracks every cent flowing in/out of the hospital cluster.
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['type', 'method', 'status', 'patient']
    search_fields = ['transaction_id', 'description']

class InvoiceViewSet(viewsets.ModelViewSet):
    """
    🧾 CLINICAL BILLING CORE
    Handles patient invoicing, payment processing, and itemization.
    """
    queryset = Invoice.objects.all().prefetch_related('items')
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['status', 'patient']
    search_fields = ['invoice_no', 'patient__user__full_name']

    def get_queryset(self):
        queryset = super().get_queryset()
        status_in = self.request.query_params.get('status_in')
        if status_in:
            statuses = status_in.split(',')
            queryset = queryset.filter(status__in=statuses)
        return queryset

    @action(detail=True, methods=['post'], url_path='pay')
    def process_payment(self, request, pk=None):
        """
        Record a payment transaction for this invoice.
        """
        amount = request.data.get('amount')
        method = request.data.get('method', 'CASH')
        description = request.data.get('description', '')

        if not amount:
            return Response({"error": "Payment amount is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            transaction, invoice = BillingService.process_payment(pk, amount, method, description)
            return Response({
                "message": f"Payment of {amount} processed successfully.",
                "invoice_status": invoice.status,
                "due_amount": str(invoice.due_amount),
                "transaction_id": transaction.transaction_id
            })
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='add-item')
    def add_item(self, request, pk=None):
        """
        Add a line item to an existing invoice.
        """
        invoice = self.get_object()
        serializer = InvoiceItemSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(invoice=invoice)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='from-appointment')
    def from_appointment(self, request):
        """
        Create a base invoice from an appointment.
        """
        appointment_id = request.data.get('appointment_id')
        fee = request.data.get('consultation_fee', 50.00)

        if not appointment_id:
            return Response({"error": "appointment_id is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            invoice = BillingService.generate_appointment_invoice(appointment_id, fee)
            serializer = self.get_serializer(invoice)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class InsuranceClaimViewSet(viewsets.ModelViewSet):
    """
    🛡️ INSURANCE POLICY SHARD
    Tracks health insurance propagation for patient claims.
    """
    queryset = InsuranceClaim.objects.all()
    serializer_class = InsuranceClaimSerializer
    permission_classes = [permissions.IsAuthenticated]

class InvoiceItemViewSet(viewsets.ModelViewSet):
    """
    📦 ITEM SEGMENT ENDPOINT
    Directly manage line items if needed.
    """
    queryset = InvoiceItem.objects.all()
    serializer_class = InvoiceItemSerializer
    permission_classes = [permissions.IsAuthenticated]
