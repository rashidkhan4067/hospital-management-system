import api from '@/services/apiClient';

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
   * Process a payment for a specific invoice.
   */
  async payInvoice(invoiceId, paymentData) {
    const response = await api.post(`/finance/invoices/${invoiceId}/pay/`, paymentData);
    return response.data;
  }

  /**
   * Generate a base invoice from an appointment completion.
   */
  async generateFromAppointment(appointmentId, fee = 50) {
    const response = await api.post('/finance/invoices/from-appointment/', {
      appointment_id: appointmentId,
      consultation_fee: fee,
    });
    return response.data;
  }

  /**
   * Add a specific line item to an invoice.
   */
  async addItem(invoiceId, itemData) {
    const response = await api.post(`/finance/invoices/${invoiceId}/add-item/`, itemData);
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
