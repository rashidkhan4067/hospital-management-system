import { useQuery } from '@tanstack/react-query';
import patientService from '@/features/patients/api/patientService';

/**
 * 🎣 CLINICAL REGISTRY HOOK
 * Enforces atomic server-state for the administrative patient matrix.
 * Powered by TanStack Query for automatic caching and URL-driven reactivity.
 */
export const useAdminPatients = (filters = {}) => {
  const query = useQuery({
    queryKey: ['patients', 'admin', filters],
    queryFn: async () => {
        const data = await patientService.getPatients(filters);
        return data.results || data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 min
  });

  return { 
    patients: query.data || [], 
    loading: query.isLoading, 
    error: query.error, 
    refresh: query.refetch 
  };
};

export default useAdminPatients;
