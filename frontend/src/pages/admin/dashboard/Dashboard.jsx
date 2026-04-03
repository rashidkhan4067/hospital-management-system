import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    Calendar,
    Stethoscope,
    TrendingUp,
    UserPlus,
} from 'lucide-react';
import { Button, PageHeader } from '../../../components/ui';

// 🏥 QUICK ACTIONS
import AddUserModal from '../../../components/features/admin/AddUserModal';
import BookVisitModal from '../../../components/features/admin/BookVisitModal';

// 🎣 CLINICAL DATA HOOKS & SERVICES
import { useAdminAnalytics } from '../../../hooks/admin/useAdminAnalytics';
import analyticsService from '../../../services/admin/AnalyticsService';
import userService from '../../../services/admin/UserService';
import appointmentService from '../../../services/admin/AppointmentService';

// 🏢 DASHBOARD COMPONENTS
import AdminPage from '../../../components/layout/AdminPage'; // ✨ THE BASE FILE
import MetricCards from '../../../components/features/admin/dashboard/MetricCards';
import PatientTrends from '../../../components/features/admin/dashboard/PatientTrends'; 
import RevenueChart from '../../../components/features/admin/dashboard/RevenueChart';
import DepartmentStats from '../../../components/features/admin/dashboard/DepartmentStats';
import LiveAppointments from '../../../components/features/admin/dashboard/LiveAppointments';
import AIAssistant from '../../../components/features/admin/dashboard/AIAssistant';
import SystemPulse from '../../../components/features/admin/dashboard/SystemPulse';
import DoctorStatus from '../../../components/features/admin/dashboard/DoctorsStatus';
import StockAlerts from '../../../components/features/admin/dashboard/StockAlerts'; 

/**
 * 🏢 Admin Dashboard
 * Main hospital management interface tracking patients, doctors, and revenue.
 */
export default function AdminDashboard({ user, appointments: propAppointments, loading: clinicalLoading }) {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [auditLogs, setAuditLogs] = useState([]);
    const { pulse, clinicalTrends, financialTrends, loading, refresh } = useAdminAnalytics();

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        const autoRefresh = setInterval(() => refresh(), 30000); 

        return () => {
            clearInterval(timer);
            clearInterval(autoRefresh);
        };
    }, [refresh]);

    const handleAddUser = async (formData, resetForm) => {
        setIsSubmitting(true);
        try {
            await userService.create(formData);
            resetForm();
            setIsUserModalOpen(false);
            refresh();
        } catch (err) { console.error(err); } 
        finally { setIsSubmitting(false); }
    };

    const handleBookVisit = async (formData, resetForm) => {
        setIsSubmitting(true);
        try {
            await appointmentService.create(formData);
            resetForm();
            setIsVisitModalOpen(false);
            refresh();
            navigate('/admin/appointments');
        } catch (err) { console.error(err); } 
        finally { setIsSubmitting(false); }
    };

    const kpiMetrics = [
        { 
            title: 'Total Patients', 
            value: loading ? '...' : pulse?.counts?.patients ?? 0, 
            icon: <Users />, 
            trend: pulse?.clinical?.delta || '+0.0%', 
            trendType: 'up',
            onClick: () => navigate('/admin/patients')
        },
        { 
            title: 'Active Doctors', 
            value: loading ? '...' : pulse?.counts?.doctors ?? 0, 
            icon: <Stethoscope />, 
            trend: 'Live', 
            trendType: 'neutral',
            onClick: () => navigate('/admin/doctors')
        },
        { 
            title: 'Daily Visits', 
            value: loading ? '...' : pulse?.counts?.appointments ?? 0, 
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
    ];

    const trendData = clinicalTrends?.length > 0 
        ? clinicalTrends.slice(0, 7).reverse().map(d => ({ 
            name: d.date?.split('-')[2] || 'D', 
            value: d.total_patients 
          })) 
        : [{ name: 'N/A', value: 0 }];

    const revenueData = financialTrends?.length > 0
        ? financialTrends.slice(0, 6).reverse().map(d => ({
            name: d.date?.split('-')[1] === '04' ? 'Apr' : 'Month',
            revenue: d.total_revenue
          }))
        : [{ name: 'Feb', revenue: 12400 }, { name: 'Mar', revenue: 15800 }, { name: 'Apr', revenue: 18200 }];

    return (
        <AdminPage>
            {/* 🌌 ULTRA HEADER SHARD */}
            <PageHeader 
                title="Admin Dashboard" 
                subtitle="Hospital Management & Real-time Clinical Shards"
                status="Live Intelligence Hub"
                time={currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                actions={
                    <>
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
                    </>
                }
            />

            {/* 📊 LIVE KPI SHARDS */}
            <div className="px-1">
                <MetricCards metrics={kpiMetrics} />
            </div>

            {/* 📈 MAIN INTELLIGENCE ANALYTICS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full animate-in slide-in-from-bottom duration-1000 delay-200">
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
                        onExport={() => alert('Exporting Clinical Shard to CSV...')}
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
                        onExpand={() => navigate('/admin/audit')}
                    />
                </div>
            </div>

            {/* 🎖️ SYSTEM PULSE INDICATOR */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-full shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] z-50 flex items-center gap-10">
                <div className="flex items-center gap-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Clinical Shard: Active</span>
                </div>
                <div className="w-px h-6 bg-slate-200 dark:bg-white/10" />
                <button onClick={() => refresh()} className="text-[10px] font-black uppercase tracking-widest text-accent-primary hover:scale-110 transition-transform active:rotate-180 duration-500">
                    Sync Node Now
                </button>
            </div>

            <AddUserModal 
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                onAction={handleAddUser}
                isSubmitting={isSubmitting}
                initialRole="patient"
            />
            
            <BookVisitModal 
                isOpen={isVisitModalOpen}
                onClose={() => setIsVisitModalOpen(false)}
                onAction={handleBookVisit}
                isSubmitting={isSubmitting}
            />
        </AdminPage>
    );
}
