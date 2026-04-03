import { useState, useEffect, useCallback } from 'react';
import { systemService } from '../../services/admin/managementService';

/**
 * 🎣 System Data Matrix Hook
 * Manages clinical units, alerts, and security nodes.
 */
export const useAdminSystem = () => {
    const [departments, setDepartments] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [auditLogs, setAuditLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const [deptData, alertData, logData] = await Promise.all([
                systemService.getDepartments(),
                systemService.getAlerts(),
                systemService.getAuditLogs()
            ]);
            setDepartments(deptData.results || deptData);
            setAlerts(alertData.results || alertData);
            setAuditLogs(logData.results || logData);
        } catch (error) {
            console.error('System Data Shard Synchronization Failure:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {
        departments,
        alerts,
        auditLogs,
        loading,
        refresh,
        createDepartment: (data) => systemService.createDepartment(data),
        updateDepartment: (id, data) => systemService.updateDepartment(id, data),
        createAlert: (data) => systemService.createAlert(data)
    };
};

