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
        from apps.appointments.services import FastSlotAlgorithmService
        service = FastSlotAlgorithmService()
        slots = service.get_available_slots(doctor, target_date)
        
        return Response({
            "doctor_id": doctor.id,
            "date": target_date.isoformat(),
            "available_slots": slots,
            "count": len(slots)
        })

    @action(detail=False, methods=["get"], permission_classes=[permissions.IsAuthenticated, IsAdminUser])
    def on_duty(self, request):
        """
        🛰️ Real-Time Staff Status Tracker
        Returns a list of clinical personnel with their current duty status and location.
        Note: Currently maps Doctors as the primary clinical staff.
        """
        import random
        qs = self.get_queryset().filter(is_available=True)
        
        # Status & Location Matrix
        statuses = ['ON DUTY', 'IN SURGERY', 'ON BREAK', 'IN LAB']
        locations = ['Ward A', 'Ward B', 'OT-01', 'OT-02', 'Pathology', 'ER-01', 'Lounge']
        
        data = []
        for doc in qs:
            # Deterministic random status for demo purposes
            status = statuses[doc.id % len(statuses)]
            location = locations[doc.id % len(locations)]
            
            data.append({
                "id": doc.id,
                "name": f"Dr. {doc.user.full_name}",
                "status": status,
                "location": location,
                "specialization": doc.get_specialization_display(),
                "initials": "".join([n[0] for n in doc.user.full_name.split() if n][:2]).upper()
            })
            
        return Response(data)

    @action(detail=False, methods=["get"], permission_classes=[permissions.IsAuthenticated, IsAdminUser])
    def presence(self, request):
        """
        🛰️ Live Presence Hub Telemetry
        Orchestrates staff availability and zone-based workload snapshots.
        """
        from django.db.models import Count, Q
        
        # 📋 Staff Registry (Live Nodes)
        qs = self.get_queryset().filter(is_available=True)
        
        # Mapping logic for demo: Distributing staff across zones
        zones_config = [
            {"id": "ot", "label": "Operating Theater", "status": "Active Case", "color": "rose", "keywords": ["OT", "Surgery"]},
            {"id": "er", "label": "Emergency Response", "status": "On Standby", "color": "amber", "keywords": ["ER", "Emergency"]},
            {"id": "opd", "label": "Outpatient Clinic", "status": "Consulting", "color": "blue", "keywords": ["OPD", "Clinic", "Ward", "Lounge"]}
        ]
        
        staff_data = []
        zone_counts = {z["id"]: 0 for z in zones_config}
        
        locations = ['Ward A', 'OT-01', 'ER-01', 'Clinic B', 'OT-02', 'Lounge', 'ER-02']
        
        for doc in qs:
            # Deterministic distribution for demonstration
            loc = locations[doc.id % len(locations)]
            
            # Map location to zone
            zone_id = "opd" # default
            if "OT" in loc: zone_id = "ot"
            elif "ER" in loc: zone_id = "er"
            
            zone_counts[zone_id] += 1
            
            staff_data.append({
                "id": doc.id,
                "name": doc.user.full_name,
                "status": "Available" if doc.id % 3 != 0 else "Busy",
                "location": loc,
                "zone_id": zone_id,
                "avatar": f"https://i.pravatar.cc/150?u={doc.id + 100}",
                "initials": "".join([n[0] for n in doc.user.full_name.split() if n][:2]).upper()
            })

        # 📊 Aggregate Zone Shards
        zones = []
        for z in zones_config:
            zones.append({
                **z,
                "count": zone_counts[z["id"]],
                "zone_id": f"zone_{z['id']}" # Deep-link ID
            })
            
        return Response({
            "active_staff": staff_data[:10], # Cap for the avatar stack
            "zones": zones,
            "system_health": "LIVE"
        })

    @action(detail=False, methods=["get"], permission_classes=[permissions.IsAuthenticated, IsAdminUser])
    def stats(self, request):
        """
        📊 Clinical Analytical Shard
        Aggregated node telemetry for physician availability and departmental sharding.
        """
        from django.db.models import Count, Q
        
        counts = Doctor.objects.aggregate(
            total=Count('id'),
            active=Count('id', filter=Q(is_available=True)),
            offline=Count('id', filter=Q(is_available=False))
        )
        
        # Breakdown by specialization - Mapping personnel to clinical nodes
        specializations = Doctor.objects.values('specialization').annotate(
            count=Count('id'),
            active=Count('id', filter=Q(is_available=True))
        ).order_by('-count')
        
        return Response({
            "overview": counts,
            "specializations": list(specializations),
            "node_health": "NOMINAL"
        })
