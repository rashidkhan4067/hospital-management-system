import apiClient from '../apiClient';

/**
 * 🏥 OPD Service (Outpatient Department)
 * Orchestrates real-time queue management and token tracking.
 */
class OPDService {
  constructor() {
    this.endpoint = 'appointments/queue/';
  }

  /**
   * 🛰️ Live Queue Telemetry
   * Fetches the current sequence of patients waiting for consultation.
   */
  async getLiveQueue() {
    const response = await apiClient.get(this.endpoint);
    return response.data;
  }
}

export const opdService = new OPDService();
export default opdService;
