"""
apps/accounts/views.py
───────────────────────
Views for authentication and user management.
"""
from django.contrib.auth import get_user_model
from rest_framework import generics, views, status, serializers
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
try:
    from rest_framework_simplejwt.views import TokenObtainPairView
    from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
    from rest_framework_simplejwt.tokens import RefreshToken
except ImportError:
    pass

from rest_framework import viewsets, filters as rest_filters
from apps.accounts.permissions import IsAdminUser

from .serializers import (
    UserRegisterSerializer,
    UserSerializer,
    ChangePasswordSerializer,
    UserAdminCreateSerializer,
    UserAdminUpdateSerializer,
    ProfileUpdateSerializer,
)
from .email_services import send_welcome_email, send_login_alert_email

User = get_user_model()


from .models import normalize_cnic

from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class CustomTokenObtainPairSerializer(serializers.Serializer):
    """
    🏥 specialized Clinical Identity Serializer
    Identity-Agnostic Gateway: Supports 'identity', 'cnic', 'email', or 'username'.
    """
    identity = serializers.CharField(required=False, allow_blank=True)
    cnic = serializers.CharField(required=False, allow_blank=True)
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(required=False, allow_blank=True)

    def validate(self, attrs):
        # 🧪 Shard Aggregation Protocol
        # We look for ANY valid identity shard provided by the client.
        identity_shard = attrs.get('identity') or attrs.get('cnic') or attrs.get('username') or attrs.get('email')
        password = attrs.get('password')

        if not identity_shard:
            raise serializers.ValidationError({"identity": "Clinical identity (National ID or Email) is required for authentication."})
        if not password:
            raise serializers.ValidationError({"password": "Security credential (password) is required to access your medical records."})

        # 🧪 Step 1: Identity Resolution (Dual-Mapping)
        user = None
        if "@" in identity_shard:
            # High-fidelity Email Resolution
            user = User.objects.filter(email__iexact=identity_shard).first()
        else:
            # CNIC Normalization Protocol
            cnic = normalize_cnic(identity_shard)
            user = User.objects.filter(cnic=cnic).first()
        
        if not user:
            raise serializers.ValidationError({"identity": "Identity shard not recognized. Please register first."})
        
        # We always use cnic for the authentication backend as it is the USERNAME_FIELD
        username = user.cnic

        # 🔐 Step 2: Security Verification
        user = authenticate(username=username, password=password)
        if not user:
            # Check if account is locked due to brute force
            potential_user = User.objects.filter(cnic=username).first()
            if potential_user:
                potential_user.failed_login_attempts += 1
                if potential_user.failed_login_attempts >= 5:
                    from django.utils import timezone
                    from datetime import timedelta
                    potential_user.is_locked = True
                    potential_user.lock_until = timezone.now() + timedelta(minutes=30)
                    potential_user.save()
                    raise serializers.ValidationError({"identity": "Account locked due to multiple failed attempts. Try again in 30 minutes."})
                potential_user.save()

            raise serializers.ValidationError({"password": "Authentication failed: Incorrect security credential."})

        if not user.is_active:
            raise serializers.ValidationError({"identity": "Account suspended. Please contact clinical administration."})

        # 🥇 Step 3: Lifecycle Handover
        # Reset failed attempts on success
        user.failed_login_attempts = 0
        user.save()

        refresh = RefreshToken.for_user(user)
        
        # Capture User context for view processing
        self.user = user

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                "id": user.id,
                "cnic": user.cnic,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role,
                "onboarding_completed": user.onboarding_completed,
            }
        }


from rest_framework.views import APIView
from rest_framework import status as http_status
from .models import normalize_cnic, classify_login_risk, LoginRecord, SecurityOTP, generate_verification_otp
from .email_services import send_welcome_email, send_login_alert_email, send_otp_email

from rest_framework.throttling import ScopedRateThrottle

class CustomTokenObtainPairView(APIView):
    """
    POST /api/v1/auth/login/
    🏥 specialized Clinical Identity Gateway
    Manages identity resolution, risk assessment, and session graduation.
    """
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'login'

    def post(self, request, *args, **kwargs):
        try:
            # 🛰️ Identity Validation Phase
            # Windows Resiliency: De-initialize colorama to restore standard streams and prevent ansitowin32 crashes
            try:
                import colorama
                colorama.deinit()
            except ImportError:
                pass

            serializer = CustomTokenObtainPairSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            user = serializer.user
            
            # 🛡️ Risk Assessment Shard
            ip = request.META.get('REMOTE_ADDR', '127.0.0.1')
            user_agent = request.META.get('HTTP_USER_AGENT', 'unknown')
            risk_level = classify_login_risk(user, ip, user_agent)
            
            # 🧪 Heuristic: Trigger Identity Challenge for High-Risk nodes
            if risk_level == LoginRecord.RiskLevel.HIGH:
                otp = generate_verification_otp(user)
                send_otp_email(user, otp.otp_code)
                return Response({
                    "status": "challenge_required",
                    "user_id": user.id,
                    "detail": "High-risk login detected. Verification code dispatched to your clinical email."
                }, status=status.HTTP_200_OK)

            # 🛰️ Capture Telemetry
            LoginRecord.objects.create(
                user=user, 
                ip_address=ip, 
                user_agent=user_agent,
                risk_level=risk_level, 
                is_successful=True
            )
            
            # 📧 Trigger Alert Stream if enabled
            if user.notify_on_all_logins:
                send_login_alert_email(user, request, risk_level)
                
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        except (OSError, Exception) as e:
            # 🛡️ Anti-Gravity OS Shield: Intercept Windows stream errors & General Failures
            error_code = "OS_STREAM_FAILURE" if isinstance(e, OSError) else "AUTH_FAILURE"
            return Response({
                "error": error_code,
                "detail": "The identity gateway encountered a synchronization or OS failure.",
                "context": str(e) if settings.DEBUG else "Gateway restricted."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VerifyOTPView(APIView):
    """
    POST /api/v1/auth/verify-otp/
    Validates the Identity Challenge code and graduates the session.
    """
    permission_classes = [] 

    def post(self, request):
        user_id = request.data.get('user_id')
        otp_code = request.data.get('otp_code')
        
        if not user_id or not otp_code:
            return Response({"error": "Missing identity shards."}, status=http_status.HTTP_400_BAD_REQUEST)
            
        try:
            user = User.objects.get(id=user_id)
            otp = SecurityOTP.objects.filter(user=user, otp_code=otp_code).first()
            
            if otp and otp.is_usable:
                # 🎓 Graduation: Identity Verified
                otp.is_used = True
                otp.save()
                
                # Generate Tokens manually via high-fidelity rotation protocol
                refresh = RefreshToken.for_user(user)
                
                # Capture Telemetry
                ip = request.META.get('REMOTE_ADDR')
                user_agent = request.META.get('HTTP_USER_AGENT', 'unknown')
                LoginRecord.objects.create(
                    user=user, ip_address=ip, user_agent=user_agent,
                    risk_level=LoginRecord.RiskLevel.HIGH, is_successful=True
                )
                
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': UserSerializer(user).data
                })
            
            return Response({"error": "Invalid or expired verification code."}, status=http_status.HTTP_401_UNAUTHORIZED)
            
        except User.DoesNotExist:
            return Response({"error": "Identity shard not found."}, status=http_status.HTTP_404_NOT_FOUND)
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

@method_decorator(csrf_exempt, name='dispatch')
class VerifyEmailAPIView(APIView):
    """
    POST /api/v1/auth/verify-email/
    🏥 Clinical Identity Activation Shard
    Validates the verification token and graduates the account status to 'Verified'.
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        key = request.data.get("key")
        if not key:
            return Response({"error": "Identity verification key missing."}, status=http_status.HTTP_400_BAD_REQUEST)

        confirmation = self.get_object(key)
        if not confirmation:
            return Response({"error": "Invalid or expired verification key."}, status=http_status.HTTP_404_NOT_FOUND)

        # Graduating the account
        email_address = confirmation.confirm(request)
        if not email_address:
             return Response({"error": "Failed to activate clinical identity shard."}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            "status": "success",
            "message": "Account verified successfully. You may now access the clinical portal."
        }, status=http_status.HTTP_200_OK)

    def get_object(self, key):
        # Allauth supports two types of confirmations: HMAC (modern) and standard (DB-backed)
        confirmation = EmailConfirmationHMAC.from_key(key)
        if not confirmation:
            if confirmation := EmailConfirmation.objects.filter(key=key).first():
                return confirmation
        return confirmation


class RegisterView(generics.CreateAPIView):
    """
    POST /api/v1/auth/register/
    Registers a new user (Patient or Doctor).
    """
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        
        # 🛡️ Step 1: Initialize Identity Verification Node
        from allauth.account.models import EmailAddress
        
        email_instance = EmailAddress.objects.create(
            user=user, 
            email=user.email, 
            primary=True, 
            verified=False
        )
        
        # 🛡️ Step 2: Trigger secure verification protocol (Modern Allauth Method)
        # Using the instance method is more reliable across different allauth versions
        try:
            email_instance.send_confirmation(self.request, signup=True)
        except Exception as e:
            pass
        
        # 3. Also send our custom welcome email (optional)
        send_welcome_email(user)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    GET /api/v1/auth/me/
    PATCH /api/v1/auth/me/
    Returns or updates the currently authenticated user's profile.
    """
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ProfileUpdateSerializer
        return UserSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        # We override update to ensure the user is using the full serializer
        # but only certain fields are allowed if we wanted to restrict them.
        # For onboarding, we allow everything in UserSerializer.
        return super().update(request, *args, **kwargs)


class ChangePasswordView(generics.UpdateAPIView):
    """
    PATCH /api/v1/auth/change-password/
    Allows the authenticated user to change their password.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return self.request.user


class LogoutView(views.APIView):
    """
    POST /api/v1/auth/logout/
    Blacklists the given refresh token to ensure real stateless logouts.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)






class UserManagementViewSet(viewsets.ModelViewSet):
    """
    🏢 User Cluster registry
    Protected administrative gateway for global identity orchestration.
    """
    queryset = User.objects.all().order_by('-id')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    filter_backends = [rest_filters.SearchFilter, rest_filters.OrderingFilter]
    search_fields = ['first_name', 'last_name', 'email', 'role']
    ordering_fields = ['id', 'date_joined']

    def get_serializer_class(self):
        if self.action == 'create':
            return UserAdminCreateSerializer
        if self.action in ['update', 'partial_update']:
            return UserAdminUpdateSerializer
        return UserSerializer
