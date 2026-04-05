import { useState, useEffect, useCallback } from 'react';
import { doctorService } from '@/features/doctors/api/doctorService';

/**
 * 🩺 ADMIN DOCTOR HOOK
 * Encourages separation of concerns by encapsulating clinical faculty orchestration and load states.
 */
export const useAdminDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [doctorsRes, statsRes] = await Promise.all([
                doctorService.getAll(),
                doctorService.getStats()
            ]);
            setDoctors(doctorsRes.results || doctorsRes);
            setStats(statsRes);
            setError(null);
        } catch (err) {
            setError('System could not propagate doctor faculty shards.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { 
        doctors, 
        stats,
        loading, 
        error, 
        refresh: fetchData 
    };
};

export default useAdminDoctors;
