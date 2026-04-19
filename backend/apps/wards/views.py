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
        📊 SYSTEM TELEMETRY: Ward & Bed Hub
        Provides high-performance aggregation for the administrative dashboard.
        """
        total_beds = Bed.objects.count()
        occupied = Bed.objects.filter(status='occupied').count()
        available = Bed.objects.filter(status='available').count()
        maintenance = Bed.objects.filter(status='maintenance').count()
        icu_total = Bed.objects.filter(bed_type='icu').count()
        icu_occupied = Bed.objects.filter(bed_type='icu', status='occupied').count()

        # Shard: Occupancy by Type
        by_type = Bed.objects.values('bed_type').annotate(
            total=Count('id'),
            occupied=Count('id', filter=Q(status='occupied'))
        )

        occupancy_rate = (occupied / total_beds * 100) if total_beds > 0 else 0

        # Shard: Recently Admitted Patients
        recent_admissions = Bed.objects.filter(status='occupied').select_related('patient', 'room__ward', 'patient__user')[:10]
        admissions_data = [{
            "id": b.id,
            "patient_name": b.patient.user.get_full_name() if b.patient else "Anonymous Patient",
            "patient_id": b.patient.id if b.patient else None,
            "ward_name": b.room.ward.name if b.room and b.room.ward else "Unassigned",
            "bed_number": b.bed_number,
            "bed_type": b.bed_type,
            "days": 3 
        } for b in recent_admissions]

        # Detailed Ward Nodes (Traversing Rooms)
        wards = Ward.objects.all()
        ward_matrix = []
        for w in wards:
            ward_beds = Bed.objects.filter(room__ward=w)
            ward_matrix.append({
                "id": w.id,
                "name": w.name,
                "code": w.code,
                "floor": w.floor,
                "total": ward_beds.count(),
                "occupied": ward_beds.filter(status='occupied').count(),
                "available": ward_beds.filter(status='available').count(),
                "maintenance": ward_beds.filter(status='maintenance').count(),
                "reserved": ward_beds.filter(status='reserved').count(),
                "beds": [{ "id": b.id, "number": b.bed_number, "status": b.status, "type": b.bed_type } for b in ward_beds]
            })

        return response.Response({
            "overview": {
                "total_beds": total_beds,
                "occupied": occupied,
                "available": available,
                "maintenance": maintenance,
                "icu_stats": f"{icu_occupied}/{icu_total}",
                "occupancy_rate": f"{occupancy_rate:.1f}%"
            },
            "by_type": list(by_type),
            "ward_matrix": ward_matrix,
            "admissions": admissions_data
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
