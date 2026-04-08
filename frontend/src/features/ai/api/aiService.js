import BaseService from '@/services/BaseService';
import api from '@/services/apiClient';

/**
 * 🤖 AI Service (OOPS: Inheritance)
 * Handles all AI-driven clinical operations, chat, and voice processing.
 */
class AIService extends BaseService {
  constructor() {
    super('/ai/');
  }

  /**
   * Sends a text query to the Sana AI assistant.
   */
  async askSana(query, chatId = null) {
    const response = await api.post(`${this.endpoint}query/`, { query, chat_id: chatId });
    return response.data;
  }

  /**
   * Processes voice queries (Audio to Text & AI Response).
   */
  async vocalQuery(formData) {
    const response = await api.post(`${this.endpoint}vocal-query/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  /**
   * Retrieves past conversation history.
   */
  async getConversationHistory() {
    return this.getAll();
  }

  /**
   * Retrieves AI configuration settings.
   */
  async getAIConfig() {
    const response = await api.get(`${this.endpoint}config/`);
    return response.data;
  }
}

const aiService = new AIService();
export { aiService };
export default aiService;
