import { useState, useEffect, useCallback } from 'react';
import { wardsService } from '@/features/clinical/wards/api/wardsService';
import { systemService } from '@/features/system/management/api/managementService'; // Still need departments

/**
 * 🎣 Ward & Bed Topology Hook
 * Manages clinical accommodation shards.
 */
export const useWardManagement = () => {
    const [wards, setWards] = useState([]);
    const [beds, setBeds] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshWards = useCallback(async (params = {}) => {
        setLoading(true);
        try {
            const data = await wardsService.getWards(params);
            setWards(data.results || data);
        } catch (error) {
            console.error('Ward Shard Synchronization Failure:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshBeds = useCallback(async (params = {}) => {
        setLoading(true);
        try {
            const data = await wardsService.getBeds(params);
            setBeds(data.results || data);
        } catch (error) {
            console.error('Bed Shard Synchronization Failure:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchInitialData = useCallback(async () => {
        setLoading(true);
        try {
            const [wardData, deptData] = await Promise.all([
                wardsService.getWards(),
                systemService.getDepartments()
            ]);
            setWards(wardData.results || wardData);
            setDepartments(deptData.results || deptData);
        } catch (error) {
            console.error('Initial Ward Data Fetch Failure:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    return {
        wards,
        beds,
        departments,
        loading,
        refreshWards,
        refreshBeds,
        createWard: (data) => wardsService.createWard(data),
        updateWard: (id, data) => wardsService.updateWard(id, data),
        deleteWard: (id) => wardsService.deleteWard(id),
        createBed: (data) => wardsService.createBed(data),
        updateBed: (id, data) => wardsService.updateBed(id, data),
        deleteBed: (id) => wardsService.deleteBed(id)
    };
};

