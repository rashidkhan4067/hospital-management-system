import { useState, useEffect, useCallback } from 'react';
import LaboratoryService from '../../services/admin/LaboratoryService';

/**
 * ⚡ ADMIN LABORATORY HOOK
 * Encourages separation of concerns by encapsulating diagnostic orchestration and load states.
 */
export const useAdminLab = () => {
    const [tests, setTests] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLabData = useCallback(async () => {
        setLoading(true);
        try {
            const [testsData, resultsData] = await Promise.all([
                LaboratoryService.getTests(),
                LaboratoryService.getResults()
            ]);
            
            setTests(testsData.results || testsData);
            setResults(resultsData.results || resultsData);
            setError(null);
        } catch (err) {
            setError('System could not propagate laboratory diagnostic shards.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLabData();
    }, [fetchLabData]);

    return { 
        tests, 
        results, 
        loading, 
        error, 
        refresh: fetchLabData 
    };
};

export default useAdminLab;
