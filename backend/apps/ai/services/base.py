from abc import ABC, abstractmethod

class BaseAIService(ABC):
    @abstractmethod
    def generate_response(self, prompt: str, system_prompt: str = None) -> str:
        pass
