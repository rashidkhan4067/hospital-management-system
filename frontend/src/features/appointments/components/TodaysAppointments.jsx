import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ── Layout & Shared UI
import DashboardCard from '@/features/dashboard/components/DashboardCard';
import EmptyState from '@/features/dashboard/components/EmptyState';
import { useTodaysAppointments } from '../hooks/useTodaysAppointments';
import { useTheme } from '@/core/theme/ThemeContext';

/**
 * 🛰️ TodaysAppointments (Mission Control)
 * Refactored for High Contrast and Accessibility.
 */
const TodaysAppointments = memo(() => {
    const navigate = useNavigate();
    const { accentColor } = useTheme();
    const { appointments = [], loading, error } = useTodaysAppointments();

    const statusConfig = {
        confirmed: { label: 'CONFIRMED', cls: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' },
        waiting: { label: 'WAITING', cls: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]' },
        'in session': { label: 'IN SESSION', cls: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.1)]' },
        scheduled: { label: 'SCHEDULED', cls: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]' },
        cancelled: { label: 'CANCELLED', cls: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]' },
        pending: { label: 'PENDING', cls: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20' },
    };

    if (error) {
        return (
            <DashboardCard title="Clinical Schedule" subtitle="Telemetry Offline" icon={Calendar} className="h-full">
                <EmptyState title="SIGNAL LOST" subtitle="Failed to retrieve clinical schedule matrix." />
            </DashboardCard>
        );
    }

    return (
        <DashboardCard 
            title="Surgical Schedule" 
            subtitle="Clinical Intake Pipeline" 
            icon={Calendar} 
            loading={loading}
            className="h-full flex flex-col"
            telemetryType="clinical"
            actions={
                <button 
                    onClick={() => navigate('/admin/appointments')}
                    className="flex items-center gap-3 px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all border-none"
                >
                    All Registry <ChevronRight size={14} strokeWidth={3} />
                </button>
            }
        >
            <div className="flex flex-col h-full overflow-hidden">
                <AnimatePresence mode="popLayout">
                    {(!appointments || appointments.length === 0) ? (
                        <EmptyState 
                            title="FACILITY READY" 
                            subtitle="All surgical pipelines currently in standby mode."
                            icon={Calendar}
                            className="h-[400px]"
                        />
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                            {appointments.map((appt) => {
                                const config = statusConfig[appt.status] || statusConfig.scheduled;
                                return (
                                    <motion.div
                                        key={appt.id}
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-6 px-4 py-8 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer group/row"
                                        onClick={() => navigate(`/admin/appointments/${appt.id}`)}
                                    >
                                        {/* NODE PERCEPTION: Avatar Shard */}
                                        <div 
                                            className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white text-base font-black transition-all duration-500 shadow-sm group-hover/row:scale-110 flex-shrink-0"
                                            style={{ borderBottom: `4px solid ${accentColor}` }}
                                        >
                                            {appt.patientName.charAt(0)}
                                        </div>

                                        {/* CLINICAL DATA */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-4 mb-2">
                                                <h4 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tight truncate group-hover:text-accent-primary transition-colors">
                                                    {appt.patientName}
                                                </h4>
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-500 dark:text-slate-400">
                                                    <Clock size={12} className="text-accent-primary" /> {appt.time}
                                                </div>
                                            </div>
                                            <div className="flex items-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">
                                                <span className="text-slate-900 dark:text-white font-black">{appt.doctorName}</span> 
                                                <span className="mx-3 opacity-30 text-slate-400">|</span> 
                                                {appt.department} Unit
                                            </div>
                                        </div>

                                        {/* STATUS TELEMETRY */}
                                        <div className="flex flex-col items-end gap-2 shrink-0">
                                            <span className={`px-5 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${config.cls}`}>
                                                {config.label}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardCard>
    );
});

TodaysAppointments.displayName = 'TodaysAppointments';
export default TodaysAppointments;
