import api from './apiClient';
import { BaseClinicalService } from './BaseService';

/**
 * 🩺 Doctor Operation Service
 * Extends BaseClinicalService (OOPS Inheritance) to inherit CRUD
 * while adding doctor-specific slot management.
 */
class DoctorService extends BaseClinicalService {
  constructor() {
    super('doctors/');
  }

  // Doctors specialty slots (Specialized Method)
  async getSlots(doctorId, date) {
    try {
      const response = await api.get(`${this.endpoint}${doctorId}/slots/`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      this._handleError(error, 'getSlots');
    }
  }
}

export const doctorService = new DoctorService();
