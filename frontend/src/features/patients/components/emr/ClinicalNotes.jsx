import React from 'react';
import { FileText, ShieldCheck, Clock, Trash2, Edit2, ClipboardList } from 'lucide-react';

const DEFAULT_NOTES = [
  { id: 1, date: '3h ago', dr: 'Dr. Sarah Ahmed', note: 'Patient shows tactical improvement in post-surgical node. Transitioning to outpatient matrix for stable recovery.', status: 'Latest' },
  { id: 2, date: '2d ago', dr: 'Clinical Lab 1', note: 'Bio-readings synchronized. Metabolism within nominal range for current drug intake.', status: 'Archived' },
  { id: 3, date: 'Jan 10, 2026', dr: 'Dr. Ali Raza', note: 'Baseline clinical telemetry established. No significant allergic shards detected during initial scan.', status: 'Archived' }
];

/**
 * 📝 ClinicalNotes
 * Clean diagnostic observation log matching the system design.
 */
export default function ClinicalNotes({ notes }) {
  const data = notes || DEFAULT_NOTES;

  return (
    <div className="space-y-6">
      {/* Items */}
      <div className="space-y-4">
        {data.map((n, i) => (
          <div key={n.id} className="flex flex-col gap-5 p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] hover:border-slate-200 dark:hover:border-white/10 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary border border-accent-primary/20 flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110`}>
                  <ClipboardList size={16} />
                </div>
                <div>
                   <div className="flex items-center gap-2">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{n.date} • <span className="text-accent-primary underline underline-offset-4 decoration-accent-primary/10 ml-1">{n.dr}</span></p>
                   </div>
                   <h4 className="text-[13px] font-bold text-slate-800 dark:text-white uppercase tracking-tight mt-1">Diagnostic Shard #{n.id}</h4>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-[8px] font-black uppercase text-slate-400 tracking-widest italic group-hover:bg-accent-primary/10 group-hover:text-accent-primary group-hover:border-accent-primary/20 transition-all">
                {n.status}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-white/5 italic">
              <p className="text-[12px] font-bold text-slate-600 dark:text-slate-300 uppercase leading-relaxed tracking-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                "{n.note}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-white/[0.04]">
               <div className="flex items-center gap-2 text-slate-400 opacity-60">
                 <ShieldCheck size={11} className="text-emerald-500" />
                 <span className="text-[8px] font-black uppercase tracking-[0.2em] italic">Authorized Clinical Signature Shard Verified</span>
               </div>
               
               {n.status === 'Latest' && (
                 <div className="flex items-center gap-1">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-accent-primary hover:bg-accent-primary/5 transition-all">
                       <Edit2 size={12} />
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-500/5 transition-all">
                       <Trash2 size={12} />
                    </button>
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
