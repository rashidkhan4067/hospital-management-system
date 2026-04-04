import React from 'react';
import { ShieldAlert, Thermometer, UserCheck, ClipboardList } from 'lucide-react';

const TYPE_STYLES = {
  Allergy: { bg: 'bg-rose-50 dark:bg-rose-500/10', border: 'border-rose-100 dark:border-rose-500/20', icon: 'text-rose-500', badge: 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400' },
  Chronic: { bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-100 dark:border-amber-500/20', icon: 'text-amber-500', badge: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  Surgery: { bg: 'bg-sky-50 dark:bg-sky-500/10',   border: 'border-sky-100 dark:border-sky-500/20',   icon: 'text-sky-500',  badge: 'bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400'   },
};

const DEFAULT_HISTORY = [
  { type: 'Allergy', Icon: ShieldAlert, label: 'Allergic Rhinitis',        note: 'Seasonal — Managed with antihistamines' },
  { type: 'Chronic', Icon: Thermometer, label: 'Hypertension',             note: 'Stage 1 — Controlled with medication' },
  { type: 'Surgery', Icon: UserCheck,   label: 'Appendectomy (2024)',      note: 'Laparoscopic — Full recovery confirmed' },
];

/**
 * 🏥 MedicalHistory
 * Clean list of allergies, chronic conditions, and surgical history.
 */
export default function MedicalHistory({ historyData }) {
  const items = historyData || DEFAULT_HISTORY;

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
          <ClipboardList size={16} />
        </div>
        <div>
          <h3 className="text-[13px] font-black text-slate-800 dark:text-white uppercase tracking-tight">Medical History</h3>
          <p className="text-[10px] text-slate-400 dark:text-white/30 font-medium mt-0.5">Conditions, allergies & procedures</p>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item, i) => {
          const s = TYPE_STYLES[item.type] || TYPE_STYLES.Chronic;
          const Icon = item.Icon;
          return (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border ${s.bg} ${s.border} transition-all hover:scale-[1.01] group`}>
              <div className={`w-10 h-10 rounded-xl bg-white dark:bg-slate-950 border ${s.border} flex items-center justify-center ${s.icon} shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-slate-800 dark:text-white leading-snug">{item.label}</p>
                <p className="text-[10px] text-slate-500 dark:text-white/40 mt-0.5 truncate">{item.note}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shrink-0 ${s.badge}`}>
                {item.type}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
