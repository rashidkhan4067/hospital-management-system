import { useState, useEffect, useCallback } from 'react';
import api from '@/core/api/apiClient';

/**
 * 👥 useAdminPatients (Clinical Identity Provider)
 * High-fidelity hook for orchestrating patient registry shards across the HMS.
 */
export function useAdminPatients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            // Fetching institutional patient registry
            const res = await api.get('/patients/profiles/');
            // Backend returns a list of patient profile shards
            setPatients(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Institutional Patient Retrieval Error:", err);
            setPatients([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { 
        patients, 
        loading, 
        refresh,
        // Helper: Find a specific subject by identity shard
        findPatient: (id) => patients.find(p => p.id === id)
    };
}
