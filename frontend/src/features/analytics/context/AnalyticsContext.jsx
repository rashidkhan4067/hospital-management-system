import React, { createContext, useContext } from 'react';
import { useAnalyticsFilters } from '../hooks/useAnalyticsFilters';

const AnalyticsContext = createContext();

/**
 * 🛰️ AnalyticsProvider
 * Centralized state for clinical intelligence filters.
 * Ensures that charts and KPIs across the shard stay synchronized.
 */
export function AnalyticsProvider({ children }) {
  const { filters, setFilter, clearFilters } = useAnalyticsFilters();

  const value = {
    filters,
    setFilter,
    clearFilters,
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
