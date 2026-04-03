import api from '@/core/api/apiClient';
import BaseService from '@/core/api/BaseService';

/**
 * 📦 Inventory Service (OOPS: Inheritance)
 * Manages hospital supplies, stock levels, and pharmacy items.
 */
class InventoryService extends BaseService {
  constructor() {
    super('/inventory/items/');
  }

  /**
   * Retrieves medicine categories.
   */
  async getCategories() {
    const response = await api.get('inventory/categories/');
    return response.data;
  }

  /**
   * Adjusts stock quantity for an item.
   */
  async adjustStock(itemId, quantity, type, reason) {
    const response = await api.post(`${this.endpoint}${itemId}/adjust-stock/`, {
      quantity,
      type,
      reason
    });
    return response.data;
  }

  /**
   * Retrieves stock activity logs.
   */
  async getLogs(itemId = null) {
    const params = itemId ? { item: itemId } : {};
    const response = await api.get('inventory/logs/', { params });
    return response.data;
  }
}

const inventoryService = new InventoryService();
export { inventoryService };
export default inventoryService;
