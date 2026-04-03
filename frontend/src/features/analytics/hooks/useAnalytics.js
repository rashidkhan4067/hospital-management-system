import { useState, useEffect, useCallback } from 'react';
import AnalyticsService from '@/features/analytics/api/analyticsService';

/**
 * ⚡ ADMIN ANALYTICS HOOK
 * Encourages separation of concerns by encapsulating complex aggregation and load states.
 */
export const useAdminAnalytics = () => {
    const [clinicalTrends, setClinicalTrends] = useState([]);
    const [financialTrends, setFinancialTrends] = useState([]);
    const [pulse, setPulse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAnalytics = useCallback(async () => {
        setLoading(true);
        try {
            const [clinical, financial, pulseData] = await Promise.all([
                AnalyticsService.getClinicalTrends(),
                AnalyticsService.getFinancialTrends(),
                AnalyticsService.getGlobalPulse()
            ]);
            
            setClinicalTrends(clinical.results || clinical);
            setFinancialTrends(financial.results || financial);
            setPulse(pulseData);
            setError(null);
        } catch (err) {
            setError('System could not propagate analytics shards.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    return { 
        clinicalTrends, 
        financialTrends, 
        pulse, 
        loading, 
        error, 
        refresh: fetchAnalytics 
    };
};

export default useAdminAnalytics;
