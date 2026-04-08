import React from 'react';
import { Card, Badge, Button } from '@/components/primitives';
import { 
  Shield, ShieldCheck, Key, Lock, Eye, 
  Edit3, Trash2, ShieldAlert, Check, X,
  ArrowUpRight, Fingerprint
} from 'lucide-react';

/**
 * 🔐 Permission Matrix Shard — High-fidelity access control
 */
export function PermissionMatrixShard() {
  const permissions = [
    { module: 'Clinical Records', roles: { admin: true, doctor: true, staff: false, patient: false }, description: 'Access to patient clinical nodes and vitals.' },
    { module: 'Financial Ledger', roles: { admin: true, doctor: false, staff: false, patient: false }, description: 'Administrative fiscal transaction shards.' },
    { module: 'Pharmacy Matrix', roles: { admin: true, doctor: true, staff: true, patient: false }, description: 'Inventory and prescription nodes.' },
    { module: 'Identity Registry', roles: { admin: true, doctor: false, staff: false, patient: false }, description: 'Global user identity synchronization.' },
    { module: 'Appointment Hub', roles: { admin: true, doctor: true, staff: true, patient: true }, description: 'Scheduling and timeline orchestration.' },
  ];

  return (
    <Card className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-8 group italic">
       <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
       
       <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-accent-primary border border-white/10 shadow-2xl">
                <Shield size={24} strokeWidth={2.5} />
             </div>
             <div className="flex flex-col">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none font-display">Permission Matrix</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 opacity-60 italic">Global Authorization Protocol v8.2</p>
             </div>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="px-5 py-2.5 rounded-xl border-slate-200 dark:border-white/10 text-[9px] font-black uppercase tracking-widest italic font-display">Protocol Audit</Button>
          </div>
       </div>

       <div className="w-full overflow-x-auto relative z-10 scrollbar-hide">
         <table className="w-full text-left border-collapse table-fixed min-w-[800px]">
           <thead>
             <tr className="border-b border-slate-50 dark:border-white/5">
                <th className="w-[30%] py-6 text-[9px] font-black uppercase text-slate-400 tracking-widest italic text-left">Module Shard</th>
                <th className="w-[15%] py-6 text-[9px] font-black uppercase text-slate-400 tracking-widest italic text-center">Admin</th>
                <th className="w-[15%] py-6 text-[9px] font-black uppercase text-slate-400 tracking-widest italic text-center">Doctor</th>
                <th className="w-[15%] py-6 text-[9px] font-black uppercase text-slate-400 tracking-widest italic text-center">Staff</th>
                <th className="w-[15%] py-6 text-[9px] font-black uppercase text-slate-400 tracking-widest italic text-center">Patient</th>
                <th className="w-[10%] py-6 text-[9px] font-black uppercase text-slate-400 tracking-widest italic text-right">Edit</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-50 dark:divide-white/5">
              {permissions.map((p, i) => (
                 <tr key={i} className="group/row hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-7">
                       <div className="flex flex-col min-w-0">
                          <p className="text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-tighter truncate font-display group-hover/row:text-accent-primary transition-colors">{p.module}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 opacity-60 italic truncate leading-none">{p.description}</p>
                       </div>
                    </td>
                    <td className="py-7 text-center">
                       <div className={`mx-auto w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${p.roles.admin ? 'bg-accent-primary/10 text-accent-primary border-accent-primary/20 shadow-sm' : 'bg-slate-100 dark:bg-white/5 text-slate-300 border-transparent'}`}>
                          {p.roles.admin ? <Check size={16} strokeWidth={3} /> : <X size={16} />}
                       </div>
                    </td>
                    <td className="py-7 text-center">
                       <div className={`mx-auto w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${p.roles.doctor ? 'bg-accent-primary/10 text-accent-primary border-accent-primary/20 shadow-sm' : 'bg-slate-100 dark:bg-white/5 text-slate-300 border-transparent'}`}>
                          {p.roles.doctor ? <Check size={16} strokeWidth={3} /> : <X size={16} />}
                       </div>
                    </td>
                    <td className="py-7 text-center">
                       <div className={`mx-auto w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${p.roles.staff ? 'bg-accent-primary/10 text-accent-primary border-accent-primary/20 shadow-sm' : 'bg-slate-100 dark:bg-white/5 text-slate-300 border-transparent'}`}>
                          {p.roles.staff ? <Check size={16} strokeWidth={3} /> : <X size={16} />}
                       </div>
                    </td>
                    <td className="py-7 text-center">
                       <div className={`mx-auto w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${p.roles.patient ? 'bg-accent-primary/10 text-accent-primary border-accent-primary/20 shadow-sm' : 'bg-slate-100 dark:bg-white/5 text-slate-300 border-transparent'}`}>
                          {p.roles.patient ? <Check size={16} strokeWidth={3} /> : <X size={16} />}
                       </div>
                    </td>
                    <td className="py-7 text-right">
                       <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-accent-primary hover:bg-white dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all opacity-0 group-hover/row:opacity-100 translate-x-4 group-hover/row:translate-x-0">
                          <Edit3 size={16} />
                       </button>
                    </td>
                 </tr>
              ))}
           </tbody>
         </table>
       </div>

       <div className="mt-2 pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between relative z-10 shrink-0">
         <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic leading-none">Security Matrix Sync: Operational</span>
         <div className="flex -space-x-2">
            {[1,2,3,4].map(i => (
               <div key={i} className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-white/10 border-2 border-white dark:border-slate-900 flex items-center justify-center">
                  <Fingerprint size={12} className="text-slate-400 opacity-50" />
               </div>
            ))}
         </div>
       </div>
    </Card>
  );
}

/**
 * ⚡ SecurityPulseShard — High-Fidelity Signal
 */
export function SecurityPulseShard() {
    return (
        <Card className="p-8 rounded-[3rem] bg-slate-900 border-none flex flex-col gap-6 shadow-2als relative overflow-hidden group italic text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12">
                    <ShieldAlert size={24} className="text-accent-primary" />
                </div>
                <div className="flex flex-col">
                   <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display text-white">System Entropy</h4>
                   <span className="text-[8px] font-bold uppercase text-white/40 mt-1.5 tracking-widest">Protocol: Sealed</span>
                </div>
            </div>
            
            <div className="mt-2 space-y-1 relative z-10">
                <p className="text-3xl font-black italic tracking-tighter leading-none text-accent-primary">99.98% True</p>
                <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest italic opacity-80 mt-2">Authorization integrity verified across all clinical nodes.</p>
            </div>

            <div className="mt-auto flex flex-col gap-4 relative z-10">
               <div className="flex items-center justify-between text-[10px] font-black uppercase">
                  <span>Audit Variance</span>
                  <span className="text-emerald-500 italic">Negligible</span>
               </div>
               <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-primary w-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,1)]" />
               </div>
            </div>
        </Card>
    );
}

/**
 * 🛡️ AccessPolicyShard
 */
export function AccessPolicyShard() {
    return (
        <Card className="p-8 rounded-[3rem] bg-accent-primary text-white border-none flex flex-col gap-6 shadow-xl shadow-accent-primary/20 relative overflow-hidden group italic">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/20 shadow-sm">
                    <Lock size={18} className="text-white" />
                </div>
                <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display">Auto-Seal Protocol</h4>
            </div>
            <div className="mt-2 space-y-3 relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-relaxed">System-wide authorization revocation enabled for inactive professional nodes.</p>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Protocol Active</span>
                </div>
            </div>
            <ArrowUpRight size={20} className="mt-auto self-end opacity-40 group-hover:opacity-100 transition-opacity" />
        </Card>
    );
}
