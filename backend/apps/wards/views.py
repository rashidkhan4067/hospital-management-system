from rest_framework import viewsets, permissions, status, response
from rest_framework.decorators import action
from django.db.models import Count, Q
from .models import Ward, Room, Bed, PatientAdmission
from .serializers import WardSerializer, RoomSerializer, BedSerializer, PatientAdmissionSerializer

class WardViewSet(viewsets.ModelViewSet):
    queryset = Ward.objects.all().order_by('floor', 'name')
    serializer_class = WardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        dept_id = self.request.query_params.get('department_id')
        if dept_id:
            return self.queryset.filter(department_id=dept_id)
        return self.queryset

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """
        📊 SYSTEM TELEMETRY: Ward & Bed Hub (Optimized Engine)
        Provides high-performance aggregation for the administrative dashboard.
        """
        # 🧪 Aggregate High-Level Metrics (Vectorized)
        stats_agg = Bed.objects.aggregate(
            total=Count('id'),
            occupied=Count('id', filter=Q(status='occupied')),
            available=Count('id', filter=Q(status='available')),
            maintenance=Count('id', filter=Q(status='maintenance')),
            icu_total=Count('id', filter=Q(bed_type='icu')),
            icu_occupied=Count('id', filter=Q(bed_type='icu', status='occupied'))
        )

        total_beds = stats_agg['total']
        occupied = stats_agg['occupied']
        occupancy_rate = (occupied / total_beds * 100) if total_beds > 0 else 0

        # 🏢 Matrix Pulse: Per-Ward Aggregation in a Single Batch
        # We use a single query to get all ward stats by grouping
        ward_stats = Bed.objects.values('room__ward__id', 'room__ward__name', 'room__ward__code').annotate(
            total=Count('id'),
            occupied=Count('id', filter=Q(status='occupied')),
            available=Count('id', filter=Q(status='available')),
            maintenance=Count('id', filter=Q(status='maintenance'))
        ).order_by('room__ward__name')

        ward_matrix = []
        for w in ward_stats:
            if w['room__ward__id']: # Filter out unassigned beds
                ward_matrix.append({
                    "id": w['room__ward__id'],
                    "name": w['room__ward__name'],
                    "code": w['room__ward__code'],
                    "total": w['total'],
                    "occupied": w['occupied'],
                    "available": w['available'],
                    "maintenance": w['maintenance']
                })

        return response.Response({
            "overview": {
                "total_beds": total_beds,
                "occupied": occupied,
                "available": stats_agg['available'],
                "maintenance": stats_agg['maintenance'],
                "icu_stats": f"{stats_agg['icu_occupied']}/{stats_agg['icu_total']}",
                "occupancy_rate": f"{occupancy_rate:.1f}%"
            },
            "ward_matrix": ward_matrix
        })

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all().order_by('room_number')
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            return self.queryset.filter(ward_id=ward_id)
        return self.queryset

class BedViewSet(viewsets.ModelViewSet):
    queryset = Bed.objects.all().order_by('bed_number')
    serializer_class = BedSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        room_id = self.request.query_params.get('room_id')
        ward_id = self.request.query_params.get('ward_id')
        status_filter = self.request.query_params.get('status')
        
        queryset = self.queryset
        
        if room_id:
            queryset = queryset.filter(room_id=room_id)
        if ward_id:
            queryset = queryset.filter(room__ward_id=ward_id)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
            
        return queryset

from django.db.models import Q
from apps.patients.models import PatientProfile
from apps.patients.serializers import PatientProfileSerializer

class PatientAdmissionViewSet(viewsets.ModelViewSet):
    """
    🏥 Clinical Admission Orchestrator.
    Handles the entire lifecycle of IPD intake and physical resource allocation.
    """
    queryset = PatientAdmission.objects.all().select_related(
        'patient', 'patient__user', 'ward', 'bed', 'admitted_by', 'admitted_by__user'
    )
    serializer_class = PatientAdmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            from .serializers import PatientAdmissionCreateSerializer
            return PatientAdmissionCreateSerializer
        return PatientAdmissionSerializer

    @action(detail=False, methods=['get'], url_path='search_patients')
    def search_patients(self, request):
        """
        🔍 GET /api/wards/patients/search/
        Performance-tuned patient discovery shard.
        """
        query = request.query_params.get('q', '')
        if not query:
            return response.Response([])
            
        patients = PatientProfile.objects.filter(
            Q(user__first_name__icontains=query) | 
            Q(user__last_name__icontains=query) | 
            Q(mrn__icontains=query) | 
            Q(cnic__icontains=query)
        ).select_related('user')[:15]
        
        serializer = PatientProfileSerializer(patients, many=True)
        return response.Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='available_beds')
    def available_beds(self, request):
        """
        🛏️ GET /api/wards/beds/available/
        Real-time clinical inventory of vacant beds.
        """
        beds = Bed.objects.filter(
            status=Bed.BedStatus.AVAILABLE,
            is_active=True
        ).select_related('room__ward')
        
        serializer = BedSerializer(beds, many=True)
        return response.Response(serializer.data)
