import { useState, useEffect, useCallback } from 'react';
import api from '../../services/apiClient';

/**
 * 📅 ADMIN APPOINTMENT HOOK
 * Enforces real-time clinical scheduling propagation for the administrative hub.
 */
export const useAdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAppointments = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/appointments/');
            setAppointments(response.data.results || response.data);
            setError(null);
        } catch (err) {
            setError('System could not propagate scheduling shards.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    return { 
        appointments, 
        loading, 
        error, 
        refresh: fetchAppointments 
    };
};

export default useAdminAppointments;
