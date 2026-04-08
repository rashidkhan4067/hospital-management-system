from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import PatientProfile, ClinicalRecord
from .serializers import PatientProfileSerializer, PatientCreateSerializer, ClinicalRecordSerializer
from apps.accounts.permissions import IsAdminUser

class PatientViewSet(viewsets.ModelViewSet):
    """
    🏢 Universal Patient Registry HUB
    All clinical profile management protocols centralize here.
    """
    queryset = PatientProfile.objects.select_related("user").prefetch_related("records").all().order_by("-created_at")
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    filterset_fields = ["blood_group", "is_admitted"]
    search_fields = ["user__first_name", "user__last_name", "user__email", "address"]
    ordering_fields = ["created_at"]

    def get_serializer_class(self):
        if self.action == "create":
            return PatientCreateSerializer
        return PatientProfileSerializer

    @action(detail=False, methods=["get"])
    def recent(self, request):
        """
        GET /api/v1/patients/profiles/recent/
        Returns the top clinical shards for the latest patient acquisitions.
        """
        qs = self.get_queryset()[:5]
        serializer = PatientProfileSerializer(qs, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        """
        Only authenticated admins and specialized clinical personnel can manage profiles.
        """
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [permissions.IsAuthenticated(), IsAdminUser()]
        return [permissions.IsAuthenticated()]


class ClinicalRecordViewSet(viewsets.ModelViewSet):
    """
    📑 Clinical Memory Matrix
    Tracks diagnostic shards and historical observations.
    """
    queryset = ClinicalRecord.objects.all()
    serializer_class = ClinicalRecordSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["patient", "doctor"]
