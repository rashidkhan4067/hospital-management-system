import { useState, useEffect, useCallback } from 'react';
import { doctorService } from '../../services/doctorService';

/**
 * 🩺 ADMIN DOCTOR HOOK
 * Encourages separation of concerns by encapsulating clinical faculty orchestration and load states.
 */
export const useAdminDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDoctors = useCallback(async () => {
        setLoading(true);
        try {
            const response = await doctorService.getAll();
            // Handle if response is paginated { results: [...] } or a raw array
            setDoctors(response.results || response);
            setError(null);
        } catch (err) {
            setError('System could not propagate doctor faculty shards.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors]);

    return { 
        doctors, 
        loading, 
        error, 
        refresh: fetchDoctors 
    };
};

export default useAdminDoctors;
