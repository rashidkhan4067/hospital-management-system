import React from 'react';
import { Users, Calendar, DollarSign, Activity } from 'lucide-react';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { KpiCard } from '@/components/primitives';

/**
 * 📈 AnalyticsGrid (Architectural Pattern)
 * Fully composed of shared primitives and centralized telemetry.
 */
const AnalyticsGrid = ({ isLoading }) => {
    const { data } = useAnalyticsData();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="min-h-[160px] bg-surface-bright/50 animate-pulse rounded-[32px] border border-outline/10" />
                ))}
            </div>
        );
    }

    const kpis = [
        { id: 'pat', title: "Total Patients", ...data?.kpis?.find(k => k.id === 'pat'), icon: Users },
        { id: 'appt', title: "Appointments", ...data?.kpis?.find(k => k.id === 'appt'), icon: Calendar },
        { id: 'rev', title: "Revenue Flux", ...data?.kpis?.find(k => k.id === 'rev'), icon: DollarSign },
        { id: 'doc', title: "Resource Pulse", ...data?.kpis?.find(k => k.id === 'doc'), icon: Activity },
    ];

    return (
        <section className="col-span-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi, idx) => (
                    <KpiCard 
                        key={kpi.id} 
                        {...kpi} 
                        delay={idx * 0.05} 
                    />
                ))}
            </div>
        </section>
    );
};

export default AnalyticsGrid;
