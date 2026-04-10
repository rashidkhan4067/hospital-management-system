import { useSearchParams } from 'react-router-dom';

/**
 * 🛰️ useDashboardFilters (Senior Architect Interaction Hook)
 * Centralizes global filter state for the Command Center, 
 * synchronized via URL Params for deep-linkability.
 */
export function useDashboardFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentUnit = searchParams.get('unit') || null;
  const currentStatus = searchParams.get('status') || 'All';
  const query = searchParams.get('q') || '';

  const setUnit = (unit) => {
    if (unit === 'All' || !unit) {
      searchParams.delete('unit');
    } else {
      searchParams.set('unit', unit);
    }
    setSearchParams(searchParams);
  };

  const setStatus = (status) => {
    if (status === 'All' || !status) {
      searchParams.delete('status');
    } else {
      searchParams.set('status', status);
    }
    setSearchParams(searchParams);
  };

  const setQuery = (newQuery) => {
    if (!newQuery) {
      searchParams.delete('q');
    } else {
      searchParams.set('q', newQuery);
    }
    setSearchParams(searchParams);
  };

  const clearAll = () => {
    setSearchParams({});
  };

  return {
    filters: { unit: currentUnit, status: currentStatus, query },
    setUnit,
    setStatus,
    setQuery,
    clearAll
  };
}
