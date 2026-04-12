import logging
from django.contrib.auth import get_user_model
from django.conf import settings
from django.core.signing import TimestampSigner, BadSignature, SignatureExpired

from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

# Third-party (dj-rest-auth + allauth)
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter

# Local
from .email_services import send_magic_link_email

User = get_user_model()

# ─────────────────────────────────────────────────────────────────────────────
# 1. GOOGLE LOGIN VIEW
# ─────────────────────────────────────────────────────────────────────────────

class GoogleLogin(SocialLoginView):
    """
    POST /api/v1/auth/google/
    Exchanges a Google access_token for a locally issued JWT.
    """
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:5173/login"
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code != 200:
            print(f"[DEBUG] Google Auth Failed: {response.data}")
        return response


# ─────────────────────────────────────────────────────────────────────────────
# 2. MAGIC LINK LOGIN (Passwordless) Implementation
# ─────────────────────────────────────────────────────────────────────────────

class SendMagicLinkView(views.APIView):
    """
    POST /api/v1/auth/magic-link/send/
    Sends a signed login link to the user's email.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Check if user exists — for security, you could just say "If account exists, email sent"
            user = User.objects.get(email=email)
            
            # Generate signed token
            signer = TimestampSigner()
            token = signer.sign(email)
            
            # Build magic link
            frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:5173')
            magic_link = f"{frontend_url}/login?token={token}"
            
            # Send email via centralized service
            if send_magic_link_email(email, magic_link):
                return Response({"detail": "Magic link sent successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Failed to send email. Check server configuration."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except User.DoesNotExist:
            return Response({"error": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)


class VerifyMagicLinkView(views.APIView):
    """
    POST /api/v1/auth/magic-link/verify/
    Verifies the signed token and issues JWT tokens upon success.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get('token')
        if not token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        signer = TimestampSigner()
        try:
            # Token expires in 15 minutes (900 seconds)
            email = signer.unsign(token, max_age=900)
            user = User.objects.get(email=email)
            
            # Issue local JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "full_name": user.full_name,
                    "role": user.role,
                    "onboarding_completed": user.onboarding_completed,
                }
            })
        except SignatureExpired:
            return Response({"error": "Magic link has expired. Please request a new one."}, status=status.HTTP_401_UNAUTHORIZED)
        except (BadSignature, User.DoesNotExist):
            return Response({"error": "Invalid magic link"}, status=status.HTTP_401_UNAUTHORIZED)
