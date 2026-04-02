import requests
import json
from django.conf import settings
from .base import BaseAIService

class GroqAIService(BaseAIService):
    """
    🚀 High-performance LLM Service using Groq Cloud API.
    Utilizes Llama 3 for clinical-grade reasoning and natural language processing.
    """
    
    BASE_URL = "https://api.groq.com/openai/v1/chat/completions"
    DEFAULT_MODEL = "llama-3.3-70b-versatile"

    def __init__(self, model=None):
        self.api_key = getattr(settings, "GROQ_API_KEY", None)
        self.model = model or self.DEFAULT_MODEL
        
        if not self.api_key:
            raise ValueError("GROQ_API_KEY is not configured in settings.")

    def generate_response(self, prompt: str, system_prompt: str = None) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        
        messages.append({"role": "user", "content": prompt})
        
        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": 0.5,
            "max_tokens": 1024,
            "top_p": 1,
            "stream": False
        }

        try:
            response = requests.post(self.BASE_URL, headers=headers, json=payload, timeout=30)
            response.raise_for_status()
            result = response.json()
            return result["choices"][0]["message"]["content"]
        except Exception as e:
            # In a real app, we would log this to AISystemLog
            return f"Error communicating with AI core: {str(e)}"
