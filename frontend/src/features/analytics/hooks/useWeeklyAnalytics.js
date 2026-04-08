import { useQuery } from '@tanstack/react-query';
import analyticsService from '../../../services/modules/analyticsService';

/**
 * 📉 Custom Hook: useWeeklyAnalytics
 * Orchestrates the retrieval and analytical processing of weekly visit volume.
 * Implements architectural isolation of business logic for trend calculation.
 */
export const useWeeklyAnalytics = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['analytics', 'weekly-visits'],
        queryFn: () => analyticsService.getWeeklyVisitStats(),
        staleTime: 300000, // 5 minute cache
    });

    /**
     * 🧠 DATA TRANSFORMATION MATRIX
     * Normalizes chronological nodes into chart-ready daily deltas.
     */
    const chartData = (data || []).slice(0, 7).reverse().map(d => {
        const date = new Date(d.date);
        const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return {
            name: labels[date.getDay()],
            visits: d.total_patients || 0,
            date: d.date
        };
    });

    // ── Analytical KPIs ───────────────────────────────────────────────
    
    /**
     * 🔢 Calculation node: Total Weekly visits
     */
    const totalVisits = chartData.reduce((sum, day) => sum + day.visits, 0);

    /**
     * 📊 Finding the peak operational period
     */
    const getBusiestDay = () => {
        if (chartData.length === 0) return 'N/A';
        const busiest = [...chartData].sort((a, b) => b.visits - a.visits)[0];
        return busiest.name.toUpperCase();
    };

    return {
        chartData,
        totalVisits,
        busiestDay: getBusiestDay(),
        isLoading,
        error
    };
};
