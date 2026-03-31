"""
apps/accounts/views.py
───────────────────────
Views for authentication and user management.
"""
from django.contrib.auth import get_user_model
from rest_framework import generics, views, status
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
from .firebase_services import verify_firebase_token

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Customize the JWT response to include basic user details
    along with the access and refresh tokens.
    """
    def validate(self, attrs):
        data = super().validate(attrs)
        # Add user info to response body
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


class RegisterView(generics.CreateAPIView):
    """
    POST /api/v1/auth/register/
    Registers a new user (Patient or Doctor).
    """
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer


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


class FirebaseLoginView(views.APIView):
    """
    POST /api/v1/auth/firebase/
    Verifies a Firebase ID token (Google, Phone, or Email) and creates/logs in 
    a Django user, returning local JWTs.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get("token")
        if not token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        decoded_user, error_msg = verify_firebase_token(token)
        if not decoded_user:
            return Response({
                "error": "Invalid Firebase token",
                "detail": error_msg or "Unknown verification error"
            }, status=status.HTTP_401_UNAUTHORIZED)

        # Get or Create user based on Firebase email or phone
        email = decoded_user.get("email")
        phone = decoded_user.get("phone_number")
        uid = decoded_user.get("uid")

        if not email and not phone:
            return Response({"error": "Firebase user lacks email or phone"}, status=status.HTTP_400_BAD_REQUEST)

        user, created = User.objects.get_or_create(
            email=email or f"{uid}@firebase.com",
            defaults={
                "username": uid,
                "first_name": decoded_user.get("name", "").split(" ")[0],
                "last_name": " ".join(decoded_user.get("name", "").split(" ")[1:]),
                "role": User.Role.PATIENT,  # Default role for social logins
                "is_active": True
            }
        )

        # Generate local JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role,
            }
        })


