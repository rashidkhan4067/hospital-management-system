import api from '../apiClient';
import { BaseClinicalService } from '../BaseService';

/**
 * 📦 Global Resource Allocation Service
 * Manages the high-fidelity inventory matrix, supply shards, and audit logs.
 */
class InventoryService extends BaseClinicalService {
  constructor() {
    super('inventory/items/');
  }

  // Fetch categorized shards
  async getCategories() {
    try {
      const response = await api.get('inventory/categories/');
      return response.data;
    } catch (error) {
      this._handleError(error, 'getCategories');
    }
  }

  // Stock modification protocol
  async adjustStock(itemId, quantity, type, reason) {
    try {
      const response = await api.post(`${this.endpoint}${itemId}/adjust-stock/`, {
        quantity,
        type,
        reason
      });
      return response.data;
    } catch (error) {
      this._handleError(error, 'adjustStock');
    }
  }

  // Audit trail propagation
  async getLogs(itemId = null) {
    try {
      const params = itemId ? { item: itemId } : {};
      const response = await api.get('inventory/logs/', { params });
      return response.data;
    } catch (error) {
      this._handleError(error, 'getLogs');
    }
  }
}

export const inventoryService = new InventoryService();
