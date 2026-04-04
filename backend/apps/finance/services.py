from django.db import transaction
from .models import Invoice, InvoiceItem, Transaction
from apps.appointments.models import Appointment
from django.utils import timezone
from decimal import Decimal

class BillingService:
    """
    🏗️ BILLING ORCHESTRATOR
    Atomic logic for generating invoices and processing payments.
    """

    @staticmethod
    @transaction.atomic
    def generate_appointment_invoice(appointment_id, consultation_fee=50.00):
        """
        Creates a base invoice for a completed appointment.
        """
        appointment = Appointment.objects.get(id=appointment_id)
        
        # Check if invoice already exists
        if hasattr(appointment, 'invoice'):
            return appointment.invoice

        invoice = Invoice.objects.create(
            patient=appointment.patient,
            appointment=appointment,
            total_amount=0, # Will be updated by items
            due_date=timezone.now().date() + timezone.timedelta(days=7)
        )

        # Add base consultation item
        InvoiceItem.objects.create(
            invoice=invoice,
            name=f"Consultation Fee - {appointment.doctor.user.full_name}",
            item_type='CONSULTATION',
            unit_price=Decimal(consultation_fee),
            quantity=1
        )

        return invoice

    @staticmethod
    @transaction.atomic
    def process_payment(invoice_id, amount, method='CASH', description=""):
        """
        Records a payment transaction and updates the invoice.
        """
        invoice = Invoice.objects.get(id=invoice_id)
        amount = Decimal(amount)

        # Create Transaction
        transaction = Transaction.objects.create(
            patient=invoice.patient,
            type='INCOME',
            method=method,
            amount=amount,
            description=description or f"Payment for Invoice {invoice.invoice_no}",
            status='completed'
        )

        # Update Invoice paid amount
        invoice.paid_amount += amount
        invoice.save()

        return transaction, invoice
