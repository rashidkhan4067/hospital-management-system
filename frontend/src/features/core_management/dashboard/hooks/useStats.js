import { useDashboardData } from './useDashboardData';

/**
 * 📊 useAdminStats (Executive Telemetry Shard)
 * Maps global clinical and fiscal telemetry into structured KPIs for administrative oversight.
 */
export function useAdminStats() {
    const { telemetry, isLoading, refetch } = useDashboardData();

    // Transform unified telemetry into specialized administrative stats
    const stats = {
        finance: {
            revenue: telemetry?.revenue || 0,
            growth: telemetry?.growth || '+0%',
            transactions: telemetry?.transaction_count || 0,
            pending: telemetry?.pending_collections || 0
        },
        clinical: {
            patients: telemetry?.patient_count || 0,
            admissions: telemetry?.active_admissions || 0,
            appointments: telemetry?.upcoming_appointments || 0
        },
        health: '100% Operational'
    };

    return {
        stats,
        loading: isLoading,
        refresh: refetch
    };
}
