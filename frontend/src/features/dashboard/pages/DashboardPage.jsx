import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    Calendar,
    Stethoscope,
    TrendingUp,
    UserPlus,
} from 'lucide-react';
import { Button, PageHeader } from '@/shared/components/ui';

// 🏥 QUICK ACTIONS
import AddUserModal from '@/features/identity/components/AddUserModal';
import BookVisitModal from '@/features/appointments/components/BookVisitModal';

// 🎣 CLINICAL DATA HOOKS & SERVICES
import { useAdminAnalytics } from '@/features/analytics/hooks/useAnalytics';
import analyticsService from '@/features/analytics/api/analyticsService';

// 🏢 DASHBOARD COMPONENTS
import AdminPage from '@/shared/components/layout/AdminPage';
import MetricCards from '@/features/dashboard/components/MetricCards';
import PatientTrends from '@/features/dashboard/components/PatientTrends'; 
import RevenueChart from '@/features/dashboard/components/RevenueChart';
import DepartmentStats from '@/features/dashboard/components/DepartmentStats';
import LiveAppointments from '@/features/dashboard/components/LiveAppointments';
import AIAssistant from '@/features/dashboard/components/AIAssistant';
import SystemPulse from '@/features/dashboard/components/SystemPulse';
import DoctorStatus from '@/features/dashboard/components/DoctorsStatus';
import StockAlerts from '@/features/dashboard/components/StockAlerts'; 

/**
 * 🏢 Admin Dashboard
 * Main hospital management screen.
 */
export default function AdminDashboard({ propAppointments }) {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [auditLogs, setAuditLogs] = useState([]);
    const { pulse, clinicalTrends, financialTrends, loading, refresh } = useAdminAnalytics();

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

    // Fetch Recent Activity
    const fetchAudit = useCallback(async () => {
        try {
            const audit = await analyticsService.getSystemAudit();
            setAuditLogs(audit.results?.slice(0, 4).map(l => ({
                title: l.event,
                time: new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                node: l.status,
                status: 'Success'
            })) || []);
        } catch (err) { 
            console.warn("[Dashboard]: Activity Fetch Failed", err); 
        }
    }, []);

    useEffect(() => {
        fetchAudit();
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        const autoRefresh = setInterval(() => refresh(), 45000); 

        return () => {
            clearInterval(timer);
            clearInterval(autoRefresh);
        };
    }, [refresh, fetchAudit]);

    // Stats for Dashboard
    const kpiMetrics = useMemo(() => [
        { 
            title: 'Total Patients', 
            value: loading ? '...' : (pulse?.counts?.patients ?? 0).toLocaleString(), 
            icon: <Users />, 
            trend: pulse?.clinical?.delta || '+0.0%', 
            trendType: 'up',
            onClick: () => navigate('/admin/patients')
        },
        { 
            title: 'Active Doctors', 
            value: loading ? '...' : (pulse?.counts?.doctors ?? 0).toLocaleString(), 
            icon: <Stethoscope />, 
            trend: 'Live', 
            trendType: 'neutral',
            onClick: () => navigate('/admin/doctors')
        },
        { 
            title: 'Daily Visits', 
            value: loading ? '...' : (pulse?.counts?.appointments ?? 0).toLocaleString(), 
            icon: <Calendar />, 
            trend: 'Steady', 
            trendType: 'up',
            onClick: () => navigate('/admin/appointments')
        },
        { 
            title: 'Total Earnings', 
            value: loading ? '...' : `Rs. ${(pulse?.financial?.net_revenue || 0).toLocaleString()}`, 
            icon: <TrendingUp />, 
            trend: pulse?.financial?.delta || 'Real-time', 
            trendType: 'up',
            onClick: () => navigate('/admin/finances')
        }
    ], [pulse, loading, navigate]);

    // Chart Data
    const trendData = useMemo(() => 
        clinicalTrends?.length > 0 
            ? clinicalTrends.slice(0, 7).reverse().map(d => ({ 
                name: d.date?.split('-')[2] || 'D', 
                value: d.total_patients 
              })) 
            : [{ name: 'N/A', value: 0 }], 
    [clinicalTrends]);

    const revenueData = useMemo(() => 
        financialTrends?.length > 0
            ? financialTrends.slice(0, 6).reverse().map(d => {
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const monthIdx = parseInt(d.date?.split('-')[1]) - 1;
                return {
                    name: monthNames[monthIdx] || 'Month',
                    revenue: d.total_revenue
                };
              })
            : [{ name: 'Feb', revenue: 12400 }, { name: 'Mar', revenue: 15800 }, { name: 'Apr', revenue: 18200 }],
    [financialTrends]);

    return (
        <AdminPage>
            {/* 🌌 Header */}
            <PageHeader 
                title="Admin Dashboard" 
                subtitle="Hospital Overview & Real-time Records"
                status="System Active"
                time={currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                actions={
                    <div className="flex items-center gap-2">
                        <Button 
                            onClick={() => setIsUserModalOpen(true)}
                            className="bg-transparent hover:bg-accent-primary text-slate-600 dark:text-slate-400 hover:text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 border-none"
                        >
                            <UserPlus size={16} /> Add User
                        </Button>
                        <div className="w-px h-8 bg-slate-100 dark:bg-white/10 self-center mx-1" />
                        <Button 
                            onClick={() => setIsVisitModalOpen(true)}
                            className="bg-transparent hover:bg-accent-primary text-slate-600 dark:text-slate-400 hover:text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 border-none"
                        >
                            <Calendar size={16} /> Book Visit
                        </Button>
                    </div>
                }
            />

            {/* 📊 KPI Cards */}
            <div className="px-1">
                <MetricCards metrics={kpiMetrics} />
            </div>

            {/* 📈 Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
                <div className="lg:col-span-8 flex flex-col gap-8 w-full min-w-0">
                    <PatientTrends 
                        data={trendData} 
                        onViewStats={() => navigate('/admin/analytics')}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <RevenueChart 
                            data={revenueData} 
                            onViewFinances={() => navigate('/admin/finances')}
                        />
                        <DepartmentStats onNavigate={() => navigate('/admin/departments')} />
                    </div>

                    <LiveAppointments 
                        appointments={propAppointments || []} 
                        onExport={() => navigate('/admin/appointments')}
                        onViewPatient={(id) => navigate(`/admin/patients/${id}`)}
                    />
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6 w-full min-w-0">
                    <AIAssistant onOpenChat={() => navigate('/admin/ai-agent/chats')} />
                    <StockAlerts onViewInventory={() => navigate('/admin/inventory')} />
                    <DoctorStatus 
                        doctors={[1, 2, 3, 4]} 
                        onAddDoctor={() => navigate('/admin/doctors/add')}
                    />
                    <SystemPulse 
                        logs={auditLogs} 
                        onExpand={() => navigate('/admin/settings/security')}
                    />
                </div>
            </div>

            {/* 🎖️ System Status Indicator */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-full shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] z-50 flex items-center gap-10 invisible sm:flex">
                <div className="flex items-center gap-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">System: Active</span>
                </div>
                <div className="w-px h-6 bg-slate-200 dark:bg-white/10" />
                <button onClick={() => refresh()} className="text-[10px] font-black uppercase tracking-widest text-accent-primary hover:scale-110 transition-transform active:rotate-180 duration-500">
                    Update Now
                </button>
            </div>

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
