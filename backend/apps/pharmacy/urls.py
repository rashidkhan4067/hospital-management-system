from django.urls import path, include
from rest_framework import routers
from .views import MedicineViewSet

router = routers.DefaultRouter()
router.register('inventory', MedicineViewSet, basename='pharmacy-inventory')

app_name = 'pharmacy'

urlpatterns = [
    path('', include(router.urls)),
]
