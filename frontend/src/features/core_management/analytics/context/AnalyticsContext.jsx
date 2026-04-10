import React, { createContext, useContext, useCallback } from 'react';
import { useDataStore } from '@/core/store/useDataStore';

const AnalyticsContext = createContext();

/**
 * 🛰️ AnalyticsProvider (Global Store Connector)
 * Centralized state for clinical intelligence filters, now powered by useDataStore.
 * Ensures that charts and KPIs across the shard stay synchronized with global facility intent.
 */
export function AnalyticsProvider({ children }) {
  const globalFilters = useDataStore(state => state.filters);
  const setGlobalFilters = useDataStore(state => state.setFilters);
  const resetGlobalFilters = useDataStore(state => state.resetFilters);

  // 🧬 Normalize keys between Analytics Context and Global Store
  const filters = {
    period: globalFilters.dateRange,
    unit: globalFilters.department,
    status: globalFilters.status,
    query: globalFilters.searchQuery
  };

  const setFilter = useCallback((key, value) => {
    // Map Analytics local keys back to Global Store keys
    const keyMap = {
        period: 'dateRange',
        unit: 'department',
        status: 'status',
        query: 'searchQuery'
    };
    
    setGlobalFilters({ [keyMap[key] || key]: value });
  }, [setGlobalFilters]);

  const value = {
    filters,
    setFilter,
    clearFilters: resetGlobalFilters,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) throw new Error('useAnalytics must be used within AnalyticsProvider');
  return context;
};
