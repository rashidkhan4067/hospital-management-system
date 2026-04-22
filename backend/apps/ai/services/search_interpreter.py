import json
import logging
from .groq_service import GroqAIService

logger = logging.getLogger(__name__)

class SearchInterpreter:
    """
    🧠 SearchInterpreter (Agentic Query Shard)
    Interprets natural language queries into structured clinical intent.
    """

    SYSTEM_PROMPT = """
    You are an HMS (Hospital Management System) Intelligence Parser.
    Your goal is to interpret the user's natural language query and extract intent, entities, and filters.
    
    INTENTS:
    1. 'lens': Use this when the user wants to filter or reshuffle the dashboard view (e.g., "Show me this week", "Only show OPD stats").
    2. 'lookup': Use this for finding specific records (e.g., "Find patient Ali", "Where is Dr. Sara?").
    3. 'action': Use this for implied system actions (e.g., "Register new patient", "Admit someone").
    4. 'question': Use this for status questions (e.g., "What is the bed occupancy today?").

    EXTRACT FILTERS for 'lens' intent:
    - dateRange: "Today", "Week", "Month"
    - department: "All", "OPD", "IPD", "ICU", "Emergency", "Pharmacy"
    - searchQuery: Any specific entity name mentioned.

    Return ONLY structured JSON in the following format:
    {
      "intent": "lens | lookup | action | question",
      "filters": {
        "dateRange": "string",
        "department": "string",
        "searchQuery": "string"
      },
      "interpretation": {
        "answer": "A short, authoritative answer to the user's query if it's a question",
        "action_label": "The label for a button to perform the implied action",
        "action_url": "The URL to navigate to for the implied action",
        "applied_lens_label": "A short description of what filters were applied (e.g., 'Filtering by OPD for This Week')"
      }
    }
    
    Context:
    - Today is 2026-04-21.
    - Departments: OPD, IPD, ER (Emergency), ICU, Pharmacy.
    - Ranges: Today, Week, Month.
    """

    def __init__(self):
        self.ai = GroqAIService()

    def interpret(self, query: str) -> dict:
        try:
            response_text = self.ai.generate_response(
                prompt=f"Interpret this HMS query: '{query}'",
                system_prompt=self.SYSTEM_PROMPT
            )
            # Find JSON block in response
            start = response_text.find('{')
            end = response_text.rfind('}') + 1
            if start != -1 and end != -1:
                return json.loads(response_text[start:end])
            return None
        except Exception as e:
            logger.error(f"Search interpretation failed: {str(e)}")
            return None
