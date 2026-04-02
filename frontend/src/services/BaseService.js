import api from './apiClient';

/**
 * 🏥 Base Clinical Service (OOPS Pattern)
 * Provides standardized CRUD operations with centralized error handling
 * and performance logging.
 */
export class BaseClinicalService {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.api = api;
  }

  async getAll(params = {}) {
    const startTime = performance.now();
    try {
      const response = await api.get(this.endpoint, { params });
      this._logPerformance('getAll', performance.now() - startTime);
      return response.data;
    } catch (error) {
      this._handleError(error, 'getAll');
    }
  }

  async getById(id) {
    try {
      const response = await api.get(`${this.endpoint}${id}/`);
      return response.data;
    } catch (error) {
      this._handleError(error, 'getById');
    }
  }

  async create(data) {
    try {
      const response = await api.post(this.endpoint, data);
      return response.data;
    } catch (error) {
      this._handleError(error, 'create');
    }
  }

  async update(id, data) {
    try {
      const response = await api.patch(`${this.endpoint}${id}/`, data);
      return response.data;
    } catch (error) {
      this._handleError(error, 'update');
    }
  }

  async delete(id) {
    try {
      await api.delete(`${this.endpoint}${id}/`);
      return true;
    } catch (error) {
      this._handleError(error, 'delete');
    }
  }

  // 🛰️ Low-level Matrix Operations
  async get(url, params = {}) {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      this._handleError(error, 'get');
    }
  }

  async post(url, data) {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      this._handleError(error, 'post');
    }
  }

  async patch(url, data) {
    try {
      const response = await api.patch(url, data);
      return response.data;
    } catch (error) {
      this._handleError(error, 'patch');
    }
  }

  // Private helpers (Encapsulation)
  _handleError(error, method) {
    console.error(`[BaseService] Error in ${this.endpoint}::${method}`, error);
    throw error;
  }

  _logPerformance(method, duration) {
    if (duration > 500) {
      console.warn(`[Performance] ${this.endpoint}::${method} took ${duration.toFixed(2)}ms`);
    }
  }
}
