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
    AdminAppointmentCreateSerializer,
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
        Choose the right serializer based on the user's role and action.
        """
        if self.action == "create":
            if self.request.user.is_admin:
                return AdminAppointmentCreateSerializer
            return AppointmentCreateSerializer
        elif self.action == "cancel":
            return AppointmentCancelSerializer
        return AppointmentSerializer

    def get_permissions(self):
        """
        Admins and Patients can CREATE appointments.
        All other operations require authentication.
        """
        if self.action == "create":
            return [permissions.IsAuthenticated()] # Role check is inside get_serializer_class or via common sense
        return [permissions.IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        """
        POST /api/v1/appointments/
        """
        # ── Architecture Principle: API Idempotency ───────────────────────────
        idempotency_key = request.headers.get("Idempotency-Key")
        if idempotency_key:
            if IdempotencyKey.objects.filter(key=idempotency_key).exists():
                return Response(
                    {"detail": "Request already processed."},
                    status=status.HTTP_409_CONFLICT
                )
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        instance = self.perform_create(serializer)
        
        # After perform_create, the instance is available
        doctor = instance.doctor
        appt_date = instance.appointment_date
        
        # --- DSA: Invalidate LRU Cache (O(1) invalidation) ---
        FastSlotAlgorithmService().invalidate_cache(doctor.id, appt_date)
        
        if idempotency_key:
            IdempotencyKey.objects.create(key=idempotency_key)
            
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @transaction.atomic
    def perform_create(self, serializer):
        from rest_framework.exceptions import ValidationError
        from apps.doctors.models import Doctor
        
        # Access doctor directly from validated_data
        doctor = serializer.validated_data["doctor"]
        appt_date = serializer.validated_data["appointment_date"]
        start_time = serializer.validated_data["start_time"]
        
        # ── DB-Level Conflict Guard ──────────────────────────────────────────
        locked_doctor = Doctor.objects.select_for_update().get(id=doctor.id)
        
        conflict_exists = Appointment.objects.filter(
            doctor=locked_doctor,
            appointment_date=appt_date,
            start_time=start_time
        ).exclude(status=Appointment.Status.CANCELLED).exists()
        
        if conflict_exists:
            raise ValidationError({"detail": "Slot unavailable."})
            
        # If admin is creating, patient might already be in validated_data
        if "patient" not in serializer.validated_data:
            return serializer.save(patient=self.request.user)
        return serializer.save()

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
