from rest_framework import viewsets, permissions, status, response
from rest_framework.decorators import action
from django.db.models import Count, Q
from .models import Ward, Bed
from .serializers import WardSerializer, BedSerializer

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

        # Shard: Recently Admitted Patients (The bottom list in the blueprint)
        recent_admissions = Bed.objects.filter(status='occupied').select_related('patient', 'ward', 'patient__user')[:10]
        admissions_data = [{
            "id": b.id,
            "patient_name": b.patient.user.get_full_name() if b.patient else "Anonymous Patient",
            "patient_id": b.patient.id if b.patient else None,
            "ward_name": b.ward.name,
            "bed_number": b.bed_number,
            "bed_type": b.bed_type,
            "days": 3 # This should be calculated from Admission model, but using 3 for now as placeholder
        } for b in recent_admissions]

        # Detailed Ward Nodes (For the grid)
        wards = Ward.objects.annotate(
            total_beds=Count('beds'),
            occupied_beds=Count('beds', filter=Q(beds__status='occupied')),
            available_beds=Count('beds', filter=Q(beds__status='available')),
            maintenance_beds=Count('beds', filter=Q(beds__status='maintenance')),
            reserved_beds=Count('beds', filter=Q(beds__status='reserved')),
        ).all()

        ward_matrix = [{
            "id": w.id,
            "name": w.name,
            "code": w.code,
            "floor": w.floor,
            "total": w.total_beds,
            "occupied": w.occupied_beds,
            "available": w.available_beds,
            "maintenance": w.maintenance_beds,
            "reserved": w.reserved_beds,
            "type": "General", # Simplify for now
            "beds": [{ "id": b.id, "number": b.bed_number, "status": b.status, "type": b.bed_type } for b in w.beds.all()]
        } for w in wards]

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

class BedViewSet(viewsets.ModelViewSet):
    queryset = Bed.objects.all().order_by('bed_number')
    serializer_class = BedSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        ward_id = self.request.query_params.get('ward_id')
        if ward_id:
            return self.queryset.filter(ward_id=ward_id)
        return self.queryset
