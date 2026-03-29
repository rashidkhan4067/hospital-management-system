"""
apps/accounts/permissions.py
──────────────────────────────
Role-based access control (RBAC) permissions for the API.
"""
from rest_framework.permissions import BasePermission


class IsAdminUser(BasePermission):
    """Allows access only to users with the 'admin' role."""
    
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_admin)


class IsDoctorUser(BasePermission):
    """Allows access only to users with the 'doctor' role."""
    
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_doctor)


class IsPatientUser(BasePermission):
    """Allows access only to users with the 'patient' role."""
    
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_patient)
