import React from 'react';
import { Pill, Clock, Plus, Activity } from 'lucide-react';

const DEFAULT_MEDS = [
  { name: 'Metformin',   dosage: '500mg', freq: '1-0-1', timing: 'After meals',    status: 'Active'  },
  { name: 'Lisinopril',  dosage: '10mg',  freq: '0-0-1', timing: 'At night',       status: 'Active'  },
  { name: 'Atorvastatin',dosage: '20mg',  freq: '0-0-1', timing: 'Bedtime',        status: 'Paused'  },
];

const STATUS_STYLES = {
  Active: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20',
  Paused: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20',
};

/**
 * 💊 CurrentMedications
 * Active prescription list — name, dosage, frequency, timing.
 */
export default function CurrentMedications({ medications, onAdd }) {
  const meds = medications || DEFAULT_MEDS;

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
            <Pill size={16} />
          </div>
          <div>
            <h3 className="text-[13px] font-black text-slate-800 dark:text-white uppercase tracking-tight">Current Medications</h3>
            <p className="text-[10px] text-slate-400 dark:text-white/30 font-medium mt-0.5">Active prescriptions</p>
          </div>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-primary text-white text-[9px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-md shadow-accent-primary/20"
        >
          <Plus size={12} /> Add
        </button>
      </div>

      {/* Medication list */}
      <div className="space-y-3">
        {meds.map((med, i) => {
          const statusStyle = STATUS_STYLES[med.status] || STATUS_STYLES.Active;
          return (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] hover:border-slate-200 dark:hover:border-white/10 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Pill size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-bold text-slate-800 dark:text-white leading-none">{med.name}</p>
                  <span className="text-[10px] font-bold text-slate-400">{med.dosage}</span>
                </div>
                <div className="flex items-center gap-4 mt-1.5">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Activity size={10} />
                    <span className="text-[10px] font-medium">{med.freq}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock size={10} />
                    <span className="text-[10px] font-medium">{med.timing}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shrink-0 ${statusStyle}`}>
                {med.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
