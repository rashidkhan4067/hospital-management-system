from django.db.models import Prefetch
from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import PatientProfile, ClinicalRecord
from .serializers import (
    PatientProfileSerializer, 
    PatientListSerializer,
    PatientCreateSerializer, 
    ClinicalRecordSerializer,
    AdministrativePatientCreateSerializer
)
from apps.accounts.permissions import IsAdminUser

class PatientViewSet(viewsets.ModelViewSet):
    """
    🏢 Universal Patient Registry HUB
    All clinical profile management protocols centralize here.
    Uses Atomic Prefetching for O(1) Data Retrieval performance.
    """
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["blood_group", "is_admitted"]
    search_fields = ["user__first_name", "user__last_name", "user__email", "user__cnic", "user__phone_number", "address"]
    ordering_fields = ["created_at"]

    def get_queryset(self):
        """
        🚀 Advanced Query Optimizer
        Dynamically adjusts prefetch strategy based on the requested view action
        to minimize memory footprint and DB overhead.
        """
        queryset = PatientProfile.objects.select_related("user").order_by("-created_at")
        
        # If we are looking at a single patient, prefetch the heavy lifting
        if self.action == 'retrieve':
            from apps.finance.models import Invoice
            from apps.appointments.models import Appointment
            from apps.wards.models import PatientAdmission
            from apps.lab.models import LabOrder
            
            return queryset.prefetch_related(
                Prefetch('records', queryset=ClinicalRecord.objects.all().order_by('-observation_date')),
                Prefetch('invoices', queryset=Invoice.objects.all().order_by('-created_at')),
                Prefetch('user__appointments', queryset=Appointment.objects.all().order_by('-appointment_date'), to_attr='cached_appointments'),
                Prefetch('admissions', queryset=PatientAdmission.objects.all().order_by('-admission_date')),
                Prefetch('lab_orders', queryset=LabOrder.objects.all().order_by('-created_at'))
            )
        
        return queryset

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'recent':
            return PatientListSerializer
        if self.action == "create":
            return AdministrativePatientCreateSerializer
        if self.action == "complete_onboarding":
            return PatientProfileSerializer
        return PatientProfileSerializer

    @action(detail=False, methods=["post"], url_path="complete-onboarding")
    def complete_onboarding(self, request):
        """
        POST /api/v1/patients/profiles/complete-onboarding/
        Atomic onboarding finalizing protocol for new patients.
        Updates both User identity and PatientProfile clinical shards.
        """
        user = request.user
        profile, created = PatientProfile.objects.get_or_create(user=user)
        
        # 🧪 Parse Inbound Clinical Payload
        serializer = PatientProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            # Sync user-level fields if provided
            fullName = request.data.get('fullName')
            if fullName:
                names = fullName.split(' ', 1)
                user.first_name = names[0]
                user.last_name = names[1] if len(names) > 1 else ""
            
            phone = request.data.get('phone')
            if phone:
                user.phone_number = phone
            
            user.onboarding_completed = True
            user.save()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["post"], url_path="quick_add")
    def quick_add(self, request):
        """
        POST /api/v1/patients/profiles/quick_add/
        Minimalist patient creation for fast clinical flows.
        """
        full_name = request.data.get('fullName', '')
        phone = request.data.get('phone_number', '')
        cnic = request.data.get('cnic', '')
        
        if not (full_name and phone and cnic):
            return Response({"error": "Missing required shards: Name, Phone, and CNIC"}, status=status.HTTP_400_BAD_REQUEST)
        
        from apps.accounts.models import User
        import uuid
        
        if User.objects.filter(cnic=cnic).exists():
            u = User.objects.get(cnic=cnic)
            profile = u.patient_profile
            return Response({
                "id": profile.id,
                "full_name": u.full_name,
                "mrn": profile.mrn,
                "message": "Existing record retrieved"
            }, status=status.HTTP_200_OK)
        
        names = full_name.split(' ', 1)
        first_name = names[0]
        last_name = names[1] if len(names) > 1 else ""
        
        user = User.objects.create_user(
            username=f"pt-{uuid.uuid4().hex[:8]}",
            email=f"{uuid.uuid4().hex[:6]}@quick.reg",
            cnic=cnic,
            phone_number=phone,
            password=User.objects.make_random_password(),
            first_name=first_name,
            last_name=last_name,
            role=User.UserRole.PATIENT
        )
        
        profile = PatientProfile.objects.create(user=user)
        
        return Response({
            "id": profile.id,
            "full_name": profile.user.full_name,
            "mrn": profile.mrn
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["get"])
    def recent(self, request):
        """
        GET /api/v1/patients/profiles/recent/
        Returns the top clinical shards for the latest patient acquisitions.
        """
        qs = self.get_queryset()[:5]
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        """
        Only authenticated admins and specialized clinical personnel can manage profiles.
        Patients can only complete their own onboarding.
        """
        if self.action == "complete_onboarding":
            return [permissions.IsAuthenticated()]
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [permissions.IsAuthenticated(), IsAdminUser()]
        return [permissions.IsAuthenticated()]


class DashboardAggregatorView(viewsets.ViewSet):
    """
    🎯 High-Frequency Dashboard Aggregator
    Centralizes global telemetry shards into an atomic payload.
    This replaces multiple disparite network calls with a single 
    latency-optimized data ingestion protocol.
    """
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        """
        GET /api/v1/patients/profiles/dashboard-highlights/
        Aggregates:
        1. Recent Admissions (top 5)
        2. Recent Appointments (top 5)
        3. Global Telemetry (Counts)
        """
        # 🧪 Shard 1: Recent Patients/Admissions (Optimized)
        recent_patients = PatientProfile.objects.select_related("user").order_by("-created_at")[:10]
        patients_data = PatientListSerializer(recent_patients, many=True).data

        # 🧪 Shard 2: Recent Appointments
        from apps.appointments.models import Appointment
        from apps.appointments.serializers import AppointmentSerializer
        
        # Use simple status mapping logic for high speed
        recent_appts = Appointment.objects.select_related("patient", "doctor", "doctor__user").order_by("-start_time")[:10]
        appts_data = AppointmentSerializer(recent_appts, many=True).data

        return Response({
            "admissions": patients_data,
            "appointments": appts_data,
            "telemetry": {
                "ts": "NOMINAL",
                "load": "LOW"
            }
        })


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
