"""
apps/voice/urls.py
───────────────────
Routes for the voice booking integration.
"""
from django.urls import path
from .views import VoiceBookingView, FullVoicePipelineView

app_name = "voice"

urlpatterns = [
    path("book/", VoiceBookingView.as_view(), name="voice-book"),
    path("pipeline/", FullVoicePipelineView.as_view(), name="voice-pipeline"),
]
