import React, { useState, useEffect } from 'react';
import {
    Users,
    Calendar,
    Stethoscope,
    CreditCard,
    TrendingUp,
    UserPlus,
    Receipt,
} from 'lucide-react';
import { Button, PageHeader } from '../../components/ui';

// 🎣 CLINICAL DATA HOOKS
import { useAdminStats } from '../../hooks/admin/useAdminStats';

// 🏥 COMPONENT SHARDS (MODULAR ARCHITECTURE)
import MetricCards from '../../components/features/admin/dashboard/MetricCards';
import AppointmentTrends from '../../components/features/admin/dashboard/AppointmentTrends';
import RevenueFlux from '../../components/features/admin/dashboard/RevenueFlux';
import DepartmentDistribution from '../../components/features/admin/dashboard/DepartmentDistribution';
import OperatingProtocol from '../../components/features/admin/dashboard/OperatingProtocol';
import SanaAICore from '../../components/features/admin/dashboard/SanaAICore';
import AuditFlux from '../../components/features/admin/dashboard/AuditFlux';
import OnDutyRegistry from '../../components/features/admin/dashboard/OnDutyRegistry';

/**
 * 🏢 Elite Enterprise Admin Dashboard (Refactored for Scalability)
 * Orchestrates the dashboard lifecycle by distributing data to modular visual shards.
 */
export default function AdminDashboard({ user }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const { stats, loading, error } = useAdminStats();

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // 🧬 KPI SHARDS - Connected to Live Clinical Matrix
    const kpiMetrics = [
        { 
            title: 'Registered Patients', 
            value: loading ? '...' : stats?.counts?.patients ?? 0, 
            icon: <Users />, 
            trend: '+12.5%', 
            trendType: 'up' 
        },
        { 
            title: 'Authorized Doctors', 
            value: loading ? '...' : stats?.counts?.doctors ?? 0, 
            icon: <Stethoscope />, 
            trend: 'Live', 
            trendType: 'neutral' 
        },
        { 
            title: 'Scheduled Appts', 
            value: loading ? '...' : stats?.counts?.appointments ?? 0, 
            icon: <Calendar />, 
            trend: 'Steady', 
            trendType: 'up' 
        },
        { 
            title: 'Net Revenue', 
            value: loading ? '...' : `$${(stats?.finance?.net_revenue || 0).toLocaleString()}`, 
            icon: <TrendingUp />, 
            trend: 'Real-time', 
            trendType: 'up' 
        }
    ];

    const currentAppointments = [
        { name: 'Ellen Ripley', type: 'Clinical Xenon-Scan', time: '11:30 AM', status: 'In-Session' },
        { name: 'Sarah Connor', type: 'Cybernetic Assessment', time: '12:15 PM', status: 'Waiting' },
        { name: 'Roy Batty', type: 'Replicant DNA Shard', time: '01:00 PM', status: 'Pending' }
    ];

    const logs = [
        { title: 'Identity Propagation', time: '4m ago', node: 'Gate-01', status: 'Success' },
        { title: 'Billing Shard Synced', time: '12m ago', node: 'Finance', status: 'Success' },
        { title: 'Neural Record Up', time: '24m ago', node: 'Medical', status: 'Pending' },
        { title: 'System Heartbeat (v2)', time: '1h ago', node: 'Kernel', status: 'Success' }
    ];

    const activeDocs = [1, 2, 3, 4, 5, 6];

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

            {/* 📉 KPI SHARDS (Optimized spacing) */}
            <MetricCards metrics={kpiMetrics} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                {/* PRIMARY LANE - OPs (Width 66%) */}
                <div className="lg:col-span-8 flex flex-col gap-6 w-full min-w-0">
                    <AppointmentTrends data={[{ name: 'Mon', value: 42 }, { name: 'Tue', value: 58 }, { name: 'Wed', value: 39 }, { name: 'Thu', value: 72 }, { name: 'Fri', value: 65 }, { name: 'Sat', value: 48 }, { name: 'Sun', value: 25 }]} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <RevenueFlux />
                        <DepartmentDistribution />
                    </div>

                    <OperatingProtocol appointments={currentAppointments} />
                </div>

                {/* INTELLIGENCE LANE - COMPACT (Width 33%) */}
                <div className="lg:col-span-4 flex flex-col gap-6 w-full min-w-0">
                    <SanaAICore />
                    <AuditFlux logs={logs} />
                    <OnDutyRegistry doctors={activeDocs} />
                </div>
            </div>
        </div>
    );
}
