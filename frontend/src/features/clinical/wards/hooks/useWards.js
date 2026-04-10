import { useState, useEffect, useCallback } from 'react';
import api from '@/core/api/services/apiClient';

/**
 * 🏥 WARD SYSTEM HOOK
 * Orchestrates clinical bed allocation and spatial telemetry.
 */
export const useWards = () => {
    const [data, setData] = useState({
        overview: null,
        by_type: [],
        ward_matrix: [],
        admissions: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('wards/wards/stats/');
            setData(res.data);
            setError(null);
        } catch (err) {
            setError('Could not establish synchronization with the Ward Matrix.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { 
        ...data, 
        loading, 
        error, 
        refresh: fetchData 
    };
};

