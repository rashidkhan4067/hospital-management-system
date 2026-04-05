import React from 'react';
import { Users, LayoutGrid, ArrowRight, UserCheck } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * 🏥 QueueDepartmentMatrix — High-density Personnel Hub
 * Tracks patient distribution throughout clinical departments.
 */
const QueueDepartmentMatrix = ({ stats = [] }) => {
    const departments = [
        { label: 'Cardiology Matrix', count: 12, status: 'Active', color: 'text-rose-500', bg: 'bg-rose-500/10' },
        { label: 'General Medicine', count: 4, status: 'Idle', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Neurology Shard', count: 8, status: 'Peak Load', color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Orthopedics Matrix', count: 5, status: 'Active', color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
        { label: 'Dermatology Hub', count: 2, status: 'Low Activity', color: 'text-sky-500', bg: 'bg-sky-500/10' },
        { label: 'Pediatrics Matrix', count: 7, status: 'Consulting', color: 'text-violet-500', bg: 'bg-violet-500/10' },
    ];

    return (
        <Card className="p-6 lg:p-8 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border border-slate-200 dark:border-white/5 shadow-2als flex flex-col gap-6 group overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-accent-primary/10 transition-all duration-1000" />
            
            <div className="flex items-center justify-between relative z-10 shrink-0 border-b border-slate-100 dark:border-white/5 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-inner group-hover:scale-110 transition-transform italic shrink-0">
                        <LayoutGrid size={20} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-lg lg:text-xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">Departments</h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Live Allocation Matrix</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[8px] font-black uppercase italic shadow-sm leading-none">
                    <UserCheck size={10} /> Sync 100%
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                {departments.map((d, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-accent-primary/30 transition-all cursor-pointer group/node flex flex-col gap-3 shadow-sm relative overflow-hidden">
                        <div className={`w-8 h-8 rounded-lg ${d.bg} flex items-center justify-center ${d.color} shadow-sm group-hover/node:rotate-12 transition-transform italic shrink-0`}>
                            <Users size={16} />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic tracking-tighter group-hover/node:text-accent-primary transition-colors truncate">{d.label}</p>
                            <div className="flex items-center justify-between mt-1">
                                <span className={`text-[8px] font-black uppercase italic ${d.color} tracking-widest`}>{d.status}</span>
                                <span className="text-lg font-black text-slate-900 dark:text-white italic tabular-nums leading-none tracking-tighter">{d.count}</span>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-8 h-8 bg-accent-primary/5 opacity-0 group-hover/node:opacity-100 transition-opacity flex items-center justify-center text-accent-primary">
                            <ArrowRight size={12} strokeWidth={3} />
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-2 w-full py-4 rounded-[1.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase text-slate-700 dark:text-white hover:text-accent-primary shadow-lg shadow-black/5 transition-all flex items-center justify-center gap-3 italic">
                Manage All Hubs <ArrowRight size={16} className="text-accent-primary" strokeWidth={3} />
            </button>
        </Card>
    );
};

export default QueueDepartmentMatrix;
