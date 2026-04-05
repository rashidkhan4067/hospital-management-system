from django.urls import path, include
from rest_framework import routers
from .views import WardViewSet, BedViewSet

app_name = 'wards'

router = routers.DefaultRouter()
router.register(r'wards', WardViewSet)
router.register(r'beds', BedViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
