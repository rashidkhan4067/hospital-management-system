from .pipeline_service import extract_intent_llm
from ..models import AIConversation

class ClinicalExpertService:
    """
    🏥 Clinical Intelligence Layer.
    Orchestrates high-fidelity LLM propagation with state persistence
    and clinical intent extraction for a stateful clinical interaction.
    """

    def process_query(self, user_query: str, chat_id: str = None) -> dict:
        """
        ⚡ High-Performance Neural Propagation
        Extracts intent, entities, and generates a clinical response.
        """
        memory = {}
        history = []
        
        # Resolve shard context
        if chat_id:
            thread = AIConversation.objects.filter(chat_id=chat_id).first()
            if thread:
                memory = {
                    "doctor": thread.doctor_name,
                    "date": str(thread.appointment_date) if thread.appointment_date else None,
                    "time": str(thread.appointment_time) if thread.appointment_time else None,
                    "awaiting": thread.is_awaiting_confirmation,
                }
                history = thread.history[-6:]
        
        # Execute Neural Pipeline
        result = extract_intent_llm(user_query, memory=memory, history=history)
        return result
