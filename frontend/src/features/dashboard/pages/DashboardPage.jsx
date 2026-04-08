import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Users, Calendar, UserPlus, Plus } from 'lucide-react';

// ── Modals
import AddUserModal from '@/features/identity/components/AddUserModal';
import BookVisitModal from '@/features/appointments/components/BookVisitModal';

// ── Data Hooks
import { useAdminAnalytics } from '@/features/analytics/hooks/useAnalytics';
import { useDashboardActivity } from '@/features/dashboard/hooks/useDashboardActivity';
import { useRevenueData } from '@/features/dashboard/hooks/useRevenueData';

// ── Layout & Shared UI
import { AdminPage } from '@/layouts';
import { PageHeader, Button } from '@/components/primitives';
import { UnifiedHeroCTA } from '@/components/composed';

// ── Dashboard Feature Components
import OperationalShards from '@/features/dashboard/components/OperationalShards';
import RevenueChart from '@/features/dashboard/components/RevenueChart';
import SanaStats from '@/features/dashboard/components/SanaStats';
import DepartmentStats from '@/features/dashboard/components/DepartmentStats';
import PatientTrends from '@/features/dashboard/components/PatientTrends';
import TodaysAppointments from '@/features/appointments/components/TodaysAppointments';
import OPDQueue from '@/features/opd/components/OPDQueue';
import RecentPatients from '@/features/patients/components/RecentPatients';
import ClinicalStaff from '@/features/staff/components/ClinicalStaff';
import WeeklyChart from '@/features/analytics/components/WeeklyChart';
import ActivePersonnel from '@/features/staff/components/ActivePersonnel/ActivePersonnel';
import BedStatus from '@/features/wards/components/BedStatus';
import ActivityFeed from '@/features/dashboard/components/ActivityFeed/ActivityFeed';
import RevenueCard from '@/features/dashboard/components/RevenueCard';
import StockAlerts from '@/features/dashboard/components/StockAlerts';
import SystemHealthCard from '@/features/dashboard/components/SystemHealthCard';

/**
 * 🏥 Al Shifaa Admin Dashboard
 * High-fidelity Command Center with Synchronized Feature Hubs.
 */
export default function AdminDashboard({ propAppointments }) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentDept = searchParams.get('dept') || 'All';
    
    const { pulse, clinicalTrends, loading: analyticsLoading, refresh } = useAdminAnalytics();
    const { auditLogs } = useDashboardActivity(refresh);
    
    // 🛰️ Synchronized Time Context & Telemetry Sync
    const [viewMode, setViewMode] = useState('7d');
    const [isSyncActive, setIsSyncActive] = useState(true);
    const { revenueData, loading: revenueLoading, error: revenueError } = useRevenueData(viewMode === '7d' ? '7days' : 'month');

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);




    return (
        <AdminPage>
            <div className={`flex flex-col gap-6 w-full -mt-2`}>
                {/* 🛸 COMMAND HUB: Header */}
                <PageHeader 
                    title="Clinical Dashboard"
                    subtitle={<>Welcome, <span className="text-accent-primary">{pulse?.user?.displayName?.split(' ')[0] || 'Administrator'}</span> • Protocols Nominal</>}
                    status="Live System"
                    actions={
                        <div className="flex items-center gap-4">
                            {/* 🛰️ Live Sync Trigger */}
                            <button 
                                onClick={() => setIsSyncActive(!isSyncActive)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${
                                    isSyncActive 
                                    ? 'bg-accent-primary/10 border-accent-primary/30 text-accent-primary shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                                    : 'bg-white/5 border-white/10 text-white/30'
                                }`}
                            >
                                <div className={`w-1.5 h-1.5 rounded-full ${isSyncActive ? 'bg-accent-primary animate-pulse' : 'bg-white/20'}`} />
                                Sync {isSyncActive ? 'Active' : 'Offline'}
                            </button>

                            <select 
                                value={currentDept}
                                onChange={(e) => setSearchParams({ dept: e.target.value })}
                                className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest outline-none transition-all cursor-pointer"
                            >
                                <option value="All">All Nodes</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Neurology">Neurology</option>
                            </select>
                            <Button 
                                onClick={() => setIsVisitModalOpen(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent-primary/90 transition-all border-none shadow-lg shadow-accent-primary/25"
                            >
                                <Plus size={16} strokeWidth={3} /> New Visit
                            </Button>
                        </div>
                    }
                />

                {/* 🌠 PERSISTENT GREETING: Hero CTA */}
                <UnifiedHeroCTA 
                    compact
                    title={<>Good {new Date().getHours() < 12 ? 'Morning' : 'Day'}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{pulse?.user?.displayName?.split(' ')[0] || 'Admin'}.</span></>}
                    subtitle="System synchronized. All clinical telemetry pipelines are operational."
                    pillPrefix="Command Hub"
                    pillIcon={Users}
                    actions={[
                        { title: 'New Visit', subtitle: 'Book Patient', icon: Calendar, onClick: () => setIsVisitModalOpen(true) },
                        { title: 'Registry', subtitle: 'Add New Patient', icon: UserPlus, onClick: () => setIsUserModalOpen(true) }
                    ]}
                />
                
                {/* 📊 LIVE OPERATIONAL SHARDS: Row 2 */}
                <OperationalShards isSyncActive={isSyncActive} />
            </div>

            {/* ── Unified Intelligence Matrix — High-Density Operational Flow ─────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 w-full mt-6 items-start">
                
                {/* ── Left Column: Trends (Wide) ── */}
                <div className="xl:col-span-8 space-y-8 flex flex-col">
                    <PatientTrends 
                        viewMode={viewMode}
                        onRangeChange={setViewMode}
                        onViewStats={() => navigate('/admin/analytics')} 
                    />
                    <RevenueChart 
                        range={viewMode === '7d' ? '7 Days' : 'Monthly'}
                        data={revenueData} 
                        loading={revenueLoading}
                        error={revenueError}
                        onViewFinances={() => navigate('/admin/billing')}
                    />
                </div>

                {/* ── Right Column: Status Matrix (Compact) ── */}
                <div className="xl:col-span-4 space-y-8 flex flex-col">
                    <SanaStats onOpenChat={() => navigate('/admin/ai-agent/chats')} />
                    <DepartmentStats onNavigate={() => navigate('/admin/departments')} />
                </div>
            </div>

            {/* 📋 Clinical Schedule Matrix */}
            <div className="w-full mt-6">
                <TodaysAppointments />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
                <OPDQueue />
                <RecentPatients isSyncActive={isSyncActive} />
                <ClinicalStaff />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mt-6">
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <WeeklyChart />
                    <ActivePersonnel />
                </div>
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <BedStatus />
                    <ActivityFeed />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-6">
                <RevenueCard pulse={pulse} loading={analyticsLoading} onNavigate={() => navigate('/admin/billing')} />
                <StockAlerts onViewInventory={() => navigate('/admin/inventory')} />
                <SystemHealthCard onNavigate={() => navigate('/admin/settings/health')} />
            </div>

            {/* ── System Status Pill ── */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-full shadow-2xl z-50 items-center gap-10 hidden sm:flex">
                <div className="flex items-center gap-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-pulse shadow-[0_0_12px_var(--color-accent-primary)]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">System: Active</span>
                </div>
                <div className="w-px h-6 bg-slate-200 dark:bg-white/10" />
                <button onClick={refresh} className="text-[10px] font-black uppercase tracking-widest text-accent-primary hover:scale-110 transition-transform active:rotate-180 duration-500 border-none bg-transparent cursor-pointer">
                    Sync Matrix
                </button>
            </div>

            {/* ── Modals ── */}
            <AddUserModal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} onRefresh={refresh} initialRole="patient" />
            <BookVisitModal isOpen={isVisitModalOpen} onClose={() => setIsVisitModalOpen(false)} onRefresh={refresh} />
        </AdminPage>
    );
}
