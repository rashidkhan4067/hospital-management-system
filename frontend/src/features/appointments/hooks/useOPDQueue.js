import { useState, useEffect, useCallback } from 'react';
import appointmentService from '../api/appointmentService';

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
        
        // Potential for real-time polling every 60 seconds
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
