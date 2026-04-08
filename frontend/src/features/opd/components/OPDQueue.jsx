import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, ChevronRight, RefreshCw, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, UnifiedSkeleton } from '@/components/primitives';
import { useOPDQueue } from '../hooks/useOPDQueue';

/**
 * 🛠️ Utility: Token Color Matrix
 * Maps department-specific nodes to distinct visual identifiers.
 */
const getTokenStyles = (dept) => {
    const normalizedDept = dept?.toLowerCase() || 'general';
    const mapping = {
        cardiology: 'bg-rose-500/10 text-rose-600 border-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.1)]',
        orthopedics: 'bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.1)]',
        general: 'bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.1)]',
        dermatology: 'bg-slate-500/10 text-slate-600 border-slate-500/20 shadow-[0_0_12px_rgba(100,116,139,0.1)]',
        pediatrics: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)]',
    };
    return mapping[normalizedDept] || mapping.general;
};

/**
 * 🛰️ OPDQueue (Token Tracking System)
 * A real-time telemetry shard for the outpatient sequence.
 */
const OPDQueue = memo(() => {
    const navigate = useNavigate();
    const { queue, waitingCount, loading, error } = useOPDQueue();

    if (loading) {
        return (
            <Card className="rounded-[2.5rem] bg-white/50 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl p-8 space-y-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="h-6 w-40 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />
                    <div className="h-3 w-24 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                </div>
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="h-10 w-16 bg-slate-200 dark:bg-white/5 rounded-xl animate-pulse" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-1/2 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />
                            <div className="h-2 w-1/4 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                        </div>
                        <div className="h-4 w-12 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                    </div>
                ))}
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="rounded-[2.5rem] bg-rose-500/5 border border-rose-500/20 p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto">
                    <RefreshCw size={24} className="animate-spin" />
                </div>
                <h3 className="text-sm font-black text-rose-500 uppercase tracking-widest italic">Signal Lost</h3>
                <p className="text-[10px] text-rose-400/60 font-bold uppercase tracking-widest leading-relaxed">Failed to maintain persistent connection to OPD registry.</p>
            </Card>
        );
    }

    return (
        <Card className="rounded-[2.5rem] bg-white/50 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl flex flex-col group/queue overflow-hidden">
            
            {/* 🛸 COMMAND HUB: Queue Header */}
            <div className="px-8 py-6 flex items-center justify-between border-b border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary relative">
                        <Users size={20} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-primary text-[8px] font-black text-white flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800 animate-bounce">
                            {waitingCount}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-none">OPD Queue</h3>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{waitingCount} Patients Waiting</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Trace
                </div>
            </div>

            {/* 📋 TOKEN SEQUENCE MATRIX */}
            <div className="flex-1 px-4 py-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {queue.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-10 opacity-30"
                        >
                            <Activity size={32} strokeWidth={1} />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-4">Queue Exhausted</p>
                        </motion.div>
                    ) : (
                        <div className="space-y-3">
                            {queue.map((patient, index) => (
                                <motion.div
                                    key={patient.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-accent-primary/30 hover:shadow-lg transition-all cursor-pointer group/token"
                                    onClick={() => navigate(`/admin/opd/patient/${patient.token}`)}
                                >
                                    {/* NODE IDENTIFIER: Token Shard */}
                                    <div className={`min-w-[4.5rem] h-11 rounded-xl flex items-center justify-center text-xs font-black tracking-widest border transition-all duration-500 group-hover/token:scale-105 ${getTokenStyles(patient.department)}`}>
                                        {patient.token}
                                    </div>

                                    {/* CLINICAL DATA */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase italic tracking-tight truncate group-hover/token:text-accent-primary transition-colors">
                                            {patient.name}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                                {patient.department}
                                            </span>
                                            <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10" />
                                            <div className="flex items-center gap-1 text-[8px] font-black text-accent-primary uppercase tracking-widest">
                                                <Clock size={10} strokeWidth={3} /> {patient.waitTime} min
                                            </div>
                                        </div>
                                    </div>

                                    <ChevronRight size={14} className="text-slate-300 group-hover/token:translate-x-1 transition-transform" />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* 🛸 HUD FOOTER: Registry Access */}
            <button 
                onClick={() => navigate('/admin/opd-queue')}
                className="w-full py-5 border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/2 hover:bg-slate-100 dark:hover:bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-accent-primary transition-all flex items-center justify-center gap-3 border-none cursor-pointer"
            >
                Manage Full Queue <ChevronRight size={14} strokeWidth={3} />
            </button>
        </Card>
    );
});

OPDQueue.displayName = 'OPDQueue';

export default OPDQueue;
