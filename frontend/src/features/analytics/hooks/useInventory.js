import { useState, useEffect, useCallback } from 'react';
import { inventoryService } from '@/features/analytics/api/inventoryService';

/**
 * 📦 Admin Inventory Hook
 * Encapsulates the high-fidelity state shards of the Global Resource Allocation matrix.
 */
export const useAdminInventory = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [itemsRes, catRes, logsRes] = await Promise.all([
                inventoryService.getAll(),
                inventoryService.getCategories(),
                inventoryService.getLogs()
            ]);
            
            setItems(itemsRes.results || itemsRes);
            setCategories(catRes.results || catRes);
            setLogs(logsRes.results || logsRes);
            setError(null);
        } catch (err) {
            setError('Global supply matrix synchronization failure.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { 
        items, 
        categories, 
        logs, 
        loading, 
        error, 
        refresh: fetchData 
    };
};

export default useAdminInventory;
