import { useQuery } from '@tanstack/react-query';
import wardService from '../../../services/modules/wardService';

/**
 * 📉 Custom Hook: useBedStatus
 * Orchestrates real-time hospital capacity monitoring.
 * Derives occupancy percentages and total bed counts from systemic telemetry.
 */
export const useBedStatus = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['ward', 'bed-status'],
        queryFn: () => wardService.getBedAvailability(),
        staleTime: 60000, // 1m cache
    });

    // ── Analytical Workspace ──────────────────────────────────────────
    
    // Extracting raw telemetry nodes
    const stats = data?.overview || {
        total_beds: 0,
        occupied: 0,
        available: 0,
        maintenance: 0,
        occupancy_rate: "0%"
    };

    // Constructing chart-ready data distribution
    const chartData = [
        { name: 'Available', value: stats.available, color: '#10b981' }, // Emerald-500
        { name: 'Occupied', value: stats.occupied, color: '#f59e0b' },  // Amber-500
        { name: 'Maintenance', value: stats.maintenance, color: '#94a3b8' } // Slate-400
    ].filter(item => item.value > 0);

    // Derived Capacity Metrics
    const totalBeds = stats.total_beds;
    const occupancyRateNumeric = totalBeds > 0 
        ? Math.round((stats.occupied / totalBeds) * 100) 
        : 0;

    return {
        chartData,
        totalBeds,
        availableCount: stats.available,
        occupiedCount: stats.occupied,
        occupancyRate: `${occupancyRateNumeric}%`,
        isLoading,
        error
    };
};
