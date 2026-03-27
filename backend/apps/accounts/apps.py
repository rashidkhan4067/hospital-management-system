"""
apps/accounts/apps.py
Minimal AppConfig for the accounts app.
Django requires this file to recognize the app with its dotted path "apps.accounts".
"""
from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.accounts"            # Must match the dotted path in INSTALLED_APPS
    label = "accounts"                # Short name used in db table prefixes
    verbose_name = "Accounts"         # Human-readable name shown in admin
