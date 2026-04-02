from rest_framework import serializers
from .models import AIConversation, AIConfig, AISystemLog

class AIConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIConversation
        fields = '__all__'

class AIConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIConfig
        fields = '__all__'

class AISystemLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AISystemLog
        fields = '__all__'
