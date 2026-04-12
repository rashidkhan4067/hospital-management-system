import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, DollarSign } from 'lucide-react';

import { KpiCard } from '@/components/primitives';
import { KpiCardSkeleton } from '@/components/primitives/Skeleton';
import { useDataStore } from '@/core/store/useDataStore';
import { useDashboardData } from '../hooks/useDashboardData';
import BedOccupancyKpi from './BedOccupancyKpi';

/**
 * 📊 KpiGrid (M3 Enterprise — Fixed Grid)
 *
 * Fixes applied:
 * ─ Skeleton retains grid shape during loading (no layout collapse/CLS)
 * ─ KpiCardSkeleton has matching min-height to actual card
 * ─ aria-label on section for screen-reader context
 * ─ Consistent gap-6 (MD3 8px multiples: 24px)
 * ─ Removed wrapping <div> around each card (was breaking grid stretch)
 * ─ Deep-link navigation preserved
 */
const KpiGrid = () => {
    const navigate    = useNavigate();
    const { telemetry, isLoading, filters } = useDashboardData();
    const setFilters  = useDataStore(state => state.setFilters);

    const kpiMetrics = [
        {
            id: 'patients',
            type: 'growth',
            title: 'Total Patients',
            value: telemetry.patients.total,
            trend: telemetry.patients.trend,
            isUp: telemetry.patients.isUp,
            icon: Users,
            targetRange: 'Month',
        },
        {
            id: 'appointments',
            type: 'schedule',
            title: 'Appointments Today',
            value: telemetry.appointments.total,
            trend: telemetry.appointments.trend,
            isUp: telemetry.appointments.isUp,
            icon: Calendar,
            targetRange: 'Today',
        },
        {
            id: 'revenue',
            type: 'finance',
            title: 'Revenue Today',
            value: telemetry.revenue.total,
            trend: telemetry.revenue.trend,
            isUp: telemetry.revenue.isUp,
            icon: DollarSign,
            targetRange: 'Today',
        },
    ];

    const handleAction = (kpi) => {
        const queryParams = new URLSearchParams({
            range: kpi.targetRange,
            unit:  filters.department || 'All',
            type:  kpi.type,
        });
        if (kpi.type === 'schedule') {
            navigate(`/admin/appointments?${queryParams}`);
        } else {
            navigate(`/admin/analytics?${queryParams}`);
        }
        setFilters({ dateRange: kpi.targetRange, department: filters.department });
    };

    if (isLoading) {
        return (
            <section
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                aria-label="KPI metrics loading"
                aria-busy="true"
            >
                {[0, 1, 2, 3].map(i => <KpiCardSkeleton key={i} />)}
            </section>
        );
    }

    return (
        <section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            aria-label="Key performance indicators"
        >
            {kpiMetrics.map((kpi, idx) => (
                <KpiCard
                    key={kpi.id}
                    {...kpi}
                    delay={idx * 0.08}
                    variant="surface"
                    onClick={() => handleAction(kpi)}
                />
            ))}
            <BedOccupancyKpi />
        </section>
    );
};

export default KpiGrid;
