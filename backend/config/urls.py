"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView, RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Auto-redirect to Frontend React App (Industrial-Scale Secure Bridge)
    path(
        'password-reset/confirm/<str:uidb64>/<str:token>/',
        RedirectView.as_view(url='http://localhost:5173/reset-password?uid=%(uidb64)s&token=%(token)s'),
        name='password_reset_confirm'
    ),
    
    # Generic Branded Email Confirmation Redirect
    path(
        'confirm-email/<str:key>/',
        RedirectView.as_view(url='http://localhost:5173/confirm-email?key=%(key)s'),
        name='account_confirm_email'
    ),
    
    # API endpoints
    path('api/v1/auth/', include('apps.accounts.urls', namespace='accounts')),
    path('api/v1/auth/', include('dj_rest_auth.urls')),
    path('api/v1/auth/registration/', include('dj_rest_auth.registration.urls')),

    # Allauth URLs (required for email verification links etc)
    path('accounts/', include('allauth.urls')),
    
    path('api/v1/doctors/', include('apps.doctors.urls', namespace='doctors')),
    path('api/v1/appointments/', include('apps.appointments.urls', namespace='appointments')),
    path('api/v1/voice/', include('apps.voice.urls', namespace='voice')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
