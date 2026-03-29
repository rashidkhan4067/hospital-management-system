"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/v1/auth/', include('apps.accounts.urls', namespace='accounts')),
    path('api/v1/doctors/', include('apps.doctors.urls', namespace='doctors')),
    path('api/v1/appointments/', include('apps.appointments.urls', namespace='appointments')),
    path('api/v1/voice/', include('apps.voice.urls', namespace='voice')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
