import { useQuery } from '@tanstack/react-query';
import departmentService from '@/services/modules/departmentService';

/**
 * 🏢 Custom Hook: useDepartmentStats
 * Encapsulates the fetching logic for the Department Distribution Matrix.
 */
export const useDepartmentStats = () => {
    const { data: departmentData, isLoading, error } = useQuery({
        queryKey: ['department-stats'],
        queryFn: () => departmentService.getDepartmentStats(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {
        departments: departmentData || [],
        loading: isLoading,
        error
    };
};
