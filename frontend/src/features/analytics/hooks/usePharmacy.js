import { useState, useEffect, useCallback } from 'react';
import PharmacyService from '@/features/analytics/api/pharmacyService';

/**
 * ⚡ ADMIN PHARMACY HOOK
 * Encourages separation of concerns by encapsulating stock orchestration and load states.
 */
export const useAdminPharmacy = () => {
    const [inventory, setInventory] = useState([]);
    const [criticalItems, setCriticalItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPharmacyData = useCallback(async () => {
        setLoading(true);
        try {
            const [inventoryData, criticalData] = await Promise.all([
                PharmacyService.getInventory(),
                PharmacyService.getCriticalStock()
            ]);
            
            setInventory(inventoryData.results || inventoryData);
            setCriticalItems(criticalData);
            setError(null);
        } catch (err) {
            setError('System could not propagate pharmacy stock shards.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPharmacyData();
    }, [fetchPharmacyData]);

    return { 
        inventory, 
        criticalItems, 
        loading, 
        error, 
        refresh: fetchPharmacyData 
    };
};

export default useAdminPharmacy;
