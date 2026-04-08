import React from 'react';
import { PlayCircle, Users, Clock, Zap, ArrowRight, UserCheck } from 'lucide-react';
import { Card, Button } from '@/components/primitives';

/**
 * ⚡ NextPatientShard — The Command Node for Queue Flow
 * Prominent visual for the upcoming clinical encounter.
 */
const NextPatientShard = ({ nextPatient, onCallNext }) => {
    return (
        <Card className="p-6 lg:p-8 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-8 group h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-accent-primary/10 transition-all duration-1000" />
            
            <div className="flex items-center justify-between relative z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-inner group-hover:scale-110 transition-transform italic shrink-0">
                        <Zap size={28} strokeWidth={2.5} className="animate-pulse" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-xl lg:text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">Up Next</h3>
                        <p className="text-[10px] font-bold text-accent-primary/60 uppercase tracking-[0.3em] mt-1.5 ">Priority Queue Node</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase italic shadow-sm leading-none animate-bounce">
                    <UserCheck size={12} /> Priority A-1
                </div>
            </div>

            {nextPatient ? (
                <div className="flex-1 flex flex-col gap-6 relative z-10">
                    <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-900 dark:text-white font-black text-2xl uppercase border border-slate-200 dark:border-white/5 italic shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                                {nextPatient.patient?.full_name?.charAt(0) || 'P'}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="text-2xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none truncate group-hover:text-accent-primary transition-colors">
                                    {nextPatient.patient?.full_name || 'Al Shifaa Patient'}
                                </p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                                    <Users size={12} className="text-accent-primary" /> {nextPatient.doctor?.full_name || 'Dr. To Be Assigned'}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Wait Time</p>
                                <p className="text-[14px] font-black text-slate-900 dark:text-white italic mt-1 uppercase tabular-nums">14:22 MIN</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Department</p>
                                <p className="text-[14px] font-black text-slate-900 dark:text-white italic mt-1 uppercase truncate font-display tracking-tight">CARDIOLOGY</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center relative z-10 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[2rem] p-10">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic animate-pulse">Waiting for Synchronization...</p>
                </div>
            )}

            <button 
                onClick={onCallNext}
                className="w-full py-5 rounded-2xl bg-accent-primary hover:bg-accent-primary/90 text-white text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-accent-primary/20 border-none group-hover:scale-[1.02] active:scale-[0.98] relative z-10 italic"
            >
                Push Node Forward <ArrowRight size={18} />
            </button>
        </Card>
    );
};

export default NextPatientShard;
