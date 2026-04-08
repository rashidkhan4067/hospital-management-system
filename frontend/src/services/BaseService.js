import apiClient from './apiClient';

/**
 * 🏛️ BaseService (OOPS: Inheritance & Encapsulation)
 * Provides essential CRUD operations that other services inherit.
 */
export default class BaseService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  /**
   * Retrieves all records from the endpoint.
   */
  async getAll(params = {}) {
    const response = await apiClient.get(this.endpoint, { params });
    return response.data;
  }

  /**
   * Retrieves a single record by its ID.
   */
  async getById(id) {
    const response = await apiClient.get(`${this.endpoint}${id}/`);
    return response.data;
  }

  /**
   * Creates a new record.
   */
  async create(data) {
    const response = await apiClient.post(this.endpoint, data);
    return response.data;
  }

  /**
   * Updates an existing record.
   */
  async update(id, data) {
    const response = await apiClient.patch(`${this.endpoint}${id}/`, data);
    return response.data;
  }

  /**
   * Deletes a record.
   */
  async delete(id) {
    const response = await apiClient.delete(`${this.endpoint}${id}/`);
    return response.data;
  }

  /**
   * 📊 DSA: Quick Indexing
   * Converts a list of records into a Map for O(1) lookups.
   */
  createIndex(data, key = 'id') {
    return new Map(data.map(item => [item[key], item]));
  }
}
