import { useState, useEffect, useCallback } from 'react';
import api from '../../services/apiClient';

/**
 * 🏢 ADMIN USER HOOK
 * Encourages separation of concerns by encapsulating global identity orchestration and load states.
 */
export const useAdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/auth/users/');
            setUsers(response.data.results || response.data);
            setError(null);
        } catch (err) {
            setError('System could not propagate identity matrix.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { 
        users, 
        loading, 
        error, 
        refresh: fetchUsers 
    };
};

export default useAdminUsers;
