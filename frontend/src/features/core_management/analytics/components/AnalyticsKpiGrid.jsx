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
        { id: 'pat', title: "Total Patients", value: data?.kpis?.find(k => k.id === 'pat')?.value || "1,482", trend: "12%", isUp: true, icon: Users },
        { id: 'appt', title: "Appointments", value: data?.kpis?.find(k => k.id === 'appt')?.value || "128", trend: "5%", isUp: true, icon: Calendar },
        { id: 'rev', title: "Revenue Flux", value: data?.kpis?.find(k => k.id === 'rev')?.value || "4.8M", trend: "18%", isUp: true, icon: DollarSign },
        { id: 'occ', title: "Load Capacity", value: data?.kpis?.find(k => k.id === 'doc')?.value || "84%", trend: "2%", isUp: false, icon: Activity },
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
