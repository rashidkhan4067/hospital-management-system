import { BaseClinicalService } from './BaseService';

/**
 * 🛰️ Neural Intelligence Service Hub
 * Primary controller for all AI-driven clinical operations.
 * Handles high-fidelity LLM propagation and system audit shards.
 */
class AIService extends BaseClinicalService {
    constructor() {
        super('/ai/');
    }

    /**
     * 🧠 Neural Query Propagation
     * Sends a natural language query with optional context shard.
     */
    async askSana(query, chatId = null) {
        try {
            return await this.post(`${this.endpoint}query/`, { query, chat_id: chatId });
        } catch (error) {
            console.error('[AIService] Query Propagation Breach:', error);
            throw error;
        }
    }

    /**
     * 🎙️ Neural Vocal Propagation
     * Sends audio shards for STT -> LLM -> TTS processing.
     */
    async vocalQuery(formData) {
        try {
            const response = await this.api.post(`${this.endpoint}vocal-query/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            console.error('[AIService] Vocal Shard Breach:', error);
            throw error;
        }
    }

    /**
     * 📖 Audit Conversation History
     * Fetches the clinical interaction logs for auditing.
     */
    async getConversationHistory() {
        return await this.getAll();
    }

    /**
     * ⚙️ Fetch Neural Network Config
     * Retrieves the AI parameters and operational thresholds.
     */
    async getAIConfig() {
        return await this.get(`${this.endpoint}config/`);
    }
}

export const aiService = new AIService();
