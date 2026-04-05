import React from 'react';
import { Card, Badge, Button } from '@/shared/components/ui';
import { 
  Calendar, Clock, CheckCircle, XCircle, AlertCircle, 
  User, Briefcase, Activity, Plane, Heart, Filter, 
  ArrowUpRight, MoreVertical 
} from 'lucide-react';

/**
 * 📊 Leave Balance Shard
 */
export function LeaveBalanceShard() {
  const balances = [
    { type: 'Annual Node', value: 12, total: 20, color: 'text-accent-primary', bg: 'bg-accent-primary/10', icon: Plane },
    { type: 'Clinical Sick', value: 4, total: 10, color: 'text-rose-500', bg: 'bg-rose-500/10', icon: Heart },
    { type: 'Study Shard', value: 5, total: 5, color: 'text-indigo-500', bg: 'bg-indigo-500/10', icon: Briefcase },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
       {balances.map((b, i) => (
          <Card key={i} className="p-6 rounded-[2.5rem] bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 shadow-2als relative overflow-hidden group italic">
             <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/5 blur-[40px] rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-1000" />
             <div className="flex items-center gap-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${b.bg} flex items-center justify-center ${b.color} border border-current/10 shadow-sm`}>
                   <b.icon size={22} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                   <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">{b.type}</h4>
                   <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">{b.value}<span className="text-xs text-slate-300 dark:text-slate-600 ml-1">/ {b.total}</span></p>
                </div>
             </div>
             <div className="mt-6 flex flex-col gap-2 relative z-10">
                <div className="flex items-center justify-between text-[8px] font-black uppercase">
                   <span>Utilization Shard</span>
                   <span className="opacity-60">{Math.round((b.value/b.total)*100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                   <div className={`h-full ${b.color.replace('text', 'bg')} transition-all duration-1000`} style={{ width: `${(b.value/b.total)*100}%` }} />
                </div>
             </div>
          </Card>
       ))}
    </div>
  );
}

/**
 * 📋 Leave Request Matrix
 */
export function LeaveRequestMatrix() {
  const requests = [
    { id: 1, name: 'Dr. Emily Blunt', role: 'Surgical Node', type: 'Annual', date: 'Oct 12 - Oct 15', status: 'Pending', color: 'accent-primary' },
    { id: 2, name: 'Marcus Thorne', role: 'Nursing Lead', type: 'Sick', date: 'Oct 05 - Oct 06', status: 'Approved', color: 'emerald-500' },
    { id: 3, name: 'Ava Sinclair', role: 'Radiology Team', type: 'Study', date: 'Oct 20 - Oct 25', status: 'Pending', color: 'indigo-500' },
    { id: 4, name: 'Leo Vance', role: 'Admin Shard', type: 'Personal', date: 'Oct 04 - Oct 04', status: 'Rejected', color: 'rose-500' },
  ];

  return (
    <Card className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-8 group italic">
       <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
       
       <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-accent-primary border border-white/10 shadow-2xl">
                <Calendar size={24} strokeWidth={2.5} />
             </div>
             <div className="flex flex-col">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none font-display">Absence Registry</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 opacity-60">Pending Identification Nodes: {requests.filter(r => r.status === 'Pending').length}</p>
             </div>
          </div>
          <Button variant="outline" className="px-5 py-2.5 rounded-xl border-slate-200 dark:border-white/10 text-[9px] font-black uppercase tracking-widest italic font-display flex items-center gap-2 grow-0">
             <Filter size={14} /> Refine Matrix
          </Button>
       </div>

       <div className="w-full overflow-x-auto relative z-10 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
         <table className="w-full text-left border-collapse table-fixed min-w-[700px]">
           <thead>
             <tr className="border-b border-slate-50 dark:border-white/5">
                <th className="w-[35%] py-6 text-[9px] font-black uppercase text-slate-400 tracking-widest italic text-left">Identity Node</th>
                <th className="w-[15%] py-6 text-[9px] font-black uppercase text-slate-400 tracking-widest italic text-center">Type Shard</th>
                <th className="w-[20%] py-6 text-[9px] font-black uppercase text-slate-400 tracking-widest italic text-center">Timeline Pulse</th>
                <th className="w-[15%] py-6 text-[9px] font-black uppercase text-slate-400 tracking-widest italic text-center">Status</th>
                <th className="w-[15%] py-6 text-[9px] font-black uppercase text-slate-400 tracking-widest italic text-right">Controls</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-50 dark:divide-white/5">
              {requests.map((r, i) => (
                 <tr key={i} className="group/row hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-6">
                       <div className="flex items-center gap-4">
                          <div className={`w-11 h-11 rounded-[1.1rem] bg-slate-900/5 dark:bg-white/5 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-white/10 shadow-inner group-hover/row:border-accent-primary/20 transition-colors`}>
                             <User size={20} />
                          </div>
                          <div className="flex flex-col min-w-0">
                             <p className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tighter truncate font-display group-hover/row:text-accent-primary transition-colors">{r.name}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60 italic">{r.role}</p>
                          </div>
                       </div>
                    </td>
                    <td className="py-6 text-center">
                       <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border border-slate-200/50">{r.type}</Badge>
                    </td>
                    <td className="py-6 text-center">
                       <div className="flex flex-col items-center gap-1">
                          <p className="text-[11px] font-black text-slate-400 dark:text-white/40 italic tracking-tighter leading-none">{r.date}</p>
                          <span className="text-[7px] font-black uppercase opacity-30 mt-1 italic tracking-widest">Active Schedule</span>
                       </div>
                    </td>
                    <td className="py-6 text-center">
                       <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-[9px] font-black uppercase italic border border-slate-200 dark:border-white/10 shadow-sm leading-none whitespace-nowrap">
                          <div className={`w-1.5 h-1.5 rounded-full ${r.status === 'Approved' ? 'bg-emerald-500' : r.status === 'Rejected' ? 'bg-rose-500' : 'bg-slate-400 animate-pulse'}`} />
                          {r.status}
                       </div>
                    </td>
                    <td className="py-6 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity translate-x-2 group-hover/row:translate-x-0">
                          <button type="button" className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-accent-primary border border-slate-200 dark:border-white/10 transition-all hover:scale-110 shadow-sm"><CheckCircle size={16} /></button>
                          <button type="button" className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-rose-500 border border-slate-200 dark:border-white/10 transition-all hover:scale-110 shadow-sm"><XCircle size={16} /></button>
                          <button type="button" className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-300 border border-slate-200 dark:border-white/10 transition-all"><MoreVertical size={16} /></button>
                       </div>
                    </td>
                 </tr>
              ))}
           </tbody>
         </table>
       </div>

       <div className="mt-4 pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between relative z-10 shrink-0">
         <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic leading-none">Institutional Absence Core v4.1</span>
         <div className="flex gap-2">
           <Button className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 p-0 shadow-sm min-w-0">&lt;</Button>
           <Button className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-accent-primary text-white border-none p-0 shadow-lg font-black italic shadow-accent-primary/20 min-w-0 text-[10px]">01</Button>
           <Button className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 p-0 shadow-sm min-w-0">&gt;</Button>
         </div>
       </div>
    </Card>
  );
}

/**
 * ⚡ AbsenceTrendShard — High-Fidelity Signal
 */
export function AbsenceTrendShard() {
    return (
        <Card className="p-8 rounded-[2.5rem] bg-slate-950 text-white border-none flex flex-col gap-6 shadow-2als relative overflow-hidden group italic">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12 italic">
                    <Activity size={18} className="text-accent-primary" />
                </div>
                <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display text-white">Coverage Pulse</h4>
            </div>
            
            <div className="mt-2 space-y-1 relative z-10">
                <p className="text-3xl font-black italic tracking-tighter leading-none text-accent-primary">Stable Node</p>
                <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest italic opacity-80 mt-2">Absence Load within institutional threshold (4.2%).</p>
            </div>

            <div className="mt-auto flex flex-col gap-4 relative z-10">
               <div className="flex items-center justify-between text-[10px] font-black uppercase">
                  <span>Resource Variance</span>
                  <span className="text-emerald-500 italic">+1.2% Velocity</span>
               </div>
               <div className="flex items-end gap-1.5 h-16">
                  {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                     <div key={i} className="flex-1 rounded-t-lg bg-white/10 relative group/bar cursor-pointer overflow-hidden">
                        <div className="absolute bottom-0 w-full bg-accent-primary group-hover:bg-white transition-all duration-500" style={{ height: `${h}%` }} />
                     </div>
                  ))}
               </div>
            </div>
        </Card>
    );
}
