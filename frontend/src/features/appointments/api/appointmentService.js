import BaseService from '@/services/BaseService';
import apiClient from '@/services/apiClient';

/**
 * 📅 Appointment Service (OOPS: Inheritance)
 * Handles all clinical visit scheduling and status management.
 */
class AppointmentService extends BaseService {
  constructor() {
    super('/appointments/');
  }

  /**
   * 📊 DSA: Sort Appointments by Date
   * Provides a utility to sort the record list chronologically.
   */
  sortByDate(appointments, ascending = true) {
    return [...appointments].sort((a, b) => {
      const dateA = new Date(`${a.appointment_date}T${a.start_time}`);
      const dateB = new Date(`${b.appointment_date}T${b.start_time}`);
      return ascending ? dateA - dateB : dateB - dateA;
    });
  }

  /**
   * 📋 OPD Queue Fetcher
   * Fetches the current session's appointment queue for the outpatient department.
   */
  async getQueue() {
    const response = await apiClient.get(`${this.endpoint}queue/`);
    return response.data;
  }

  async cancel(id, reason) {
    return super.update(id, { 
      status: 'cancelled', 
      cancellation_reason: reason 
    });
  }

  /**
   * 📊 Clinical Telemetry
   */
  async getStats() {
    const response = await apiClient.get(`${this.endpoint}stats/`);
    return response.data;
  }
}

const appointmentService = new AppointmentService();
export { appointmentService };
export default appointmentService;
