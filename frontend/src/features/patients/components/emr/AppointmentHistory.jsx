import React from 'react';
import { Calendar, Stethoscope, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const STATUS_STYLES = {
  Completed:  { bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-100 dark:border-emerald-500/20', icon: 'text-emerald-500', badge: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' },
  'Follow-up': { bg: 'bg-amber-50 dark:bg-amber-500/10',   border: 'border-amber-100 dark:border-amber-500/20',   icon: 'text-amber-500',  badge: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'   },
  Pending:    { bg: 'bg-sky-50 dark:bg-sky-500/10',       border: 'border-sky-100 dark:border-sky-500/20',       icon: 'text-sky-500',    badge: 'bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400'       },
};

const DEFAULT_HISTORY = [
  { date: '2026-03-28', event: 'General Checkup', provider: 'Dr. Sarah Ahmed', dept: 'General Medicine', status: 'Completed', note: 'Patient shows signs of tactical recovery. Continue current medication.' },
  { date: '2026-02-15', event: 'Cardio Sync',      provider: 'Dr. Ali Raza',    dept: 'Cardiology',       status: 'Follow-up', note: 'BP readings within nominal range for stable discharge.' },
  { date: '2026-01-10', event: 'Initial Consultation', provider: 'Dr. Fatima Khan', dept: 'General Medicine', status: 'Completed', note: 'Identity established. Baseline clinical telemetry established.' },
];

/**
 * 📅 AppointmentHistory
 * Clean visits log consistent with system design language.
 */
export default function AppointmentHistory({ history }) {
  const data = history || DEFAULT_HISTORY;

  return (
    <div className="space-y-6">
      {/* Items */}
      <div className="space-y-4">
        {data.map((event, i) => {
          const s = STATUS_STYLES[event.status] || STATUS_STYLES.Pending;
          const Icon = event.status === 'Completed' ? CheckCircle2 : AlertCircle;
          
          return (
            <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] hover:border-slate-200 dark:hover:border-white/10 transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center ${s.icon} shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                    <Calendar size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                       <h4 className="text-[13px] font-bold text-slate-800 dark:text-white leading-tight uppercase tracking-tight">{event.event}</h4>
                       <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${s.badge}`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 opacity-60">
                       <Clock size={10} className="text-slate-400" />
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{event.date} • {event.dept}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-4 border-t border-slate-50 dark:border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                    <Stethoscope size={14} />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                    Practitioner: <span className="text-slate-700 dark:text-white/70 ml-1">{event.provider}</span>
                  </p>
                </div>
                
                {event.note && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-white/5 italic">
                    <p className="text-[11px] text-slate-500 dark:text-white/50 leading-relaxed uppercase tracking-tight">
                      "{event.note}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
