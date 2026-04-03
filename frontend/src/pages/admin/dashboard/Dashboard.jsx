import React, { useState, useEffect } from 'react';
import {
    Users,
    Calendar,
    Stethoscope,
    TrendingUp,
    UserPlus,
} from 'lucide-react';
import { Button, PageHeader } from '../../../components/ui';

// 🎣 CLINICAL DATA HOOKS
import { useAdminAnalytics } from '../../../hooks/admin/useAdminAnalytics';
import analyticsService from '../../../services/admin/AnalyticsService';

// 🏥 COMPONENT SHARDS (MODULAR ARCHITECTURE)
import MetricCards from '../../../components/features/admin/dashboard/MetricCards';
import AppointmentTrends from '../../../components/features/admin/dashboard/AppointmentTrends';
import RevenueFlux from '../../../components/features/admin/dashboard/RevenueFlux';
import DepartmentDistribution from '../../../components/features/admin/dashboard/DepartmentDistribution';
import OperatingProtocol from '../../../components/features/admin/dashboard/OperatingProtocol';
import SanaAICore from '../../../components/features/admin/dashboard/SanaAICore';
import AuditFlux from '../../../components/features/admin/dashboard/AuditFlux';
import OnDutyRegistry from '../../../components/features/admin/dashboard/OnDutyRegistry';

/**
 * 🏢 Elite Enterprise Admin Dashboard (Full Neural Sync)
 * Orchestrates high-fidelity data propagation across all modular visual shards.
 */
export default function AdminDashboard({ user }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [auditLogs, setAuditLogs] = useState([]);
    const { pulse, clinicalTrends, loading } = useAdminAnalytics();

    useEffect(() => {
        const fetchAudit = async () => {
            try {
                const audit = await analyticsService.getSystemAudit();
                setAuditLogs(audit.results?.slice(0, 4).map(l => ({
                    title: l.event,
                    time: new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    node: l.status,
                    status: 'Success'
                })) || []);
            } catch (err) { console.error("Audit Sync Fail", err); }
        };
        fetchAudit();
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // 🧬 KPI SHARDS - Connected to Live Clinical Matrix (Pulse Engine Shards)
    const kpiMetrics = [
        { 
            title: 'Registered Patients', 
            value: loading ? '...' : pulse?.counts?.patients ?? 0, 
            icon: <Users />, 
            trend: pulse?.clinical?.delta || '+0.0%', 
            trendType: 'up' 
        },
        { 
            title: 'Authorized Doctors', 
            value: loading ? '...' : pulse?.counts?.doctors ?? 0, 
            icon: <Stethoscope />, 
            trend: 'Live', 
            trendType: 'neutral' 
        },
        { 
            title: 'Scheduled Appts', 
            value: loading ? '...' : pulse?.counts?.appointments ?? 0, 
            icon: <Calendar />, 
            trend: 'Steady', 
            trendType: 'up' 
        },
        { 
            title: 'Net Revenue', 
            value: loading ? '...' : `$${(pulse?.financial?.net_revenue || 0).toLocaleString()}`, 
            icon: <TrendingUp />, 
            trend: pulse?.financial?.delta || 'Real-time', 
            trendType: 'up' 
        }
    ];

    // Map clinical trends for the graph
    const trendData = clinicalTrends?.length > 0 
        ? clinicalTrends.slice(0, 7).reverse().map(d => ({ 
            name: d.date?.split('-')[2] || 'D', 
            value: d.total_patients 
          })) 
        : [{ name: 'N/A', value: 0 }];

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-800 font-sans p-4 md:p-6 pb-24 max-w-[1700px] mx-auto overflow-x-hidden">
            <PageHeader 
                title="Command Hub Console" 
                subtitle="System Administration Interface L8"
                actions={
                    <div className="bg-white dark:bg-slate-800/40 p-1 rounded-xl border border-slate-200/40 flex items-center shadow-md backdrop-blur-xl shrink-0">
                        <Button className="bg-transparent hover:bg-accent-primary/10 text-slate-500 hover:text-accent-primary px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-none">
                            <UserPlus size={12} /> Registry
                        </Button>
                        <Button className="bg-transparent hover:bg-accent-primary/10 text-slate-500 hover:text-accent-primary px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-none">
                            <Calendar size={12} /> Console
                        </Button>
                    </div>
                }
            />

            <MetricCards metrics={kpiMetrics} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                <div className="lg:col-span-8 flex flex-col gap-6 w-full min-w-0">
                    <AppointmentTrends data={trendData} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <RevenueFlux />
                        <DepartmentDistribution />
                    </div>
                    <OperatingProtocol appointments={[]} />
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6 w-full min-w-0">
                    <SanaAICore />
                    <AuditFlux logs={auditLogs} />
                    <OnDutyRegistry doctors={[1, 2, 3, 4]} />
                </div>
            </div>
        </div>
    );
}
