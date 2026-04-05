import React from 'react';
import { 
  Droplets, Stethoscope, Briefcase, Activity, 
  CheckCircle, XCircle, Eye, Edit3, Trash2, User 
} from 'lucide-react';
import { Badge, Button } from '@/shared/components/ui';

/**
 * 🏢 UserIdentityTable — High-fidelity identity matrix
 * Fully DRY-compliant for use in Global Registry and Personnel Command Centers.
 */
export default function UserIdentityTable({ 
  data = [], 
  loading = false, 
  onView, 
  onEdit, 
  onToggleStatus, 
  onDelete 
}) {
  if (loading) return (
     <div className="w-full h-80 flex flex-col items-center justify-center gap-4 bg-white/50 dark:bg-slate-900/10 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 shadow-2als italic">
        <div className="w-12 h-12 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Synchronizing Identity Registries...</p>
     </div>
  );

  if (data.length === 0) return (
     <div className="w-full h-80 flex flex-col items-center justify-center gap-5 bg-white/50 dark:bg-slate-900/10 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 shadow-2als italic">
        <div className="w-16 h-16 rounded-[2rem] bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-300 dark:text-slate-700 border border-slate-200 dark:border-white/10 shadow-inner group">
           <User size={40} className="group-hover:scale-110 transition-transform opacity-30" />
        </div>
        <div className="text-center space-y-0.5">
           <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter">Identity Void</h3>
           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">No matching identity shards in the current cluster.</p>
        </div>
     </div>
  );

  return (
    <div className="w-full bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col p-4 lg:p-7 italic">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full pointer-events-none -mr-32 -mt-32" />
      
      <div className="w-full overflow-x-auto relative z-10 scrollbar-hide">
        <table className="w-full text-left border-collapse table-fixed min-w-[850px]">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/5">
              <th className="w-[30%] px-4 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest whitespace-nowrap text-left italic font-display">Identity Node</th>
              <th className="w-[18%] px-4 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap italic font-display">Cluster Matrix</th>
              <th className="w-[18%] px-4 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap italic font-display">Pulse Status</th>
              <th className="w-[15%] px-4 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center whitespace-nowrap italic font-display">Joined Shard</th>
              <th className="w-[19%] px-4 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right whitespace-nowest italic font-display">Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-white/5 text-left border-t border-slate-100 dark:border-white/5">
            {data.map((u, idx) => (
               <tr key={idx} className="group/row hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition-all duration-300">
                  <td className="px-4 py-7">
                     <div className="flex items-center gap-4">
                        <div className="relative group/avatar cursor-pointer" onClick={() => onView(u)}>
                           {u.profile_picture ? (
                              <img src={u.profile_picture} alt="" className="w-12 h-12 rounded-[1.2rem] object-cover border-2 border-white dark:border-slate-800 group-hover/avatar:rotate-6 transition-transform shadow-lg z-10 relative" />
                           ) : (
                              <div className="w-12 h-12 rounded-[1.2rem] bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 flex items-center justify-center text-accent-primary font-black text-sm uppercase border border-accent-primary/10 italic shrink-0 shadow-lg group-hover/avatar:rotate-6 transition-transform z-10 relative">
                                 {u.full_name?.charAt(0) || <User size={22} />}
                              </div>
                           )}
                           <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-sm z-20 ${u.is_active ? 'bg-emerald-500 shadow-emerald-500/40' : 'bg-slate-300'}`} />
                        </div>
                        <div className="flex flex-col min-w-0">
                           <p className="text-[14px] font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none group-hover/row:text-accent-primary transition-colors truncate font-display">
                              {u.full_name || 'Anonymous Node'}
                           </p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 truncate group-hover/row:text-slate-500 transition-colors opacity-70">
                              {u.email}
                           </p>
                        </div>
                     </div>
                  </td>

                  <td className="px-4 py-7 text-center">
                     <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white dark:bg-white/5 text-slate-500 dark:text-white/60 text-[10px] font-black uppercase italic border border-slate-200 dark:border-white/10 shadow-sm leading-none whitespace-nowrap group-hover/row:border-accent-primary/20 transition-colors">
                        {u.role === 'doctor' && <Stethoscope size={11} className="text-accent-primary" />}
                        {u.role === 'admin' && <Briefcase size={11} className="text-orange-500" />}
                        {u.role === 'patient' && <Activity size={11} className="text-indigo-500" />}
                        {u.role}
                     </div>
                  </td>

                  <td className="px-4 py-7 text-center">
                     <div className="flex flex-col items-center gap-2">
                        {u.is_active ? (
                           <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase italic border border-emerald-500/20 shadow-sm leading-none whitespace-nowrap shadow-emerald-500/5">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Live Pulse
                           </div>
                        ) : (
                           <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-400 text-[10px] font-black uppercase italic border border-slate-200 dark:border-white/10 shadow-sm leading-none whitespace-nowrap">
                              <XCircle size={13} /> Synchronized
                           </div>
                        )}
                     </div>
                  </td>

                  <td className="px-4 py-7 text-center">
                     <div className="flex flex-col items-center gap-1 shrink-0">
                        <p className="text-[13px] font-black text-slate-400 dark:text-white/40 italic tracking-tighter tabular-nums leading-none">
                           {u.date_joined ? new Date(u.date_joined).toISOString().split('T')[0] : 'Historical'}
                        </p>
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-30 mt-1.5">Alpha Registry</span>
                     </div>
                  </td>

                  <td className="px-4 py-7 text-right">
                     <div className="flex items-center justify-end gap-3 opacity-0 group-hover/row:opacity-100 transition-all translate-x-4 group-hover/row:translate-x-0">
                        <button type="button" onClick={() => onView(u)} className="w-10 h-10 rounded-[1rem] bg-white dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-accent-primary border border-slate-200 dark:border-white/10 transition-all hover:scale-110 shadow-sm active:scale-95"><Eye size={18} /></button>
                        <button type="button" onClick={() => onEdit(u)} className="w-10 h-10 rounded-[1rem] bg-white dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-orange-500 border border-slate-200 dark:border-white/10 transition-all hover:scale-110 shadow-sm active:scale-95"><Edit3 size={18} /></button>
                        <button type="button" onClick={() => onToggleStatus(u)} className={`w-10 h-10 rounded-[1rem] flex items-center justify-center border transition-all hover:scale-110 shadow-sm active:scale-95 ${u.is_active ? 'bg-rose-500/5 text-rose-500 border-rose-500/10 hover:bg-rose-500 hover:text-white' : 'bg-emerald-500/5 text-emerald-500 border-emerald-500/10 hover:bg-emerald-500 hover:text-white'}`}>
                           {u.is_active ? <XCircle size={18} /> : <CheckCircle size={18} />}
                        </button>
                        <button type="button" onClick={() => onDelete(u)} className="w-10 h-10 rounded-[1rem] bg-slate-900/5 dark:bg-white/5 flex items-center justify-center text-slate-300 hover:text-rose-500 border border-slate-200 dark:border-white/10 transition-all hover:scale-110 active:scale-95"><Trash2 size={18} /></button>
                     </div>
                  </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] italic leading-none opacity-50">Identity Core v7.2 — Neural Registry Sync Status: Verified</span>
        <div className="flex gap-2">
          <Button className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 p-0 shadow-sm min-w-0 hover:border-accent-primary transition-colors">&lt;</Button>
          <Button className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-accent-primary text-white border-none p-0 shadow-lg font-black italic shadow-accent-primary/20 min-w-0 text-[11px] hover:scale-105 transition-all">01</Button>
          <Button className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10 p-0 shadow-sm min-w-0 hover:border-accent-primary transition-colors">&gt;</Button>
        </div>
      </div>
    </div>
  );
}
