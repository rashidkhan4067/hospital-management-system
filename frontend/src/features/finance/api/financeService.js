import api from '@/core/api/apiClient';

/**
 * 💳 CLINICAL FINANCE & BILLING SERVICE
 * Tracks transactions, clinical invoices, and insurance shards.
 */
class FinanceService {
  /**
   * Fetch all fiscal transactions for auditing.
   */
  async getTransactions(params = {}) {
    try {
      const response = await api.get('/finance/transactions/', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to translate transaction matrix:', error);
      throw error;
    }
  }

  /**
   * Fetch clinical invoices linked to patient encounters.
   */
  async getInvoices(params = {}) {
    const response = await api.get('/finance/invoices/', { params });
    return response.data;
  }

  /**
   * Create a new fiscal transaction node.
   */
  async createTransaction(data) {
    const response = await api.post('/finance/transactions/', data);
    return response.data;
  }

  /**
   * Orchestrate insurance claims propagation.
   */
  async getClaims() {
    const response = await api.get('/finance/claims/');
    return response.data;
  }
}

export const financeService = new FinanceService();
export default financeService;
