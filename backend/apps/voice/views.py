"""
apps/voice/views.py
────────────────────────────────────────────────────────────────
Rebuilt Voice Pipeline — Maximum Performance Edition
"""
from __future__ import annotations

import os
import datetime
import mimetypes
import random
import string

from django.core.files.storage import FileSystemStorage
from django.http import FileResponse, JsonResponse
from rest_framework import views, status, permissions
from rest_framework.response import Response
from django.conf import settings

from apps.accounts.models import User
from apps.doctors.models import Doctor
from apps.appointments.models import Appointment
from apps.appointments.serializers import AppointmentCreateSerializer
from .services import (
    transcribe_audio_groq,
    extract_intent_llm,
    synthesize_speech,
    get_greeting_reply,
)
from .models import VoiceSession


# ─────────────────────────────────────────────────────────────────────────────
# Helper: Fake request for serializer context
# ─────────────────────────────────────────────────────────────────────────────
class _FakeRequest:
    def __init__(self, user): self.user = user


# ─────────────────────────────────────────────────────────────────────────────
# Main Voice Pipeline View
# ─────────────────────────────────────────────────────────────────────────────
class FullVoicePipelineView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        audio_file = request.FILES.get("audio")
        email      = request.data.get("email", "guest@example.com")

        if not audio_file:
            return self._error_response("No audio file received.", "I didn't receive any audio.")

        # Save temp file
        fs        = FileSystemStorage()
        saved     = fs.save(audio_file.name, audio_file)
        file_path = fs.path(saved)

        try:
            return self._handle(file_path, email)
        except Exception as e:
            print(f"[PIPELINE ERROR] {e}")
            import traceback
            traceback.print_exc()
            error_text = "I'm sorry, a technical error occurred. Please try again."
            return self._error_response(str(e), error_text)
        finally:
            try:
                if os.path.exists(file_path):
                    os.remove(file_path)
            except Exception:
                pass

    def _handle(self, file_path: str, email: str):
        # 1. Resolve patient or Guest context
        patient = User.objects.filter(email__iexact=email, role=User.Role.PATIENT).first()
        
        # 2. Load / create session
        if patient:
            session, _ = VoiceSession.objects.get_or_create(user=patient)
        else:
            session = VoiceSession.objects.filter(guest_email__iexact=email).first()
            if not session:
                bot_user = User.objects.filter(role=User.Role.ADMIN).first()
                session = VoiceSession.objects.create(user=bot_user, guest_email=email)

        memory = {
            "doctor":      session.doctor_name,
            "date":        str(session.appointment_date) if session.appointment_date else None,
            "time":        str(session.appointment_time) if session.appointment_time else None,
            "awaiting":    session.is_awaiting_confirmation,
            "guest_name":  session.guest_name,
            "guest_email": session.guest_email,
        }

        # 3. STT
        transcript = transcribe_audio_groq(file_path)
        if not transcript.strip():
            reply = "I didn't hear anything. Is your microphone on?"
            return self._voice_response("", reply, "respond", "fallback", session)

        # Greeting bypass
        low = transcript.lower().strip()
        if any(w in low for w in ["hello", "hi ", "hey", "greetings", "morning"]):
            reply = get_greeting_reply()
            return self._voice_response(transcript, reply, "respond", "greeting", session)

        # 4. LLM
        result = extract_intent_llm(transcript, memory=memory, history=session.history)
        intent  = result.get("intent",  "fallback")
        ents    = result.get("entities", {}) or {}
        action  = result.get("action",  "respond")
        reply   = result.get("reply",   "I'm sorry, I didn't quite catch that.")

        # Save history
        history = list(session.history)
        history.append({"role": "user", "content": transcript})
        history.append({"role": "assistant", "content": reply})
        session.history = history[-6:]

        # 5. Update session
        if ents.get("doctor_name"):     session.doctor_name       = ents["doctor_name"]
        if ents.get("date"):            session.appointment_date  = ents["date"]
        if ents.get("time"):            session.appointment_time  = ents["time"]
        if result.get("extracted_guest_name"):  session.guest_name  = result["extracted_guest_name"]
        if result.get("extracted_guest_email"): session.guest_email = result["extracted_guest_email"]
        
        session.last_intent = intent
        session.save()

        # 6. Action routing
        if action == "confirm_booking":
            session.is_awaiting_confirmation = True
            session.save()
            return self._voice_response(transcript, reply, action, intent, session)

        if action == "book_now" or (session.is_awaiting_confirmation and intent == "confirm_appointment"):
            target_patient = patient
            if not target_patient:
                g_email = session.guest_email or ents.get("email")
                g_name = session.guest_name or ents.get("name")
                
                if not g_email or "@" not in g_email:
                    reply = "I'll need your email address to book the appointment. Could you please provide it?"
                    return self._voice_response(transcript, reply, "ask_email", "book_appointment", session)
                
                target_patient = User.objects.filter(email__iexact=g_email).first()
                if not target_patient:
                    f_name = g_name.split()[0] if g_name else "Guest"
                    l_name = " ".join(g_name.split()[1:]) if g_name and len(g_name.split()) > 1 else "User"
                    pw = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
                    target_patient = User.objects.create_user(email=g_email, password=pw, first_name=f_name, last_name=l_name)
            
            return self._do_book_appointment(transcript, target_patient, session)

        if action == "cancel_now" or intent == "cancel_appointment":
            return self._do_cancel_appointment(transcript, patient, session, ents)

        if action == "show_schedule" or intent == "check_my_schedule":
            return self._do_show_schedule(transcript, patient, session)

        return self._voice_response(transcript, reply, action, intent, session)

    def _do_book_appointment(self, transcript: str, patient, session) -> JsonResponse:
        d_name = session.doctor_name
        d_date = session.appointment_date
        d_time = str(session.appointment_time) if session.appointment_time else "10:00:00"

        if not d_name:
            return self._voice_response(transcript, "I missed the doctor's name. Who would you like to see?", "ask_doctor", "book_appointment", session)
        if not d_date:
            return self._voice_response(transcript, "Which date would you like to book for?", "ask_date", "book_appointment", session)

        doctor = Doctor.objects.filter(user__last_name__icontains=d_name, is_available=True).first() or \
                 Doctor.objects.filter(user__first_name__icontains=d_name, is_available=True).first()

        if not doctor:
            self._reset_session(session)
            return self._voice_response(transcript, f"I'm sorry, I couldn't find Dr. {d_name} in our system.", "respond", "book_appointment", session)

        data = {
            "doctor_id": doctor.id, "appointment_date": str(d_date), "start_time": d_time,
            "notes": "Booked via Sana AI Voice", "booked_via_voice": True
        }
        ser = AppointmentCreateSerializer(data=data, context={"request": _FakeRequest(patient)})
        if ser.is_valid():
            ser.save()
            self._reset_session(session)
            return self._voice_response(transcript, f"Great! Your appointment with Dr. {doctor.user.last_name} is confirmed for {d_date} at {d_time[:5]}.", "book_now", "book_appointment", session)
        
        errs = "; ".join(str(m) for msgs in ser.errors.values() for m in msgs)
        self._reset_session(session)
        return self._voice_response(transcript, f"I couldn't complete the booking: {errs}", "respond", "book_appointment", session)

    def _do_cancel_appointment(self, transcript, patient, session, ents):
        if not patient: return self._voice_response(transcript, "I can only cancel appointments for registered users.", "respond", "cancel", session)
        appt = Appointment.objects.filter(patient=patient, status="pending").first()
        if appt:
            appt.status = "cancelled"
            appt.save()
            self._reset_session(session)
            return self._voice_response(transcript, f"Your appointment with Dr. {appt.doctor.user.last_name} has been cancelled.", "cancel_now", "cancel", session)
        return self._voice_response(transcript, "I couldn't find any pending appointments to cancel.", "respond", "cancel", session)

    def _do_show_schedule(self, transcript, patient, session):
        if not patient: return self._voice_response(transcript, "Please log in to view your schedule.", "respond", "schedule", session)
        appts = Appointment.objects.filter(patient=patient, appointment_date__gte=datetime.date.today(), status="pending")
        if not appts.exists(): return self._voice_response(transcript, "You have no upcoming appointments.", "respond", "schedule", session)
        a = appts.first()
        return self._voice_response(transcript, f"Your next appointment is with Dr. {a.doctor.user.last_name} on {a.appointment_date}.", "show_schedule", "schedule", session)

    def _voice_response(self, transcript, reply, action, intent, session):
        audio_url = None
        try:
            path = synthesize_speech(reply)
            rel = os.path.relpath(path, settings.MEDIA_ROOT).replace("\\", "/")
            audio_url = f"{settings.MEDIA_URL}{rel}"
        except Exception as e: print(f"[TTS FAIL] {e}")

        s_state = {}
        if session:
            s_state = {"doctor": session.doctor_name, "date": str(session.appointment_date), "time": str(session.appointment_time)}

        return JsonResponse({"success":True, "transcript":transcript, "reply":reply, "action":action, "intent":intent, "audio_url":audio_url, "session":s_state})

    def _error_response(self, error, reply):
        return JsonResponse({"success":False, "error":error, "reply":reply})

    def _reset_session(self, session):
        session.doctor_name = None
        session.appointment_date = None
        session.appointment_time = None
        session.is_awaiting_confirmation = False
        session.save()
