import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Search, RefreshCw, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, UnifiedSkeleton } from '@/components/primitives';
import { useTodaysAppointments } from '../hooks/useTodaysAppointments';

/**
 * 🛰️ TodaysAppointments (Mission Control)
 * A real-time telemetry shard for the daily clinical schedule.
 */
const TodaysAppointments = memo(() => {
    const navigate = useNavigate();
    const { appointments, loading, error } = useTodaysAppointments();

    const statusConfig = {
        confirmed: { label: 'CONFIRMED', cls: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
        waiting: { label: 'WAITING', cls: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
        'in session': { label: 'IN SESSION', cls: 'bg-sky-500/10 text-sky-500 border-sky-500/20' },
        scheduled: { label: 'SCHEDULED', cls: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
        cancelled: { label: 'CANCELLED', cls: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
        pending: { label: 'PENDING', cls: 'bg-slate-500/10 text-slate-500 border-slate-500/20' },
    };

    if (loading) {
        return (
            <Card className="rounded-[2.5rem] bg-white/50 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl p-8 space-y-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="h-6 w-48 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />
                    <div className="h-4 w-20 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                </div>
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-slate-200 dark:bg-white/5 rounded-2xl animate-pulse" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-1/3 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />
                            <div className="h-3 w-1/4 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                        </div>
                        <div className="h-8 w-24 bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />
                    </div>
                ))}
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="rounded-[2.5rem] bg-rose-500/5 border border-rose-500/20 p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto">
                    <RefreshCw size={24} />
                </div>
                <h3 className="text-sm font-black text-rose-500 uppercase tracking-widest italic">Telemetry Offline</h3>
                <p className="text-[10px] text-rose-400/60 font-bold uppercase tracking-widest">Failed to retrieve clinical schedule matrix.</p>
            </Card>
        );
    }

    return (
        <Card className="rounded-[2.5rem] bg-white/50 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl flex flex-col group/matrix">
            {/* 🛸 COMMAND HUB: Header */}
            <div className="px-8 py-6 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.4)]" />
                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Today's Appointments</h3>
                </div>
                <button 
                    onClick={() => navigate('/admin/appointments')}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary hover:gap-3 transition-all border-none bg-transparent"
                >
                    View All Registry <ChevronRight size={14} strokeWidth={3} />
                </button>
            </div>

            {/* 📋 SCHEDULE MATRIX */}
            <div className="flex-1 overflow-hidden">
                {appointments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 dark:bg-white/5">
                        <div className="w-16 h-16 rounded-full bg-slate-200/50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-white/20 mb-4">
                            <Calendar size={32} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">No appointments for today</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100 dark:divide-white/5">
                        {appointments.map((appt) => {
                            const config = statusConfig[appt.status] || statusConfig.scheduled;
                            return (
                                <motion.div
                                    key={appt.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-6 px-8 py-5 hover:bg-white dark:hover:bg-white/5 transition-all cursor-pointer group/row"
                                    onClick={() => navigate(`/admin/appointments/${appt.id}`)}
                                >
                                    {/* NODE PERCEPTION: Avatar */}
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 flex items-center justify-center text-slate-900 dark:text-white text-sm font-black group-hover/row:scale-110 group-hover/row:bg-accent-primary group-hover/row:text-white transition-all duration-500 shadow-sm group-hover/row:shadow-lg group-hover/row:shadow-accent-primary/20">
                                        {appt.patientName.charAt(0)}
                                    </div>

                                    {/* CLINICAL DATA */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3">
                                            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase italic tracking-tight truncate">
                                                {appt.patientName}
                                            </h4>
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[9px] font-black text-slate-500 group-hover/row:text-accent-primary transition-colors">
                                                <Clock size={10} /> {appt.time}
                                            </div>
                                        </div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 truncate group-hover/row:text-slate-500 transition-colors">
                                            {appt.doctorName} <span className="mx-1.5 opacity-30">|</span> {appt.department}
                                        </p>
                                    </div>

                                    {/* STATUS TELEMETRY */}
                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all duration-500 ${config.cls}`}>
                                            {config.label}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Card>
    );
});

TodaysAppointments.displayName = 'TodaysAppointments';

export default TodaysAppointments;
