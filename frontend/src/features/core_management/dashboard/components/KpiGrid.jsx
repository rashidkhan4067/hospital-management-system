import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Activity, DollarSign } from 'lucide-react';

import { KpiCard } from '@/components/primitives';
import { useDataStore } from '@/core/store/useDataStore';
import { useDashboardData } from '../hooks/useDashboardData';

/**
 * 📊 KpiGrid (Google UX Edition)
 * Implements "Deep-Link Intelligence" – propagating context via secure query signatures.
 */
const KpiGrid = () => {
    const navigate = useNavigate();
    const { telemetry, isLoading, filters } = useDashboardData();
    const setFilters = useDataStore(state => state.setFilters);

    const kpiMetrics = [
        { 
            id: 'patients', 
            type: 'growth', 
            title: "Total Patients", 
            value: telemetry.patients.total, 
            trend: telemetry.patients.trend, 
            isUp: telemetry.patients.isUp, 
            icon: Users,
            targetRange: 'Month'
        },
        { 
            id: 'appointments', 
            type: 'schedule', 
            title: "Appointments Today", 
            value: telemetry.appointments.total, 
            trend: telemetry.appointments.trend, 
            isUp: telemetry.appointments.isUp, 
            icon: Calendar,
            targetRange: 'Today'
        },
        { 
            id: 'revenue', 
            type: 'finance', 
            title: "Revenue Today", 
            value: telemetry.revenue.total, 
            trend: telemetry.revenue.trend, 
            isUp: telemetry.revenue.isUp, 
            icon: DollarSign,
            targetRange: 'Today'
        },
        { 
            id: 'occupancy', 
            type: 'distribution', 
            title: "Practitioner Load", 
            value: telemetry.doctors.total, 
            trend: telemetry.doctors.trend, 
            isUp: telemetry.doctors.isUp, 
            icon: Activity,
            targetRange: 'Today'
        }
    ];

    /**
     * 🧠 Strategic Drill-Down (UX Architecture)
     * Propagates both temporal (Range) and categorical (Type) context to analytics.
     */
    const handleAction = (kpi) => {
        const queryParams = new URLSearchParams({
            range: kpi.targetRange,
            unit: filters.department || 'All',
            type: kpi.type
        });

        // 🧠 Strategic Routing Logic: Operational vs Analytical
        if (kpi.type === 'schedule') {
             // Route to the tactical registry for immediate operational triage
             navigate(`/admin/appointments?${queryParams.toString()}`);
        } else {
             // Route to the diagnostic plane for high-level data partitioning
             navigate(`/admin/analytics?${queryParams.toString()}`);
        }

        // Synchronize Global Store with the navigation context
        setFilters({ 
            dateRange: kpi.targetRange,
            department: filters.department
        });
    };

    if (isLoading) {
        return (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-40 bg-surface-variant/20 animate-pulse rounded-[32px]" />
                ))}
            </section>
        );
    }

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {kpiMetrics.map((kpi, idx) => (
                <div key={kpi.id}>
                    <KpiCard 
                        {...kpi} 
                        delay={idx * 0.1}
                        variant="surface"
                        onClick={() => handleAction(kpi)}
                    />
                </div>
            ))}
        </section>
    );
};

export default KpiGrid;
