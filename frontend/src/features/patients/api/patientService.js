import api from '@/core/api/apiClient';

/**
 * 🏥 PATIENT CLINICAL REGISTRY SERVICE
 * Orchestrates clinical identity, history, and medical shards.
 */
class PatientService {
  /**
   * Fetch all patient profiles with filtering and search.
   */
  async getPatients(params = {}) {
    try {
      const response = await api.get('/patients/profiles/', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to propagate patient registry:', error);
      throw error;
    }
  }

  /**
   * Retrieve a deep clinical shard for a specific patient ID.
   */
  async getPatientDetail(id) {
    try {
      const response = await api.get(`/patients/profiles/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch clinical record for patient ${id}:`, error);
      throw error;
    }
  }

  /**
   * Perform a new clinical intake (Full Patient Creation).
   */
  async createPatient(patientData) {
    try {
      const response = await api.post('/patients/profiles/', patientData);
      return response.data;
    } catch (error) {
      console.error('Failed to initialize patient identity:', error);
      throw error;
    }
  }

  /**
   * Update clinical identity or health node for a patient record.
   */
  async updatePatient(id, patientData) {
    try {
      const response = await api.patch(`/patients/profiles/${id}/`, patientData);
      return response.data;
    } catch (error) {
      console.error(`Failed to refactor clinical shard for patient ${id}:`, error);
      throw error;
    }
  }

  /**
   * Purge clinical identity from the global matrix.
   */
  async deletePatient(id) {
    try {
      const response = await api.delete(`/patients/profiles/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Failed to terminate clinical record for patient ${id}:`, error);
      throw error;
    }
  }

  /**
   * Fetch clinical observations (Lab Results, Vitals, History).
   */
  async getClinicalRecords(params = {}) {
    const response = await api.get('/patients/records/', { params });
    return response.data;
  }
}

export const patientService = new PatientService();
export default patientService;
