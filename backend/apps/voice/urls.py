"""
apps/voice/urls.py
───────────────────
Routes for the voice booking integration.
"""
from django.urls import path
from .views import FullVoicePipelineView

app_name = "voice"

urlpatterns = [
    path("pipeline/", FullVoicePipelineView.as_view(), name="voice-pipeline"),
]
