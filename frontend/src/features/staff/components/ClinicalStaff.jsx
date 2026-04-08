import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, Search, RefreshCw, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/primitives';
import { useClinicalStaff } from '../hooks/useClinicalStaff';

/**
 * 🏥 ClinicalStaff (Real-Time Status Tracker)
 * Monitors real-time status and location of medical personnel currently on shift.
 * Implements architectural isolation and data-driven rendering.
 */
const ClinicalStaff = memo(() => {
    const navigate = useNavigate();
    const { staff, isLoading, error, getStatusStyles } = useClinicalStaff();

    /**
     * 🦴 SKELETON MATRIX
     * Renders a layout-accurate pulsing placeholder during telemetry acquisition.
     */
    if (isLoading) {
        return (
            <Card className="rounded-[2.5rem] bg-white/50 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl flex flex-col h-full">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 flex justify-between">
                    <div className="h-5 w-32 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />
                    <div className="h-3 w-16 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                </div>
                <div className="p-6 space-y-6">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 animate-pulse" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 w-1/3 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />
                                <div className="h-2 w-1/4 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                            </div>
                            <div className="h-3 w-12 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                        </div>
                    ))}
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="rounded-[2.5rem] bg-rose-500/5 border border-rose-500/20 p-8 text-center space-y-4 h-full">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto">
                    <RefreshCw size={24} className="animate-spin" />
                </div>
                <h3 className="text-sm font-black text-rose-500 uppercase tracking-widest italic">Signal Lost</h3>
                <p className="text-[10px] text-rose-400/60 font-bold uppercase tracking-widest leading-relaxed">Failed to establish persistence with Staff Registry.</p>
            </Card>
        );
    }

    return (
        <Card className="rounded-[2.5rem] bg-white/50 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl flex flex-col group/staff overflow-hidden">
            
            {/* 🛸 COMMAND HUB: Staff Header */}
            <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500 relative">
                        <Activity size={20} />
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-white leading-none">Clinical Staff</h3>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1.5 leading-none">Chronological Roster Trace</p>
                    </div>
                </div>
                <button 
                    onClick={() => navigate('/staff/roster')}
                    className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-primary hover:tracking-[0.3em] transition-all bg-transparent border-none cursor-pointer"
                >
                    ROSTER →
                </button>
            </div>

            {/* 👥 PERSONNEL MATRIX */}
            <div className="flex-1 divide-y divide-slate-100 dark:divide-white/5 overflow-y-auto custom-scrollbar max-h-[350px]">
                <AnimatePresence mode="popLayout">
                    {staff.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 opacity-30 italic">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Active Personnel</p>
                        </div>
                    ) : (
                        staff.map((s, i) => (
                            <motion.div
                                key={s.id}
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer group/row"
                                onClick={() => navigate(`/staff/profile/${s.id}`)}
                            >
                                {/* AVATAR: Personnel Shard */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/5 dark:to-transparent border border-slate-200 dark:border-white/10 flex items-center justify-center text-[10px] font-black text-slate-700 dark:text-slate-300 shrink-0 group-hover/row:border-accent-primary/30 group-hover/row:scale-110 transition-all shadow-sm">
                                    {s.initials}
                                </div>

                                {/* PERSONNEL DATA */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-[11px] font-black uppercase italic tracking-tight text-slate-900 dark:text-white truncate leading-none group-hover/row:text-accent-primary transition-colors">
                                        {s.name}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <span className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest border border-current leading-none ${getStatusStyles(s.status).split(' ')[0]}`}>
                                            {s.status}
                                        </span>
                                    </div>
                                </div>

                                {/* LOCATION NODE */}
                                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-white/5 text-[8px] font-black text-slate-400 group-hover/row:text-slate-600 dark:group-hover/row:text-slate-200 transition-colors shrink-0 border border-transparent group-hover/row:border-slate-200 dark:group-hover/row:border-white/10">
                                    <MapPin size={10} className="text-slate-300 group-hover/row:text-accent-primary transition-colors" /> 
                                    <span className="uppercase tracking-widest">{s.location}</span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
            
            {/* 🛸 HUD FOOTER: Roster Telemetry */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/5 transition-all">
                <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 italic">Node: STAFF-PULSE</span>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500 italic">
                            {staff.length} ACTIVE NOW
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
});

ClinicalStaff.displayName = 'ClinicalStaff';

export default ClinicalStaff;
