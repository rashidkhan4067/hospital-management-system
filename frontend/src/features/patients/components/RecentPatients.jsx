import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Clock, Search, Activity, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// ── Layout & Shared UI
import DashboardCard from '@/features/dashboard/components/DashboardCard';
import EmptyState from '@/features/dashboard/components/EmptyState';
import { useRecentPatients } from '../hooks/useRecentPatients';
import { useTheme } from '@/core/theme/ThemeContext';

/**
 * 🛰️ RecentPatients (Clinical Intake Matrix)
 * Monitors the most recent surgical and clinical intakes across acquisition nodes.
 */
const RecentPatients = memo(({ isSyncActive = true }) => {
    const navigate = useNavigate();
    const { accentColor } = useTheme();
    const { patients = [], loading, error } = useRecentPatients(isSyncActive);

    if (error) {
        return (
            <DashboardCard title="Intake Registry" subtitle="Telemetry Offline" icon={UserPlus} className="h-full">
                <EmptyState title="SIGNAL LOST" subtitle="Failed to synchronize clinical acquisition nodes." />
            </DashboardCard>
        );
    }

    return (
        <DashboardCard 
            title="Surgical Registry" 
            subtitle="Chronological Patient Intake" 
            icon={UserPlus} 
            loading={loading}
            className="h-full flex flex-col"
            telemetryType="clinical"
            scrollable
            fadingEdges
            actions={
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isSyncActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                    <span className="text-[10px] font-black text-[#64748b] dark:text-slate-500 uppercase tracking-widest">PX_HUB_SYNC</span>
                </div>
            }
            footer={
                <button 
                    onClick={() => navigate('/admin/patients')}
                    className="w-full h-11 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:brightness-110 shadow-xl flex items-center justify-center gap-4"
                >
                    Intel Center <Search size={16} strokeWidth={3} />
                </button>
            }
        >
            <div className="flex flex-col h-full">
                <AnimatePresence mode="wait">
                    {(!patients || patients.length === 0) ? (
                        <EmptyState 
                            title="SYSTEM NOMINAL" 
                            subtitle="Awaiting clinical telemetry." 
                            icon={Activity} 
                        />
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                            {patients.map((p) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-5 py-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer group/row"
                                    onClick={() => navigate(`/admin/patients/${p.id}`)}
                                >
                                    {/* NODE PERCEPTION */}
                                    <div 
                                        className="w-12 h-12 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#0f172a] dark:text-white text-xs font-black transition-all duration-300 shadow-sm group-hover/row:scale-110 shrink-0"
                                        style={{ borderBottom: `3px solid ${accentColor}` }}
                                    >
                                        {p.initials}
                                    </div>

                                    {/* CLINICAL DATA */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[11px] font-bold text-[#0f172a] dark:text-white uppercase leading-none tracking-tight truncate group-hover/row:text-accent-primary transition-colors mb-2">
                                            {p.name}
                                        </h4>
                                        <p className="text-[10px] font-medium text-[#64748b] dark:text-slate-500 uppercase tracking-widest truncate">
                                            {p.doctor}
                                        </p>
                                    </div>

                                    {/* CHRONO TELEMETRY */}
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/5 text-[9px] font-black text-[#64748b] dark:text-slate-400 uppercase tracking-widest shrink-0">
                                        <Clock size={12} className="text-accent-primary text-emerald-500" /> {p.lastActivity}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardCard>
    );
});

RecentPatients.displayName = 'RecentPatients';
export default RecentPatients;
