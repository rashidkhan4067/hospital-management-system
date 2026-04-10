import React from 'react';
import { Calendar, User, Clock, CheckCircle2 } from 'lucide-react';

const DEFAULT_HISTORY = [
  { date: '2026-03-28', patient: 'Ellen Ripley', type: 'Consultation', status: 'Completed' },
  { date: '2026-02-15', patient: 'John Doe',     type: 'Follow-up',    status: 'Completed' },
  { date: '2026-01-10', patient: 'Sarah Connor', type: 'Emergency',    status: 'Completed' },
];

/**
 * 📅 DoctorHistory
 * Clean visits log consistent with system design language.
 */
export default function DoctorHistory({ history }) {
  const data = history || DEFAULT_HISTORY;

  return (
    <div className="space-y-6">
      {/* Items */}
      <div className="space-y-4">
        {data.map((app, i) => {
          const initials = app.patient.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
          
          return (
            <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] hover:border-slate-200 dark:hover:border-white/10 transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary shrink-0 shadow-sm group-hover:scale-110 transition-transform font-black text-xs`}>
                    {initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                       <h4 className="text-[13px] font-bold text-slate-800 dark:text-white leading-tight uppercase tracking-tight">{app.patient}</h4>
                       <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 shadow-sm`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 opacity-60">
                       <Clock size={10} className="text-slate-400" />
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{app.date} • {app.type}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-50 dark:border-white/[0.04]">
                <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0 opacity-60">
                  <Calendar size={14} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                  Established Protocol: <span className="text-slate-700 dark:text-white/70 ml-1">Clinical {app.type} Shard Synchronized</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
