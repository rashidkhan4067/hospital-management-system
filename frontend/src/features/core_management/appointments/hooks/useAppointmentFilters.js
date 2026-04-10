import { useSearchParams } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import { useDataStore } from '@/core/store/useDataStore';

/**
 * 🛰️ useAppointmentFilters (M3 Senior Architect Spec)
 * Refactored to prioritize URL Search Params (Atomic truth) while falling back
 * to the Global Data Intelligence Store for cross-module consistency.
 */
export function useAppointmentFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const globalFilters = useDataStore(state => state.filters);

  const filters = useMemo(() => {
    // 🧬 Mapping Global Keys to Local Context with Normalization
    const rawUnit = searchParams.get('unit') || globalFilters.department || 'All';
    const rawStatus = searchParams.get('status') || globalFilters.status || 'All';
    const rawDoctor = searchParams.get('doctor') || 'All Doctors';

    return {
        view: searchParams.get('view') || 'agenda',
        unit: rawUnit.toLowerCase() === 'all' ? 'All Departments' : rawUnit,
        doctor: rawDoctor.toLowerCase() === 'all' || rawDoctor.toLowerCase() === 'all doctors' ? 'All Doctors' : rawDoctor,
        status: rawStatus.toLowerCase() === 'all' ? 'All' : rawStatus,
        range: searchParams.get('range') || globalFilters.dateRange || 'Today',
        id: searchParams.get('id') || null,
        query: searchParams.get('q') || globalFilters.searchQuery || '',
    };
  }, [searchParams, globalFilters]);

  // 📝 Standard Setter (Updates URL only, letting store stay as background sync)
  const setFilter = useCallback((key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value && value !== 'All' && value !== 'All Departments' && value !== 'All Doctors') {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams({ view: filters.view }), { replace: true });
  }, [setSearchParams, filters.view]);

  return {
    filters,
    setFilter,
    clearFilters
  };
}
