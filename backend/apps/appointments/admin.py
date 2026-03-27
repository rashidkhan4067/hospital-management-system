"""
apps/appointments/admin.py
───────────────────────────
Registers the Appointment model with the Django admin.
Uses date_hierarchy for easy date-based drilling and
list_select_related to prevent N+1 on patient + doctor + doctor.user.
"""

from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    """Admin for the Appointment model."""

    list_display = [
        "get_patient_name", "get_doctor_name", "appointment_date",
        "start_time", "end_time", "status", "booked_via_voice", "created_at",
    ]

    list_display_links = ["get_patient_name", "appointment_date"]

    list_filter = ["status", "booked_via_voice", "appointment_date", "doctor__specialization"]

    search_fields = [
        "patient__first_name", "patient__last_name", "patient__email",
        "doctor__user__first_name", "doctor__user__last_name",
    ]

    # Date hierarchy adds a clickable breadcrumb drill-down by year → month → day
    date_hierarchy = "appointment_date"

    ordering = ["-appointment_date", "start_time"]

    readonly_fields = ["created_at", "updated_at", "booked_via_voice"]

    # Prevent N+1 queries: fetch patient + doctor + doctor.user in one join
    list_select_related = ["patient", "doctor", "doctor__user"]

    fieldsets = (
        (_("Participants"), {
            "fields": ("patient", "doctor"),
        }),
        (_("Schedule"), {
            "fields": ("appointment_date", "start_time", "end_time", "status"),
        }),
        (_("Notes"), {
            "fields": ("notes", "doctor_notes", "cancellation_reason"),
        }),
        (_("Metadata"), {
            "fields": ("booked_via_voice", "created_at", "updated_at"),
            "classes": ("collapse",),
        }),
    )

    @admin.display(description="Patient", ordering="patient__first_name")
    def get_patient_name(self, obj):
        return obj.patient.full_name

    @admin.display(description="Doctor", ordering="doctor__user__first_name")
    def get_doctor_name(self, obj):
        return str(obj.doctor)
