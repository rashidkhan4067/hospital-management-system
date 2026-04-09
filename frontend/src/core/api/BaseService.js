import apiClient from './apiClient';

/**
 * 🏛️ BaseService (Google Software Development Strategy)
 * A resilient architectural base for all clinical data services.
 * Implements centralized error normalization and telemetry-ready response signatures.
 */
export default class BaseService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  /**
   * 📡 Fetch clinical dataset from the matrix.
   */
  async getAll(params = {}) {
    try {
      const { data } = await apiClient.get(this.endpoint, { params });
      return data;
    } catch (error) {
      this._handleError('Dataset retrieval failed', error);
    }
  }

  /**
   * 🔬 Retrieve a specific clinical record by its unique shard ID.
   */
  async getById(id) {
    try {
      const { data } = await apiClient.get(`${this.endpoint}${id}/`);
      return data;
    } catch (error) {
      this._handleError(`Record ${id} retrieval failed`, error);
    }
  }

  /**
   * 📥 Commit a new record to the clinical database.
   */
  async create(data) {
    try {
      const { data: responseData } = await apiClient.post(this.endpoint, data);
      return responseData;
    } catch (error) {
      this._handleError('Record creation failed', error);
    }
  }

  /**
   * 📝 Perform a surgical patch update on a clinical unit.
   */
  async update(id, data) {
    try {
      const { data: responseData } = await apiClient.patch(`${this.endpoint}${id}/`, data);
      return responseData;
    } catch (error) {
      this._handleError(`Record ${id} update failed`, error);
    }
  }

  /**
   * ☣️ Terminal deletion of a clinical shard.
   */
  async delete(id) {
    try {
      const { data } = await apiClient.delete(`${this.endpoint}${id}/`);
      return data;
    } catch (error) {
      this._handleError(`Record ${id} deletion failed`, error);
    }
  }

  /**
   * 🛠️ Internal Error Normalization Logic
   */
  _handleError(context, error) {
    console.error(`🚨 [BaseService] ${context}:`, error);
    throw error;
  }
}
