import { useState, useEffect, useCallback } from 'react';
import api from '@/core/api/apiClient';
import appointmentService from '../api/appointmentService';

/**
 * 📅 ADMIN APPOINTMENT HOOK
 * Enforces real-time clinical scheduling propagation for the administrative hub.
 */
export const useAdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [apptsRes, statsRes] = await Promise.all([
                api.get('/appointments/'),
                appointmentService.getStats()
            ]);
            setAppointments(apptsRes.data.results || apptsRes.data);
            setStats(statsRes);
            setError(null);
        } catch (err) {
            setError('System could not propagate scheduling shards.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { 
        appointments, 
        stats,
        loading, 
        error, 
        refresh: fetchData 
    };
};


/**
 * 📋 OPD QUEUE HOOK
 * Specifically tuned for the real-time patient flow matrix.
 */
export const useOPDQueue = () => {
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQueue = useCallback(async () => {
        setLoading(true);
        try {
            const data = await appointmentService.getQueue();
            setQueue(data.results || data);
            setError(null);
        } catch (err) {
            setError('Could not synchronize OPD queue matrix.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchQueue();
        const poll = setInterval(fetchQueue, 60000);
        return () => clearInterval(poll);
    }, [fetchQueue]);

    return { 
        queue, 
        loading, 
        error, 
        refresh: fetchQueue 
    };
};

/**
 * 🏥 APPOINTMENT OPERATIONS HOOK
 * Reusable logic for viewing details and updating appointment status.
 */
export const useAppointmentOperations = (refresh, addNotification) => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleStatusUpdate = async (appt, status) => {
        try {
            await appointmentService.update(appt.id, { status });
            addNotification('Pulse Synchronized', `Patient status migrated to ${status.toUpperCase()} node.`, 'success');
            if (refresh) refresh();
        } catch (err) {
            addNotification('Matrix Error', 'Failed to update patient node in clinical queue.', 'error');
        }
    };

    const handleViewDetail = (appt) => {
        setSelectedAppointment(appt);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedAppointment(null);
    };

    return {
        selectedAppointment,
        isDrawerOpen,
        handleStatusUpdate,
        handleViewDetail,
        handleCloseDrawer,
    };
};

export default useAdminAppointments;
