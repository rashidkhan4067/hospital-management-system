from django.db import models
from django.utils import timezone

class AIConversation(models.Model):
    """
    🛰️ Neural Intelligence Thread Model (High-Fidelity Clinical State)
    Tracks all Sana AI interactions across the clinical grid with state persistence.
    """
    RESOLUTIONS = (
        ('Success', 'Resolved Node'),
        ('Critical-Review', 'High Priority'),
        ('Access-Denied', 'Authorization Denied'),
        ('Failure', 'System Failure'),
    )
    
    chat_id = models.CharField(max_length=50, unique=True)
    user_name = models.CharField(max_length=100)
    intent = models.CharField(max_length=200, null=True, blank=True)
    query = models.TextField()
    response = models.TextField(null=True, blank=True)
    resolution = models.CharField(max_length=50, choices=RESOLUTIONS, default='Success')
    
    # 🧠 Clinical Intelligence State (Stateful Dialogue Nodes)
    doctor_name = models.CharField(max_length=255, null=True, blank=True)
    appointment_date = models.DateField(null=True, blank=True)
    appointment_time = models.TimeField(null=True, blank=True)
    is_awaiting_confirmation = models.BooleanField(default=False)
    
    # 💾 Memory Shards
    history = models.JSONField(default=list, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    
    timestamp = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-timestamp']
        verbose_name = "AI Conversation Shard"

    def __str__(self):
        return f"{self.chat_id} - {self.user_name} ({self.intent})"

class AIConfig(models.Model):
    """
    ⚙️ AI Neural Config Shard
    Global parameters for AI model behavior and threshold nodes.
    """
    key = models.CharField(max_length=100, unique=True)
    value = models.JSONField()
    description = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "AI Neural Parameter"

    def __str__(self):
        return self.key

class AISystemLog(models.Model):
    """
    🛡️ AI Network propagation Log
    Audit trail for neural core events and operational pulse.
    """
    EVENT_TYPES = (
        ('MODEL_LOAD', 'Model Loading'),
        ('INFERENCE', 'Inference Propagation'),
        ('THRESHOLD_BREACH', 'Threshold Alert'),
        ('SECURITY_AUDIT', 'Security Lockdown'),
    )
    
    event = models.CharField(max_length=50, choices=EVENT_TYPES)
    status = models.CharField(max_length=20, default='STABLE')
    message = models.TextField()
    metadata = models.JSONField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.get_event_display()} - {self.status}"
