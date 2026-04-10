import { useState, useEffect, useCallback } from 'react';
import financeService from '@/features/financials/finance/api/financeService';

/**
 * 🎣 CLINICAL FINANCE HOOK
 * Provides live transactions, invoice counts, and revenue shards for the Admin Dashboard.
 */
export const useAdminFinance = (initialFilters = {}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await financeService.getTransactions(filters);
      // Backend paginates, so data is usually { results: [], count: 0 }
      setTransactions(data.results || data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('System could not translate financial records.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  /**
   * Post a new clinical transaction node.
   */
  const postTransaction = async (data) => {
    try {
      await financeService.createTransaction(data);
      refresh();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const refresh = () => fetchTransactions();

  return { transactions, loading, error, postTransaction, refresh, setFilters };
};

export default useAdminFinance;

