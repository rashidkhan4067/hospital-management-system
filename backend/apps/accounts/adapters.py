from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    """
    🛡️ HMS Social Security Adapter
    Enforces strict role-based access for federated identity streams.
    """
    
    def pre_social_login(self, request, sociallogin):
        """
        Invoked just after a user successfully authenticates via Google,
        but before the login is processed.
        """
        # If the user exists, check their role
        email = sociallogin.account.extra_data.get('email')
        if not email:
            return
            
        try:
            existing_user = User.objects.get(email=email)
            
            # 💉 Enforce Rule: Admins and Doctors are blocked from Google Login
            if existing_user.role in [User.Role.ADMIN, User.Role.DOCTOR]:
                raise serializers.ValidationError("Please use correct login method")
            
            # 💉 Enforce Rule: If a local patient tries to login via Google, ensure we handle it
            # (allauth's SOCIALACCOUNT_EMAIL_AUTHENTICATION_AUTO_CONNECT usually handles this if same email)
        except User.DoesNotExist:
            # This is a new user signup via Google - they will be routed to save_user
            pass

    def save_user(self, request, sociallogin, form=None):
        """
        Invoked when a new user is created via social login.
        Ensures all Google signups are provisioned as Patients.
        """
        user = super().save_user(request, sociallogin, form)
        
        # 🧪 Auto-Provision as Patient
        user.role = User.Role.PATIENT
        user.auth_provider = User.AuthProvider.GOOGLE
        
        # Ensure name is captured from Google extra data if available
        extra_data = sociallogin.account.extra_data
        if not user.first_name:
            user.first_name = extra_data.get('given_name', '')
        if not user.last_name:
            user.last_name = extra_data.get('family_name', '')
            
        user.save()
        return user
