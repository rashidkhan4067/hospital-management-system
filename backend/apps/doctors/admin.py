"""
apps/doctors/admin.py
──────────────────────
Registers the Doctor model with the Django admin.
Uses list_select_related to avoid N+1 queries when loading the doctor list
(each doctor row needs to access user.first_name, user.last_name, user.email).
"""

from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Doctor


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    """Admin for the Doctor model."""

    # Columns in the list view
    list_display = [
        "get_doctor_name", "get_email", "specialization",
        "experience_years", "consultation_fee", "is_available", "created_at",
    ]

    list_display_links = ["get_doctor_name"]

    list_filter = ["specialization", "is_available", "available_days"]

    list_editable = ["is_available", "consultation_fee"]

    search_fields = [
        "user__first_name", "user__last_name",
        "user__email", "license_number",
    ]

    ordering = ["user__first_name", "user__last_name"]

    readonly_fields = ["created_at", "updated_at"]

    # Fetch user join in one SQL query instead of N separate queries
    list_select_related = ["user"]

    fieldsets = (
        (_("Linked User Account"), {
            "fields": ("user",),
        }),
        (_("Professional Details"), {
            "fields": (
                "license_number", "specialization", "experience_years",
                "consultation_fee", "bio",
            ),
        }),
        (_("Availability"), {
            "fields": (
                "is_available", "available_days",
                "consultation_start_time", "consultation_end_time",
                "slot_duration_minutes",
            ),
        }),
        (_("Timestamps"), {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",),
        }),
    )

    # ── Custom list columns (need methods for related field display) ───────────

    @admin.display(description="Doctor Name", ordering="user__first_name")
    def get_doctor_name(self, obj):
        """Returns formatted doctor name for the list column."""
        return f"Dr. {obj.user.full_name}"

    @admin.display(description="Email", ordering="user__email")
    def get_email(self, obj):
        """Returns the linked user's email for quick reference."""
        return obj.user.email
