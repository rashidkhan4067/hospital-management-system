"""
apps/ai/services/pipeline_service.py
────────────────────────────────────────────────────────────────
Elite Neural Pipeline — Groq Bimodal Clinical Logic
Unified for Text and Vocal Intelligence Propagation.
"""
from __future__ import annotations

import os
import json
import uuid
import asyncio
import time
import requests
import re
import edge_tts
from datetime import datetime
from django.conf import settings

# ─────────────────────────────────────────────────────────────────────────────
# Constants (Neural Core Calibration)
# ─────────────────────────────────────────────────────────────────────────────
_GROQ_BASE   = "https://api.groq.com/openai/v1"
_STT_MODEL   = "whisper-large-v3-turbo"   
_LLM_MODEL   = "llama-3.3-70b-versatile"  
_TTS_VOICE   = "en-US-AvaNeural"         
_TTS_RATE    = "+0%"                      
_TTS_PITCH   = "+0Hz"

THINKING_FILLERS = [
    "Certainly, let me check the clinical grid...",
    "Understood. Accessing the schedule now...", 
    "One moment, I am retrieving the relevant doctor shards...",
]

def _headers() -> dict:
    return {
        "Authorization": f"Bearer {settings.GROQ_API_KEY}",
        "Content-Type":  "application/json",
    }

# ─────────────────────────────────────────────────────────────────────────────
# Step 1 — Speech-to-Text (Groq Whisper Turbo)
# ─────────────────────────────────────────────────────────────────────────────
def transcribe_audio_groq(file_path: str) -> str:
    """Transcribe audio shards using Groq's high-performance Whisper engine."""
    t0 = time.perf_counter()
    url = f"{_GROQ_BASE}/audio/transcriptions"
    headers = {"Authorization": f"Bearer {settings.GROQ_API_KEY}"}

    with open(file_path, "rb") as f:
        resp = requests.post(
            url,
            headers=headers,
            files={"file": (os.path.basename(file_path), f, "audio/webm")},
            data={
                "model":           _STT_MODEL,
                "response_format": "json",
                "language":        "en",
                "temperature":     "0",
            },
            timeout=15,
        )

    if resp.status_code != 200:
        raise RuntimeError(f"STT Error {resp.status_code}: {resp.text[:300]}")

    transcript = resp.json().get("text", "").strip()
    print(f"[STT] Node Responded in {time.perf_counter()-t0:.2f}s")
    return transcript

# ─────────────────────────────────────────────────────────────────────────────
# Step 2 — Intent + Entity Extraction (Groq LLM)
# ─────────────────────────────────────────────────────────────────────────────
def detect_emotion(transcript: str) -> str:
    """Detect pulse/emotion state to adjust Sana's neural tone."""
    prompt = f"Patient said: '{transcript}'\nReturn ONE word: urgent | normal | confused"
    payload = {
        "model": "llama-3.3-70b-versatile",
        "temperature": 0.1,
        "max_tokens": 10,
        "messages": [{"role": "user", "content": prompt}],
    }
    try:
        resp = requests.post(f"{_GROQ_BASE}/chat/completions", headers=_headers(), json=payload, timeout=5)
        if resp.status_code == 200:
            return resp.json()["choices"][0]["message"]["content"].strip().lower()
    except: pass
    return "normal"

def get_tone_instruction(emotion: str) -> str:
    tones = {
        "urgent": "Sound highly empathetic, calm, and prioritize rapid clinical assist.",
        "normal": "Maintain a friendly, crisp, and high-tech professional persona.",
        "confused": "Be extremely clear and patient, simplifying complex system terms."
    }
    return tones.get(emotion, tones["normal"])

def extract_intent_llm(transcript: str, memory: dict | None = None, history: list = None) -> dict:
    """
    Elite Neural Propagation Core.
    Biphasic (Urdu/English support), high-fidelity grounding.
    """
    t0  = time.perf_counter()
    now = datetime.now()
    emotion = detect_emotion(transcript)
    tone = get_tone_instruction(emotion)

    from datetime import timedelta
    kal      = (now + timedelta(days=1)).strftime("%Y-%m-%d")
    parson   = (now + timedelta(days=2)).strftime("%Y-%m-%d")

    mem_lines = []
    if memory:
        if memory.get("doctor"):   mem_lines.append(f"MD: {memory['doctor']}")
        if memory.get("date"):     mem_lines.append(f"Date: {memory['date']}")
        if memory.get("time"):     mem_lines.append(f"Time: {memory['time']}")
        if memory.get("awaiting"): mem_lines.append("Status: AWAITING CONFIRMATION")
    memory_block = "\n".join(mem_lines) or "Neural history empty."

    system = f"""You are Sana, the Senior Clinical Intelligence Shard for Al Shifaa Medical Center.
You manage clinical appointments and administrative inquiries via English and Roman Urdu.

ELITE OPERATIONAL STANDARDS:
- IDENTITY: Always 'Sana'. Professional, empathetic, high-tech.
- BIPHASIC: Respond in the user's language. If they use Urdu, use Roman Urdu.
- CONCISION: Max 2 sentences for vocal turns. 
- GROUNDING: Use the provided Context Shard. Don't book if details are mismatched.
- PROTOCOL: (TONE: {tone})

🕐 TEMPORAL ANCHOR: {now.strftime("%A, %d %B %Y — %I:%M %p")}
📅 REFERENCE NODES: Tomorrow={kal}, Next Day={parson}.

💾 NEURAL CONTEXT SHARD:
{memory_block}

INTENT MAPPING: greeting | book_appointment | confirm_appointment | cancel_appointment | check_my_schedule | fallback
ACTION NODES: ask_doctor | ask_date | ask_time | confirm_booking | book_now | cancel_now | show_schedule | respond

STRICT JSON OUTPUT:
{{
  "intent": "string",
  "entities": {{ "doctor_name": "string?", "date": "YYYY-MM-DD?", "time": "HH:MM?", "specialization": "string?" }},
  "action": "string",
  "reply": "Empathetic clinical response"
}}"""

    messages = [{"role": "system", "content": system}]
    if history: messages.extend(history)
    messages.append({"role": "user", "content": f"Neural Input: '{transcript}'"})

    resp = requests.post(
        f"{_GROQ_BASE}/chat/completions",
        headers=_headers(),
        json={
            "model": _LLM_MODEL,
            "response_format": {"type": "json_object"},
            "temperature": 0.2,
            "max_tokens": 150,
            "messages": messages,
        },
        timeout=12,
    )

    if resp.status_code != 200:
        raise RuntimeError(f"LLM Core Propagation Failure ({resp.status_code})")

    raw = resp.json()["choices"][0]["message"]["content"]
    print(f"[LLM] Propagation Successful in {time.perf_counter()-t0:.2f}s")

    try:
        parsed = json.loads(raw)
    except:
        parsed = {"intent": "fallback", "action": "respond", "reply": "Maaf kijiye, neural loop error. Kya aap dobara bata sakte hain?"}
            
    return parsed

# ─────────────────────────────────────────────────────────────────────────────
# Step 3 — Text-to-Speech (Edge-TTS Neural)
# ─────────────────────────────────────────────────────────────────────────────
def synthesize_speech(text: str) -> str:
    """Neural Voice Generation (AvaNeural)."""
    clean_text = re.sub(r'[^\w\s\u0600-\u06FF\.,!?;\-\(\)\']', ' ', text, flags=re.UNICODE)
    clean_text = re.sub(r'\s+', ' ', clean_text).strip()

    filename = f"tts_{uuid.uuid4().hex[:10]}.mp3"
    out_dir  = os.path.join(settings.MEDIA_ROOT, "tts_cache")
    os.makedirs(out_dir, exist_ok=True)
    filepath = os.path.join(out_dir, filename)

    async def _amain():
        communicate = edge_tts.Communicate(clean_text, _TTS_VOICE, rate=_TTS_RATE, pitch=_TTS_PITCH)
        await communicate.save(filepath)

    try:
        asyncio.run(_amain())
    except:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(_amain())
        loop.close()

    return filepath
