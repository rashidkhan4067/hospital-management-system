from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AIConversationViewSet, 
    AIConfigViewSet, 
    AISystemLogViewSet, 
    AIQueryHubView, 
    AIVocalHubView
)

router = DefaultRouter()
router.register(r'chats', AIConversationViewSet, basename='ai-chats')
router.register(r'config', AIConfigViewSet, basename='ai-config')
router.register(r'logs', AISystemLogViewSet, basename='ai-logs')

urlpatterns = [
    path('', include(router.urls)),
    path('query/', AIQueryHubView.as_view(), name='ai-query-hub'),
    path('vocal-query/', AIVocalHubView.as_view(), name='ai-vocal-hub'),
]
