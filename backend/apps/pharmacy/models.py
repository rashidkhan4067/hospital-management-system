from django.db import models
from django.utils.translation import gettext_lazy as _

class Medicine(models.Model):
    """
    💊 Pharmacy Inventory Shard
    Tracks medical stock, category, and expiry metadata.
    """
    CATEGORIES = [
        ('antibiotics', _('Antibiotics')),
        ('analgesics', _('Analgesics')),
        ('antivirals', _('Antivirals')),
        ('supplements', _('Supplements')),
        ('cardiac', _('Cardiac Care')),
    ]

    name = models.CharField(_("medicine name"), max_length=200, unique=True)
    chemical_formula = models.CharField(_("genetic formula"), max_length=255, blank=True)
    category = models.CharField(_("clinical category"), max_length=50, choices=CATEGORIES)
    
    stock_quantity = models.IntegerField(_("current stock"), default=0)
    unit_price = models.DecimalField(_("price per unit"), max_digits=10, decimal_places=2)
    
    expiry_date = models.DateField(_("expiry date"))
    batch_number = models.CharField(_("batch ID"), max_length=50, unique=True)

    reorder_level = models.IntegerField(_("reorder threshold"), default=10, help_text=_("Alert admin when stock falls below this."))
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "hospital_pharmacy_inventory"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.stock_quantity} units)"
