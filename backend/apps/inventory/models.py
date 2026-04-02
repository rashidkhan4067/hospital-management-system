from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings

class InventoryCategory(models.Model):
    """
    Categorization shard for the Global Resource Allocation matrix.
    E.g., "Surgical Supplies", "Medications", "Diagnostic Equipment".
    """
    name = models.CharField(_("category name"), max_length=100, unique=True)
    description = models.TextField(_("description"), blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("inventory category")
        verbose_name_plural = _("inventory categories")
        db_table = "hospital_inventory_categories"

    def __str__(self):
        return self.name

class InventoryItem(models.Model):
    """
    Individual resource shard in the clinical supply chain.
    Tracks current stock levels, unit types, and reorder thresholds.
    """
    class UnitType(models.TextChoices):
        UNITS    = "units",    _("Units")
        BOXES    = "boxes",    _("Boxes")
        PACKS    = "packs",    _("Packs")
        LITERS   = "liters",   _("Liters")
        MG       = "mg",       _("Milligrams")

    category = models.ForeignKey(
        InventoryCategory,
        on_delete=models.CASCADE,
        related_name="items",
        help_text=_("The thematic category for this resource shard.")
    )
    name = models.CharField(_("item name"), max_length=200)
    sku = models.CharField(_("SKU / System Identifier"), max_length=50, unique=True)
    unit = models.CharField(_("measurement unit"), max_length=20, choices=UnitType.choices, default=UnitType.UNITS)
    current_stock = models.PositiveIntegerField(_("current stock level"), default=0)
    min_stock_level = models.PositiveIntegerField(_("minimum stock threshold"), default=10)
    unit_price = models.DecimalField(_("unit price (PKR)"), max_digits=10, decimal_places=2, default=0.00)
    supplier_info = models.TextField(_("supplier intelligence"), blank=True)
    location = models.CharField(_("physical storage node"), max_length=100, blank=True)
    
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("inventory item")
        verbose_name_plural = _("inventory items")
        db_table = "hospital_inventory_items"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.sku})"

    @property
    def status(self):
        if self.current_stock == 0:
            return "critical"
        if self.current_stock <= self.min_stock_level:
            return "low"
        return "stable"

class StockLog(models.Model):
    """
    Audit trail for resource allocation modifications.
    Records every 'IN' and 'OUT' transaction in the supply matrix.
    """
    class TransactionType(models.TextChoices):
        IN   = "in",   _("Restock / Inward")
        OUT  = "out",  _("Allocation / Outward")
        ADJ  = "adj",  _("Manual Adjustment")

    item = models.ForeignKey(InventoryItem, on_delete=models.CASCADE, related_name="logs")
    transaction_type = models.CharField(max_length=10, choices=TransactionType.choices)
    quantity = models.IntegerField(_("quantity shard"))
    reason = models.CharField(_("allocation reason"), max_length=255, blank=True)
    performed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("stock log")
        verbose_name_plural = _("stock logs")
        db_table = "hospital_inventory_logs"
        ordering = ["-timestamp"]
