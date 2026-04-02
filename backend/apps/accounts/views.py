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

from .serializers import (
    UserRegisterSerializer,
    UserSerializer,
    ChangePasswordSerializer,
)
from .email_services import send_welcome_email, send_login_alert_email

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Customize the JWT response to provide industry-standard, distinct error messages
    for identity verification (User not found vs Incorrect Password).
    """
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        # 🛡️ Step 1: Pre-check User existence (Enhanced UX/DX)
        user = User.objects.filter(email=email).first()
        if not user:
            raise serializers.ValidationError({
                "detail": f"Account verification failed: User with identity '{email}' does not exist in our systems."
            })
        
        # 🛡️ Step 2: Proceed with Standard Auth
        try:
            # Re-map 'email' to 'username' for the base serializer which expects 'username' key
            # unless configured otherwise, but we'll use the user instance if possible.
            attrs['username'] = email 
            data = super().validate(attrs)
        except Exception as e:
            # If we are here, the user exists but the password/credentials are wrong
            raise serializers.ValidationError({
                "detail": "Identity authentication failed: The security key (password) provided is incorrect."
            })
        
        # 🛡️ Step 3: Check Email Verification Status
        from allauth.account.models import EmailAddress
        from django.conf import settings
        
        if getattr(settings, 'ACCOUNT_EMAIL_VERIFICATION', 'none') == 'mandatory':
            user_verified = EmailAddress.objects.filter(user=self.user, verified=True).exists()
            if not user_verified:
                raise serializers.ValidationError({
                    "detail": "Clinical access blocked: Primary email verification is mandatory. Please verify your identity via the link sent to your inbox."
                })
        
        # 🏆 Success: Extend response with Premium User Profile context
        data.update({
            "user": {
                "id": self.user.id,
                "email": self.user.email,
                "full_name": self.user.full_name,
                "role": self.user.role,
            }
        })
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    POST /api/v1/auth/login/
    Returns JWT tokens and user data.
    """
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            # Successfully logged in — send industry-standard security alert
            # We fetch user via email since they just authenticated
            user = User.objects.get(email=request.data.get('email'))
            send_login_alert_email(user, request)
        return response


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
        
        # 1. Add user to allauth EmailAddress list (required for verification links)
        from allauth.account.models import EmailAddress
        from allauth.account.utils import send_email_confirmation
        
        EmailAddress.objects.create(
            user=user, 
            email=user.email, 
            primary=True, 
            verified=False
        )
        
        # 2. Trigger the allauth confirmation email (More secure)
        send_email_confirmation(self.request, user, signup=True)
        
        # 3. Also send our custom welcome email (optional)
        send_welcome_email(user)


class UserProfileView(generics.RetrieveAPIView):
    """
    GET /api/v1/auth/me/
    Returns the currently authenticated user's profile.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


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




