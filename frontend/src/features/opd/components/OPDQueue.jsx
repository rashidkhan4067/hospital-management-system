import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, Search, Activity, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/features/dashboard/components/DashboardCard';
import EmptyState from '@/features/dashboard/components/EmptyState';
import { useOPDQueue } from '../hooks/useOPDQueue';
import { useTheme } from '@/core/theme/ThemeContext';

/**
 * 🛠️ Utility: Token Color Matrix
 */
const getTokenStyles = (dept) => {
    const normalizedDept = dept?.toLowerCase() || 'general';
    const mapping = {
        cardiology: 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
        orthopedics: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
        general: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20',
        dermatology: 'bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20',
        pediatrics: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
    };
    return mapping[normalizedDept] || mapping.general;
};

/**
 * 🛰️ OPDQueue (Token Tracking System)
 * Monitors real-time patient flow across outpatient departments.
 */
const OPDQueue = memo(() => {
    const navigate = useNavigate();
    const { accentColor } = useTheme();
    const { queue = [], waitingCount, loading, error } = useOPDQueue();

    if (error) {
        return (
            <DashboardCard title="OPD Flow Matrix" subtitle="Registry Offline" icon={Users} className="h-full">
                <EmptyState title="SIGNAL LOST" subtitle="Clinical flow nodes disconnected." />
            </DashboardCard>
        );
    }

    return (
        <DashboardCard 
            title="OPD Flow Matrix" 
            subtitle={`${waitingCount || 0} Synchronized Tokens`} 
            icon={Users} 
            loading={loading}
            className="h-full flex flex-col"
            telemetryType="clinical"
            actions={
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Flow</span>
                </div>
            }
        >
            <div className="flex flex-col h-full overflow-hidden">
                <AnimatePresence mode="wait">
                    {queue.length === 0 ? (
                        <EmptyState 
                            title="SYSTEM NOMINAL" 
                            subtitle="No active patient tokens in queue." 
                            icon={Users} 
                            className="h-[300px]"
                        />
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                            {queue.map((patient) => (
                                <motion.div
                                    key={patient.id}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-5 py-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer group/row"
                                    onClick={() => navigate(`/admin/opd/patient/${patient.token}`)}
                                >
                                    {/* TOKEN SHARD */}
                                    <div className={`min-w-[4.5rem] h-11 rounded-2xl flex items-center justify-center text-xs font-black tracking-[0.15em] border transition-all duration-500 group-hover/row:scale-110 shadow-sm shrink-0 ${getTokenStyles(patient.department)}`}>
                                        {patient.token}
                                    </div>

                                    {/* CLINICAL DATA */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase leading-none tracking-tight truncate group-hover/row:text-accent-primary transition-colors mb-2">
                                            {patient.name}
                                        </h4>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">
                                            {patient.department} Area
                                        </p>
                                    </div>

                                    {/* WAIT TELEMETRY */}
                                    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[9px] font-black uppercase tracking-widest shrink-0 transition-colors ${patient.waitTime > 15 ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'}`}>
                                        <Clock size={12} strokeWidth={3} className="shrink-0" /> {patient.waitTime} MIN
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                <div className="mt-auto pt-4 w-full">
                    <button 
                        onClick={() => navigate('/admin/opd-queue')}
                        className="w-full py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:scale-[1.01] active:scale-95 shadow-2xl flex items-center justify-center gap-4 border-none"
                    >
                        Intel Center <Search size={16} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </DashboardCard>
    );
});

OPDQueue.displayName = 'OPDQueue';
export default OPDQueue;
