import React from 'react';

/**
 * 🧑‍🔬 PatientRow
 * Avatar initials, name, badge for blood group, last visit date, "View EMR" button.
 */
export default function PatientRow({ patient, onRowClick }) {
  const initials = (patient.full_name || '??')
    .split(' ')
    .filter(n => n)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      onClick={() => onRowClick?.(patient)}
      className="flex items-center gap-5 group cursor-pointer animate-in fade-in transition-all"
    >
      {/* Avatar Node */}
      <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 border-2 border-accent-primary/25 flex items-center justify-center text-accent-primary text-[10px] font-black uppercase group-hover:scale-110 transition-all shadow-inner">
        {initials}
      </div>
      
      {/* Text Shards */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-tight group-hover:text-accent-primary transition-colors">
            {patient.full_name?.replace(' NODE', '').replace(' SHARD', '') || 'Anonymous Identity'}
          </p>
          {patient.is_admitted && (
             <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)] shrink-0" title="Active Admission" />
          )}
        </div>
        <div className="flex items-center gap-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
           <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest tabular-nums shrink-0">
              #{patient.id} • Registered Registry
           </p>
           <span className="opacity-20 text-slate-400 shrink-0">|</span>
           <span className="text-[8px] font-black text-accent-primary/60 uppercase tracking-widest">
              {patient.gender || 'GENDER'} HUB
           </span>
        </div>
      </div>
    </div>
  );
}
