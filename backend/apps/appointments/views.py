"""
apps/appointments/views.py
──────────────────────────
Views for managing and booking appointments.
"""
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction

try:
    from django_filters.rest_framework import DjangoFilterBackend
except ImportError:
    DjangoFilterBackend = None

from .models import Appointment, IdempotencyKey
from .serializers import (
    AppointmentSerializer,
    AppointmentCreateSerializer,
    AppointmentCancelSerializer
)
from apps.accounts.permissions import IsAdminUser, IsPatientUser, IsDoctorUser

# Import the newly created OOP cache & availability service
from .services import FastSlotAlgorithmService



class AppointmentViewSet(viewsets.ModelViewSet):
    """
    CRUD API for Appointments.
    Provides strict role-based data isolation.
    """
    
    if DjangoFilterBackend:
        filter_backends = [DjangoFilterBackend]
        filterset_fields = ["status", "appointment_date", "doctor_id"]
    
    def get_queryset(self):
        """
        Dynamically filter appointments based on the user's role:
          - Admins see EVERYTHING.
          - Doctors see ONLY their own appointments.
          - Patients see ONLY appointments they booked.
        """
        user = self.request.user
        
        # Security fallback: shouldn't happen due to permissions classes, 
        # but protects against accidental leakage.
        if not user.is_authenticated:
            return Appointment.objects.none()
            
        # Optimize queries by fetching related user info in one go
        qs = Appointment.objects.select_related("patient", "doctor", "doctor__user").all()
        
        if user.is_admin:
            return qs
        elif user.is_doctor:
            return qs.filter(doctor__user=user)
        else:
            return qs.filter(patient=user)

    def get_serializer_class(self):
        """
        Choose the right serializer.
        """
        if self.action == "create":
            return AppointmentCreateSerializer
        elif self.action == "cancel":
            return AppointmentCancelSerializer
        return AppointmentSerializer

    def get_permissions(self):
        """
        Only patients can CREATE appointments via this standard flow.
        (Admin booking might happen via Django Admin).
        All other operations require authentication (further restricted by get_queryset).
        """
        if self.action == "create":
            return [permissions.IsAuthenticated(), IsPatientUser()]
        return [permissions.IsAuthenticated()]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        """
        POST /api/v1/appointments/
        Overrides standard creation to add DB-level locking 
        for guaranteed protection against double-booking race conditions.
        """
        # ── Architecture Principle: API Idempotency ───────────────────────────
        # When clients (like React/mobile apps) lose connection, they might
        # retry the exact same POST. If we process it twice, we could double
        # book. The client sends a unique UUID per intent in the header.
        idempotency_key = request.headers.get("Idempotency-Key")
        if idempotency_key:
            if IdempotencyKey.objects.filter(key=idempotency_key).exists():
                return Response(
                    {"detail": "Request already processed. Provide a new Idempotency-Key if this is a new booking intent."},
                    status=status.HTTP_409_CONFLICT
                )
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        doctor = serializer.validated_data["doctor"]
        appt_date = serializer.validated_data["appointment_date"]
        start_time = serializer.validated_data["start_time"]
        
        # ── DB-Level Conflict Guard ──────────────────────────────────────────
        # Lock the doctor record explicitly. If two concurrent requests try to
        # book this doctor, the second one will wait here until the first finishes.
        from apps.doctors.models import Doctor
        locked_doctor = Doctor.objects.select_for_update().get(id=doctor.id)
        
        # Check for conflict inside the lock:
        conflict_exists = Appointment.objects.filter(
            doctor=locked_doctor,
            appointment_date=appt_date,
            start_time=start_time
        ).exclude(status=Appointment.Status.CANCELLED).exists()
        
        if conflict_exists:
            # Drop the transaction safely and return 409
            return Response(
                {"start_time": ["This time slot is already booked."]},
                status=status.HTTP_409_CONFLICT
            )
            
        # No conflict -> perform creation safely
        self.perform_create(serializer)
        
        # --- DSA: Invalidate LRU Cache after successful creation (O(1) invalidation) ---
        FastSlotAlgorithmService().invalidate_cache(doctor.id, appt_date)
        
        # Lock in the Idempotency key if one was provided to prevent immediate replays
        if idempotency_key:
            IdempotencyKey.objects.create(key=idempotency_key)
            
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=["patch"])
    def cancel(self, request, pk=None):
        """
        PATCH /api/v1/appointments/{id}/cancel/
        Provides a dedicated endpoint to cancel appointments, ensuring
        records are preserved rather than deleted.
        """
        appointment = self.get_object()
        serializer = self.get_serializer(appointment, data=request.data, partial=True)
        
        # Validations (like `is_cancellable`) run inside the serializer
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # --- DSA: Invalidate LRU Cache on cancellation (O(1) invalidation) ---
        FastSlotAlgorithmService().invalidate_cache(
            appointment.doctor.id, 
            appointment.appointment_date
        )
        
        # Return full updated representation
        return Response(AppointmentSerializer(appointment).data)
