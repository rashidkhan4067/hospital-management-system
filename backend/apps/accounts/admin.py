"""
apps/accounts/admin.py
───────────────────────
Registers the custom User model with the Django admin.
We extend UserAdmin (instead of ModelAdmin) because UserAdmin provides
the correct password hashing widgets and change-password form out of the box.
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Custom admin for the User model.
    Extends BaseUserAdmin to keep password hashing, permissions, and
    group management working correctly while adding our custom fields.
    """

    # Columns shown in the user list view
    list_display = [
        "email", "full_name", "role", "phone_number",
        "is_active", "is_staff", "created_at",
    ]

    # Clickable links in the list view (opens the edit page)
    list_display_links = ["email", "full_name"]

    # Sidebar filters
    list_filter = ["role", "is_active", "is_staff", "created_at"]

    # Columns that can be edited inline in the list view
    list_editable = ["is_active"]

    # Search across these fields
    search_fields = ["email", "first_name", "last_name", "phone_number"]

    # Default sort: newest first
    ordering = ["-created_at"]

    # Fieldsets define the layout of the EDIT page
    fieldsets = (
        # Section 1: Login credentials
        (_("Login Credentials"), {
            "fields": ("email", "password"),
        }),
        # Section 2: Personal info
        (_("Personal Information"), {
            "fields": ("first_name", "last_name", "username", "phone_number"),
        }),
        # Section 3: Role and permissions
        (_("Role & Permissions"), {
            "fields": ("role", "is_active", "is_staff", "is_superuser", "groups", "user_permissions"),
        }),
        # Section 4: Read-only timestamps
        (_("Timestamps"), {
            "fields": ("last_login", "created_at", "updated_at"),
            "classes": ("collapse",),   # Collapsed by default to save space
        }),
    )

    # Fields shown when ADDING a new user via admin
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "first_name", "last_name",
                "role", "phone_number",
                "password1", "password2",   # password1/2 = confirm password widget
            ),
        }),
    )

    # These fields are shown but cannot be edited (computed/auto fields)
    readonly_fields = ["created_at", "updated_at", "last_login"]
