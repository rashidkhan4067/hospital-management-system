import uuid
import os
import random
import string
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.files.storage import FileSystemStorage
from django.conf import settings

from .models import AIConversation, AIConfig, AISystemLog
from .serializers import AIConversationSerializer, AIConfigSerializer, AISystemLogSerializer
from .services.clinical_expert import ClinicalExpertService
from .services.pipeline_service import transcribe_audio_groq, synthesize_speech

from apps.doctors.models import Doctor
from apps.appointments.serializers import AppointmentCreateSerializer

# 🛰️ Initialize Services
clinical_expert = ClinicalExpertService()

class _FakeRequest:
    def __init__(self, user): self.user = user

class AIQueryHubView(APIView):
    """
    🧠 AI Neural Query Core (Bimodal)
    Primary entry point for text and vocal clinical propagation.
    """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        user_query = request.data.get('query')
        chat_id = request.data.get('chat_id')
        
        if not user_query:
            return Response({"error": "Query required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not chat_id:
            chat_id = f"CH_{uuid.uuid4().hex[:12].upper()}"
            
        return self._process_shard(request, chat_id, user_query)

    def _process_shard(self, request, chat_id, query):
        # 🛡️ IDENTITY RESOLUTION (Handles Null Username Shards)
        user = request.user
        if user.is_authenticated:
            username = user.email or user.username or f"AUTH_NODE_{user.id}"
        else:
            username = f"GUEST_{chat_id[-6:]}"
            
        AISystemLog.objects.create(
            event='INFERENCE',
            status='STABLE',
            message=f"Neural propagation path: {username} -> {chat_id}",
            metadata={"query": query, "chat_id": chat_id}
        )
        
        try:
            result = clinical_expert.process_query(query, chat_id=chat_id)
            
            thread, created = AIConversation.objects.get_or_create(
                chat_id=chat_id,
                defaults={'user_name': username, 'query': query}
            )
            
            entities = result.get('entities', {}) or {}
            if entities.get('doctor_name'): thread.doctor_name = entities['doctor_name']
            if entities.get('date'):        thread.appointment_date = entities['date']
            if entities.get('time'):        thread.appointment_time = entities['time']
            
            thread.intent = result.get('intent', 'General Intelligence')
            thread.response = result.get('reply', 'Neural core failure to generate reply shard.')
            
            history = list(thread.history)
            history.append({"role": "user", "content": query})
            history.append({"role": "assistant", "content": thread.response})
            thread.history = history[-10:]
            
            action_type = result.get('action')
            if action_type == "book_now" or (thread.is_awaiting_confirmation and thread.intent in ["confirm_appointment", "confirm_booking"]):
                self._handle_booking(thread, request.user)

            thread.is_awaiting_confirmation = (action_type == "confirm_booking")
            thread.save()
            
            return Response({
                "chat_id": chat_id,
                "response": thread.response,
                "intent": thread.intent,
                "entities": entities,
                "status": "STABLE"
            })
            
        except Exception as e:
            import traceback
            AISystemLog.objects.create(
                event='THRESHOLD_BREACH',
                status='CRITICAL',
                message=f"Neural inference breach: {str(e)}",
                metadata={"error": str(e), "trace": traceback.format_exc(), "chat_id": chat_id}
            )
            return Response({
                "error": "The neural core has encountered a threshold breach.",
                "detail": str(e),
                "shard": chat_id
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def _handle_booking(self, thread, user):
        if not thread.doctor_name or not thread.appointment_date:
            return
            
        doctor = Doctor.objects.filter(user__last_name__icontains=thread.doctor_name, is_available=True).first() or \
                 Doctor.objects.filter(user__first_name__icontains=thread.doctor_name, is_available=True).first()
                 
        if not doctor:
            thread.response = f"I've initiated the booking protocol, but I couldn't find Dr. {thread.doctor_name} in our active specialists registry."
            return

        time_str = str(thread.appointment_time) if thread.appointment_time else "10:00:00"
        data = {
            "doctor_id": doctor.id,
            "appointment_date": str(thread.appointment_date),
            "start_time": time_str,
            "notes": "Resolved via Sana AI Neural Bridge",
            "booked_via_voice": True 
        }
        
        target_user = user if user.is_authenticated else None
        if not target_user:
            return
            
        ser = AppointmentCreateSerializer(data=data, context={"request": _FakeRequest(target_user)})
        if ser.is_valid():
            ser.save()
            thread.doctor_name = None
            thread.appointment_date = None
            thread.appointment_time = None
            thread.response += " | BOOKING_CONFIRMED"
        else:
            err_msg = "; ".join([f"{k}: {v[0]}" for k, v in ser.errors.items()])
            thread.response = f"Neural path blocked by validation: {err_msg}"

class AIVocalHubView(APIView):
    """
    🎙️ Neural Vocal Propagation Layer
    Handles STT -> Neural Core -> TTS flow.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        audio_file = request.FILES.get('audio')
        chat_id = request.data.get('chat_id')
        
        if not audio_file:
            return Response({"error": "Audio shard required"}, status=400)
            
        fs = FileSystemStorage()
        saved = fs.save(f"shard_{uuid.uuid4().hex[:8]}.webm", audio_file)
        file_path = fs.path(saved)
        
        try:
            transcript = transcribe_audio_groq(file_path)
            if not transcript.strip():
                return Response({"response": "Neural sensors detected null audio input.", "status": "STABLE"})
            
            if not chat_id:
                chat_id = f"CH_{uuid.uuid4().hex[:12].upper()}"
            
            result = clinical_expert.process_query(transcript, chat_id=chat_id)
            
            user = request.user
            if user.is_authenticated:
                username = user.email or user.username or f"AUTH_NODE_{user.id}"
            else:
                username = f"GUEST_{chat_id[-6:]}"

            thread, _ = AIConversation.objects.get_or_create(
                chat_id=chat_id,
                defaults={'user_name': username, 'query': transcript}
            )
            
            thread.response = result.get('reply')
            thread.intent = result.get('intent')
            
            entities = result.get('entities', {}) or {}
            if entities.get('doctor_name'): thread.doctor_name = entities['doctor_name']
            if entities.get('date'):        thread.appointment_date = entities['date']
            if entities.get('time'):        thread.appointment_time = entities['time']
            
            audio_url = None
            try:
                tts_path = synthesize_speech(thread.response)
                rel = os.path.relpath(tts_path, settings.MEDIA_ROOT).replace("\\", "/")
                audio_url = f"{settings.MEDIA_URL}{rel}"
            except Exception as tts_err:
                print(f"[TTS FAIL] {tts_err}")
            
            thread.save()
            
            return Response({
                "chat_id": chat_id,
                "transcript": transcript,
                "response": thread.response,
                "audio_url": audio_url,
                "entities": entities,
                "status": "STABLE"
            })
        except Exception as e:
            return Response({"error": f"Neural voice propagation failed: {str(e)}"}, status=500)
        finally:
            if os.path.exists(file_path):
                os.remove(file_path)

class AIConversationViewSet(viewsets.ModelViewSet):
    queryset = AIConversation.objects.all()
    serializer_class = AIConversationSerializer
    permission_classes = [permissions.IsAdminUser]

class AIConfigViewSet(viewsets.ModelViewSet):
    queryset = AIConfig.objects.all()
    serializer_class = AIConfigSerializer
    lookup_field = 'key'
    permission_classes = [permissions.IsAdminUser]

class AISystemLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AISystemLog.objects.all()
    serializer_class = AISystemLogSerializer
    permission_classes = [permissions.IsAdminUser]
