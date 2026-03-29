"""
apps/doctors/views.py
──────────────────────
Views for the doctors app.
"""
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from datetime import datetime

try:
    from django_filters.rest_framework import DjangoFilterBackend
except ImportError:
    DjangoFilterBackend = None

from .models import Doctor
from .serializers import DoctorSerializer, DoctorListSerializer, DoctorCreateSerializer
from apps.accounts.permissions import IsAdminUser
from apps.appointments.services import FastSlotAlgorithmService


class DoctorViewSet(viewsets.ModelViewSet):
    """
    CRUD API for Doctors.
    
    GET /api/v1/doctors/             -> List doctors
    GET /api/v1/doctors/{id}/        -> Retrieve specific doctor
    POST /api/v1/doctors/            -> Create new doctor profile (Admin only)
    PUT/PATCH /api/v1/doctors/{id}/  -> Update doctor details (Admin only)
    DELETE /api/v1/doctors/{id}/     -> Delete doctor profile (Admin only)
    """
    queryset = Doctor.objects.select_related("user").all()
    
    # Configure filtering, searching, and ordering
    if DjangoFilterBackend:
        filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
        filterset_fields = ["specialization", "is_available"]
    else:
        filter_backends = [filters.SearchFilter, filters.OrderingFilter]
        
    search_fields = ["user__first_name", "user__last_name", "specialization"]
    ordering_fields = ["experience_years", "consultation_fee"]

    def get_serializer_class(self):
        """
        Dynamically choose serializer based on the current action.
        """
        if self.action == "list":
            return DoctorListSerializer
        elif self.action == "create":
            return DoctorCreateSerializer
        return DoctorSerializer

    def get_permissions(self):
        """
        Admins can create, update, or delete.
        Anyone (even unauthenticated patients browsing the portal) can list and retrieve.
        """
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [permissions.IsAuthenticated(), IsAdminUser()]
        return [permissions.AllowAny()]

    @action(detail=True, methods=["get"], permission_classes=[permissions.AllowAny])
    def available_slots(self, request, pk=None):
        """
        GET /api/v1/doctors/{id}/available_slots/?date=YYYY-MM-DD
        Uses modern DSA (Hash Map Sets, LRU Caching) and OOP (Strategy Pattern via Service Layer)
        to instantly compute and return available slots for a given day.
        """
        doctor = self.get_object()
        date_str = request.query_params.get("date")
        
        if not date_str:
            raise ValidationError({"date": "Please provide a 'date' query parameter (YYYY-MM-DD)."})
            
        try:
            target_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            raise ValidationError({"date": "Invalid date format. Use YYYY-MM-DD."})
            
        # Call the OOP Service layer
        service = FastSlotAlgorithmService()
        slots = service.get_available_slots(doctor, target_date)
        
        return Response({
            "doctor_id": doctor.id,
            "date": target_date.isoformat(),
            "available_slots": slots,
            "count": len(slots)
        })
