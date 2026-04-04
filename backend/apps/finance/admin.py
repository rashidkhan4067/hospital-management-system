from django.contrib import admin
from .models import Transaction, Invoice, InvoiceItem, InsuranceClaim

class InvoiceItemInline(admin.TabularInline):
    model = InvoiceItem
    extra = 1

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('transaction_id', 'patient', 'type', 'method', 'amount', 'timestamp', 'status')
    list_filter = ('type', 'method', 'status', 'timestamp')
    search_fields = ('transaction_id', 'description', 'patient__user__full_name')
    readonly_fields = ('transaction_id', 'timestamp')

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('invoice_no', 'patient', 'total_amount', 'paid_amount', 'due_amount', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('invoice_no', 'patient__user__full_name')
    readonly_fields = ('invoice_no', 'total_amount', 'due_amount', 'created_at')
    inlines = [InvoiceItemInline]

@admin.register(InsuranceClaim)
class InsuranceClaimAdmin(admin.ModelAdmin):
    list_display = ('patient', 'provider', 'policy_number', 'claim_amount', 'status', 'filed_at')
    list_filter = ('status', 'filed_at')
    search_fields = ('policy_number', 'provider', 'patient__user__full_name')
