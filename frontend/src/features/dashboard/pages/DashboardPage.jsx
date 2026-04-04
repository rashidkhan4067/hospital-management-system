import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Stethoscope, TrendingUp, UserPlus, Plus } from 'lucide-react';

// ── Modals
import AddUserModal from '@/features/identity/components/AddUserModal';
import BookVisitModal from '@/features/appointments/components/BookVisitModal';

// ── Data Hooks
import { useAdminAnalytics } from '@/features/analytics/hooks/useAnalytics';
import analyticsService from '@/features/analytics/api/analyticsService';

// ── Layout & Shared UI
import AdminPage from '@/shared/components/layout/AdminPage';
import { PageHeader, Card, Button } from '@/shared/components/ui';
import UnifiedHeroCTA from '@/shared/components/common/UnifiedHeroCTA';

// ── Dashboard Feature Components
import MetricCards from '@/features/dashboard/components/MetricCards';
import TodaySummary from '@/features/dashboard/components/TodaySummary';
import SanaStats from '@/features/dashboard/components/SanaStats';
import DepartmentStats from '@/features/dashboard/components/DepartmentStats';
import TodayAppointments from '@/features/dashboard/components/TodayAppointments';
import OPDQueue from '@/features/dashboard/components/OPDQueue';
import RecentPatients from '@/features/dashboard/components/RecentPatients';
import StaffStatus from '@/features/dashboard/components/StaffStatus';
import ActivityFeed from '@/features/dashboard/components/ActivityFeed';
import WeeklyChart from '@/features/dashboard/components/WeeklyChart';
import DoctorStatus from '@/features/dashboard/components/DoctorsStatus';
import BedStatus from '@/features/dashboard/components/BedStatus';
import RevenueCard from '@/features/dashboard/components/RevenueCard';
import StockAlerts from '@/features/dashboard/components/StockAlerts';
import SystemHealthCard from '@/features/dashboard/components/SystemHealthCard';


/**
 * 🏥 Al Shifaa Admin Dashboard — Layout per image.png blueprint
 * 5-row structure: Header → Stats → Main → Widgets → Bottom
 */
export default function AdminDashboard({ propAppointments }) {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [auditLogs, setAuditLogs] = useState([]);
    const { pulse, clinicalTrends, financialTrends, loading, refresh } = useAdminAnalytics();

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

    // ── Fetch Audit / Activity ────────────────────────────────────────────────
    const fetchAudit = useCallback(async () => {
        try {
            const audit = await analyticsService.getSystemAudit();
            setAuditLogs(audit.results?.slice(0, 6).map(l => ({
                title: l.event,
                time: new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                node: l.status,
                status: 'Success'
            })) || []);
        } catch (err) { console.warn('[Dashboard]: Activity fetch failed', err); }
    }, []);

    useEffect(() => {
        fetchAudit();
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        const autoRefresh = setInterval(() => refresh(), 45000);
        return () => { clearInterval(timer); clearInterval(autoRefresh); };
    }, [refresh, fetchAudit]);

    // ── KPI Cards ────────────────────────────────────────────────────────────
    const kpiMetrics = useMemo(() => [
        { title: 'Total Patients', value: loading ? '...' : (pulse?.counts?.patients ?? 0).toLocaleString(), icon: <Users />, trend: pulse?.clinical?.delta || '+0.0%', trendType: 'up', onClick: () => navigate('/admin/patients') },
        { title: 'Active Doctors', value: loading ? '...' : (pulse?.counts?.doctors ?? 0).toLocaleString(), icon: <Stethoscope />, trend: 'Live', trendType: 'neutral', onClick: () => navigate('/admin/doctors') },
        { title: 'Daily Visits', value: loading ? '...' : (pulse?.counts?.appointments ?? 0).toLocaleString(), icon: <Calendar />, trend: 'Steady', trendType: 'up', onClick: () => navigate('/admin/appointments') },
        { title: 'Total Earnings', value: loading ? '...' : `Rs. ${(pulse?.financial?.net_revenue || 0).toLocaleString()}`, icon: <TrendingUp />, trend: pulse?.financial?.delta || 'Real-time', trendType: 'up', onClick: () => navigate('/admin/finances') },
    ], [pulse, loading, navigate]);

    // ── Chart Data ────────────────────────────────────────────────────────────
    const weeklyData = useMemo(() => {
        if (clinicalTrends?.length > 0) {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return clinicalTrends.slice(0, 7).reverse().map(d => ({
                name: days[new Date(d.date).getDay()] || 'D',
                value: d.total_patients
            }));
        }
        return [];
    }, [clinicalTrends]);

    return (
        <AdminPage>

         <div className={`flex flex-col gap-6 w-full -mt-2`}>
            {/* 🛸 COMMAND HUB: Row 1 — Header */}
            <PageHeader 
                title="Clinical Dashboard"
                subtitle={<>Welcome, <span className="text-accent-primary">{pulse?.user?.displayName?.split(' ')[0] || 'Administrator'}</span> • System Protocols Nominal</>}
                status="Live System"
                actions={
                    <div className="flex items-center gap-2">
                        <Button 
                            onClick={() => setIsVisitModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent-primary/90 hover:scale-105 transition-all shadow-lg shadow-accent-primary/25 border-none"
                        >
                            <Plus size={16} strokeWidth={3} /> New Appointment
                        </Button>
                    </div>
                }
            />

            {/* 🌠 PERSISTENT GREETING: Row 2 — Unified Hero CTA */}
            <UnifiedHeroCTA 
               compact
               title={<>Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{pulse?.user?.displayName?.split(' ')[0] || 'Administrator'}.</span></>}
               subtitle="Your clinical operations matrix for Al Shifaa is synchronized and ready for management. Performance metrics across all nodes are optimal."
               pillPrefix="Clinical Command Hub"
               pillIcon={Users}
               actions={[
                  { title: 'New Visit', subtitle: 'Book Patient', icon: Calendar, onClick: () => setIsVisitModalOpen(true) },
                  { title: 'Registry', subtitle: 'Add New Patient', icon: UserPlus, onClick: () => setIsUserModalOpen(true) }
               ]}
            />
            
            <MetricCards metrics={kpiMetrics} />
         </div>

            {/* ─── ROW 3: Operational Shards / Distribution ─────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mt-4">

                {/* Operational Shards & Section Distribution Matrix */}
                <div className="lg:col-span-6">
                    <TodaySummary pulse={pulse} loading={loading} />
                </div>

                {/* Sana Intelligence Shard — Intelligence Node */}
                <div className="lg:col-span-3">
                    <SanaStats onOpenChat={() => navigate('/admin/ai-agent/chats')} />
                </div>

                {/* Department Performance Matrix — Load Distribution Shard */}
                <div className="lg:col-span-3">
                    <DepartmentStats onNavigate={() => navigate('/admin/departments')} />
                </div>
            </div>

            {/* ─── ROW 3: Main Operational Hub ────────────────────────────────────── */}
            <div className="w-full">
                <TodayAppointments
                    appointments={propAppointments || []}
                    onViewPatient={(id) => navigate(`/admin/patients/${id}`)}
                    onViewAll={() => navigate('/admin/appointments')}
                />
            </div>

            {/* ─── ROW 4: Live Registry Lists — 3 Columns ───────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                <OPDQueue onNavigate={() => navigate('/admin/opd-queue')} />
                <RecentPatients onNavigate={() => navigate('/admin/patients')} />
                <StaffStatus onNavigate={() => navigate('/admin/staff')} />
            </div>

            {/* ─── ROW 5: Analytics & Activity ────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <WeeklyChart data={weeklyData} />
                    <DoctorStatus
                        doctors={[1, 2, 3, 4]}
                        onAddDoctor={() => navigate('/admin/doctors/add')}
                    />
                </div>
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <BedStatus onNavigate={() => navigate('/admin/wards')} />
                    <ActivityFeed logs={auditLogs} />
                </div>
            </div>

            {/* ─── ROW 6: Performance & Maintenance ───────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                <RevenueCard
                    pulse={pulse}
                    loading={loading}
                    onNavigate={() => navigate('/admin/billing')}
                />
                <StockAlerts onViewInventory={() => navigate('/admin/inventory')} />
                <SystemHealthCard onNavigate={() => navigate('/admin/settings/health')} />
            </div>

            {/* ─── System Status Pill (floating) ──────────────────────────── */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-full shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] z-50 items-center gap-10 hidden sm:flex">
                <div className="flex items-center gap-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-pulse shadow-[0_0_12px_var(--color-accent-primary)]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">System: Active</span>
                </div>
                <div className="w-px h-6 bg-slate-200 dark:bg-white/10" />
                <button onClick={refresh} className="text-[10px] font-black uppercase tracking-widest text-accent-primary hover:scale-110 transition-transform active:rotate-180 duration-500 border-none bg-transparent">
                    Refresh Data
                </button>
            </div>

            {/* ─── Modals ──────────────────────────────────────────────────── */}
            <AddUserModal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                onRefresh={refresh}
                initialRole="patient"
            />
            <BookVisitModal
                isOpen={isVisitModalOpen}
                onClose={() => setIsVisitModalOpen(false)}
                onRefresh={refresh}
            />
        </AdminPage>
    );
}
