import { useState, useEffect, useCallback } from 'react';
import patientService from '@/features/patients/api/patientService';

/**
 * 🎣 CLINICAL REGISTRY HOOK
 * Encourages separation of concerns by encapsulating fetching, search, and load states.
 */
export const useAdminPatients = (initialFilters = {}) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const data = await patientService.getPatients(filters);
      // Backend paginates by default, so data might be { results: [], count: 0 }
      setPatients(data.results || data); 
      setError(null);
    } catch (err) {
      setError('System could not translate patient records.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return { patients, loading, error, filters, updateFilters, refresh: fetchPatients };
};

export default useAdminPatients;
