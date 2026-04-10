import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

/**
 * 🛰️ useAnalyticsFilters (URL-as-Source-of-Truth)
 * Synchronizes administrative dropdowns with URL Search Parameters.
 * Enables bookmarking, sharing, and browser history support for filtered dashboards.
 */
export function useAnalyticsFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => ({
    period: searchParams.get('period') || 'Today',
    unit: searchParams.get('unit') || 'All Departments',
    practitioner: searchParams.get('practitioner') || 'All Doctors',
    query: searchParams.get('q') || '',
  }), [searchParams]);

  const setFilter = useCallback((key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      // Clean up defaults to keep URL clean
      if (value && value !== 'All Departments' && value !== 'All Doctors' && value !== 'Today' && value !== 'All') {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  return {
    filters,
    setFilter,
    clearFilters
  };
}
