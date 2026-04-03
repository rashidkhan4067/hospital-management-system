import api from '@/core/api/apiClient';
import BaseService from '@/core/api/BaseService';

/**
 * 🩺 Doctor Service (OOPS: Inheritance)
 * Handles all medical professional records and available slots.
 */
class DoctorService extends BaseService {
  constructor() {
    super('/doctors/');
  }

  /**
   * Retrieves doctor-specific visit slots.
   */
  async getSlots(doctorId, date) {
    const response = await api.get(`${this.endpoint}${doctorId}/slots/`, {
      params: { date }
    });
    return response.data;
  }
}

const doctorService = new DoctorService();
export { doctorService };
export default doctorService;
