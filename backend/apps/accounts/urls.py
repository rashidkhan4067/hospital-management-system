"""
apps/accounts/urls.py
──────────────────────
Routes for the accounts application.
"""
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    UserProfileView,
    ChangePasswordView,
    LogoutView,
    UserManagementViewSet,
    VerifyOTPView,
    VerifyEmailAPIView
)

from .auth_views import (
    GoogleLogin,
    SendMagicLinkView,
    VerifyMagicLinkView,
)

router = routers.DefaultRouter()
router.register('users', UserManagementViewSet, basename='users')

app_name = "accounts"

urlpatterns = [
    path("", include(router.urls)),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", UserProfileView.as_view(), name="profile"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("google/", GoogleLogin.as_view(), name="google-login"),
    path("magic-link/send/", SendMagicLinkView.as_view(), name="magic-link-send"),
    path("magic-link/verify/", VerifyMagicLinkView.as_view(), name="magic-link-verify"),
    path("verify-otp/", VerifyOTPView.as_view(), name="verify-otp"),
    path("verify-email/", VerifyEmailAPIView.as_view(), name="verify-email"),
]
