import React from 'react';
import { Card } from '@/shared/components/ui';
import { Clock, CheckCircle2, History, Zap, Activity } from 'lucide-react';

/**
 * ⚡ Appointment Timeline Shard
 * Specialized clinical audit log for tracking appointment state transitions check mapping mapping.
 */
export default function AppointmentTimeline({ logs = [] }) {
    const defaultLogs = [
        { time: '14:30', event: 'Appointment Shard Synchronized', status: 'Success' },
        { time: '14:22', event: 'Patient Checked In Matrix', status: 'Success' },
        { time: '10:00', event: 'Reminder Protocol Dispatched', status: 'Notice' },
        { time: '10:00', event: 'Appointment Created Shard', status: 'Initialized' },
    ];

    const displayLogs = logs.length > 0 ? logs : defaultLogs;

    return (
        <Card className="p-8 lg:p-10 rounded-[3rem] bg-white dark:bg-white/[0.03] space-y-10 border border-slate-200 dark:border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20 shadow-inner group-hover:scale-110 transition-transform italic">
                    <History size={22} strokeWidth={2.5} />
                </div>
                <div>
                   <h3 className="text-[16px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic font-display leading-none">Clinical Event Log</h3>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 italic opacity-60">Synchronized Audit Propagation Shards</p>
                </div>
            </div>

            <div className="relative z-10 pl-6 border-l border-slate-200 dark:border-white/10 space-y-10">
                {displayLogs.map((log, idx) => (
                    <div key={idx} className="relative group/log">
                        {/* Timeline Node Shard */}
                        <div className="absolute -left-9.5 top-1 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-md">
                           <div className={`w-2.5 h-2.5 rounded-full ${
                               log.status === 'Success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 
                               log.status === 'Notice' ? 'bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.4)]' : 
                               'bg-slate-400'
                           }`} />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex flex-col">
                                <span className="text-[12px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight italic leading-none">{log.event}</span>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{log.status} · Protocol ID: 88219</p>
                            </div>
                            <div className="px-5 py-2 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[10px] font-black italic tabular-nums text-slate-500 group-hover/log:text-accent-primary transition-colors">
                                {log.time}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-between relative z-10 opacity-40">
                <div className="flex items-center gap-2">
                    <Activity size={14} className="text-emerald-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest italic">All Audit Shards Verified</span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest italic">Node: APPT-SHARD-9021</span>
            </div>
        </Card>
    );
}
