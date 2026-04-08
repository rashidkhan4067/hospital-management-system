import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Clock, ChevronRight, Activity, Search, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, UnifiedSkeleton } from '@/components/primitives';
import { useRecentPatients } from '../hooks/useRecentPatients';

/**
 * 🛰️ RecentPatients (Clinical Activity Feed)
 * A real-time telemetry shard for the chronological patient registry.
 */
const RecentPatients = memo(({ isSyncActive = true }) => {
    const navigate = useNavigate();
    const { patients, loading, error } = useRecentPatients(isSyncActive);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
    };

    if (loading) {
        return (
            <Card className="rounded-[2.5rem] bg-white/50 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl p-8 space-y-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="h-6 w-40 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />
                    <div className="h-3 w-24 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                </div>
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-1/2 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />
                            <div className="h-2 w-1/4 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                        </div>
                        <div className="h-4 w-16 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                    </div>
                ))}
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="rounded-[2.5rem] bg-amber-500/5 border border-amber-500/20 p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mx-auto">
                    <Database size={24} />
                </div>
                <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest italic">Registry Lag</h3>
                <p className="text-[10px] text-amber-500/60 font-bold uppercase tracking-widest leading-relaxed">Failed to synchronize clinical acquisition nodes.</p>
            </Card>
        );
    }

    return (
        <Card className="rounded-[2.5rem] bg-white/50 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl flex flex-col group/feed overflow-hidden h-full">
            
            {/* 🛸 COMMAND HUB: Feed Header */}
            <div className="px-8 py-6 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-inner group-hover/feed:rotate-12 transition-transform duration-500">
                        <UserPlus size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-none">Recent Patients</h3>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5 line-clamp-1">Chronological Acquisition Stream</p>
                    </div>
                </div>
                <button 
                    onClick={() => navigate('/admin/patients')}
                    className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#0ea5e9] hover:gap-2.5 transition-all bg-transparent border-none cursor-pointer"
                >
                    View All <Search size={12} strokeWidth={3} />
                </button>
            </div>

            {/* 📋 ACTIVITY STREAM */}
            <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                    {patients.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 opacity-30"
                        >
                            <Activity size={32} strokeWidth={1} />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-4">Registry Idle</p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="divide-y divide-slate-100 dark:divide-white/5"
                        >
                            {patients.map((p) => (
                                <motion.div
                                    key={p.id}
                                    variants={itemVariants}
                                    className="flex items-center gap-4 px-8 py-4.5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all cursor-pointer group/row"
                                    onClick={() => navigate(`/admin/patients/${p.id}`)}
                                >
                                    {/* NODE PERCEPTION: Amber Initial Badge */}
                                    <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 text-xs font-black group-hover/row:bg-amber-500 group-hover/row:text-white transition-all duration-300 shadow-inner group-hover/row:shadow-lg group-hover/row:shadow-amber-500/20">
                                        {p.initials}
                                    </div>

                                    {/* CLINICAL DATA */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase italic tracking-tight truncate group-hover/row:text-[#0ea5e9] transition-colors">
                                            {p.name}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest line-clamp-1">
                                                {p.doctor}
                                            </span>
                                            <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10" />
                                            <span className="text-[8px] font-bold text-slate-500 truncate">
                                                {p.nodeId}
                                            </span>
                                        </div>
                                    </div>

                                    {/* CHRONO TELEMETRY */}
                                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                                        <div className="flex items-center gap-1 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                            <Clock size={10} strokeWidth={3} /> {p.lastActivity}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 🛸 HUD FOOTER: System Status */}
            <div className="px-8 py-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic line-clamp-1">Node: PX_Acquisition_Hub</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                    {isSyncActive ? 'Sync Active' : 'Offline Mode'}
                </div>
            </div>
        </Card>
    );
});

RecentPatients.displayName = 'RecentPatients';

export default RecentPatients;
