import React from 'react';
import { Activity, ShieldCheck, Clock, Zap, Stethoscope, Briefcase, Users as UsersIcon } from 'lucide-react';

/**
 * 💹 TransactionAuditTrail
 * Detailed clinical event logging for financial telemetry shards.
 */
export default function TransactionAuditTrail({ logs = [] }) {
  return (
    <div className="bg-white dark:bg-white/[0.03] rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden transition-all hover:shadow-2xl duration-500 group relative">
      <div className="p-8 lg:p-10">
        <div className="flex items-center gap-5 mb-10">
           <div className="w-14 h-14 rounded-[1.4rem] bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
              <ShieldCheck size={24} />
           </div>
           <div className="flex flex-col gap-1">
              <h3 className="text-[20px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic font-display leading-tight">Audit Trail</h3>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic leading-none mt-0.5">Physical Node Protocol Logs</p>
           </div>
        </div>

        <div className="space-y-4">
           {logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-5 group/log p-5 rounded-3xl hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent hover:border-slate-100 dark:hover:border-white/10 transition-all duration-300">
                 <div className="w-10 h-10 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 group-hover/log:bg-accent-primary/10 group-hover/log:text-accent-primary transition-all duration-300 shrink-0">
                    <Activity size={16} />
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                       <p className="text-[13px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic font-display">{log.event}</p>
                       <p className="text-[10px] font-black text-accent-primary uppercase tracking-[0.2em] italic tabular-nums">{log.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/20" />
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{log.status} Node Logic Established</p>
                    </div>
                 </div>
              </div>
           ))}
        </div>

        <div className="mt-10 p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center gap-4 opacity-50 grayscale transition-all hover:opacity-100 italic">
           <Stethoscope size={14} />
           <Briefcase size={14} />
           <UsersIcon size={14} />
           <span className="text-[8px] font-black uppercase tracking-widest opacity-60">System Security Orchestration Link Hardened</span>
        </div>
      </div>
    </div>
  );
}
