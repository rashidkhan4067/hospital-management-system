import { useState, useEffect, useCallback } from 'react';
import analyticsService from '@/features/analytics/api/analyticsService';

/**
 * 🛰️ useDashboardActivity
 * Consolidated logic for dashboard activity feed and system telemetry.
 */
export const useDashboardActivity = (refresh) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [auditLogs, setAuditLogs] = useState([]);

    const fetchAudit = useCallback(async () => {
        try {
            const audit = await analyticsService.getSystemAudit();
            setAuditLogs(audit.results?.slice(0, 6).map(l => ({
                title: l.event,
                time: new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                node: l.status,
                status: 'Success'
            })) || []);
        } catch (err) { console.warn('[Dashboard]: Activity fetch failed', err); }
    }, []);

    useEffect(() => {
        fetchAudit();
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        
        // Auto-refresh the main analytics if provided
        let autoRefresh;
        if (refresh) {
            autoRefresh = setInterval(() => refresh(), 45000);
        }

        return () => { 
            clearInterval(timer); 
            if (autoRefresh) clearInterval(autoRefresh); 
        };
    }, [refresh, fetchAudit]);

    return { currentTime, auditLogs, refreshAudit: fetchAudit };
};

export default useDashboardActivity;
