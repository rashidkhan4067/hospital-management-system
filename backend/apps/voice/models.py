from django.db import models
from apps.accounts.models import User

class VoiceSession(models.Model):
    """
    Stores the conversation state for a user during a voice interaction.
    Allows for multi-turn dialogue (e.g., remembering the doctor while asking for time).
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="voice_sessions")
    
    # State fields
    doctor_id = models.IntegerField(null=True, blank=True)
    doctor_name = models.CharField(max_length=255, null=True, blank=True)
    appointment_date = models.DateField(null=True, blank=True)
    appointment_time = models.TimeField(null=True, blank=True)
    time_preference = models.CharField(max_length=50, null=True, blank=True) # morning, afternoon, evening
    
    last_intent = models.CharField(max_length=100, null=True, blank=True)
    is_awaiting_confirmation = models.BooleanField(default=False)
    
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return f"Voice Session for {self.user.email} - Last intent: {self.last_intent}"
