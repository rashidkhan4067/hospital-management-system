import React from 'react';
import { Heart, Thermometer, Activity, Zap, User, Edit2, RefreshCw } from 'lucide-react';

const VITALS = [
  { key: 'bp',     label: 'Blood Pressure', unit: 'mmHg', Icon: Activity,    color: 'text-rose-500',   bg: 'bg-rose-50   dark:bg-rose-500/10',   border: 'border-rose-100 dark:border-rose-500/20'   },
  { key: 'bpm',    label: 'Pulse Rate',     unit: 'BPM',  Icon: Heart,       color: 'text-sky-500',    bg: 'bg-sky-50    dark:bg-sky-500/10',    border: 'border-sky-100  dark:border-sky-500/20'    },
  { key: 'temp',   label: 'Temperature',    unit: '°C',   Icon: Thermometer, color: 'text-amber-500',  bg: 'bg-amber-50  dark:bg-amber-500/10',  border: 'border-amber-100 dark:border-amber-500/20' },
  { key: 'weight', label: 'Weight',         unit: 'kg',   Icon: Zap,         color: 'text-emerald-500',bg: 'bg-emerald-50 dark:bg-emerald-500/10',border: 'border-emerald-100 dark:border-emerald-500/20'},
  { key: 'height', label: 'Height',         unit: 'cm',   Icon: User,        color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-500/10', border: 'border-violet-100 dark:border-violet-500/20'},
];

/**
 * 🛰 PatientVitals
 * Clean live vitals telemetry — consistent with system card design language.
 */
export default function PatientVitals({ vitals = {}, onUpdate }) {
  const data = {
    bp:     vitals.bp     || '120/80',
    bpm:    vitals.bpm    || '72',
    temp:   vitals.temp   || '36.6',
    weight: vitals.weight || '70',
    height: vitals.height || '175',
  };

  return (
    <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/[0.06] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
            <Activity size={16} />
          </div>
          <div>
            <h3 className="text-[12px] font-black text-slate-800 dark:text-white uppercase tracking-tight">Live Vitals</h3>
            <p className="text-[9px] text-slate-400 dark:text-white/30 font-medium">Last updated 4 min ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Live</span>
          </div>
          <button
            onClick={onUpdate}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-accent-primary hover:bg-accent-primary/10 transition-all"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Vitals Grid */}
      <div className="p-4 grid grid-cols-1 gap-2">
        {VITALS.map(({ key, label, unit, Icon, color, bg, border }) => (
          <div
            key={key}
            className={`flex items-center gap-3 p-3 rounded-xl border ${bg} ${border} group`}
          >
            <div className={`w-9 h-9 rounded-xl bg-white dark:bg-slate-950 border ${border} flex items-center justify-center ${color} shrink-0 shadow-sm`}>
              <Icon size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest leading-none">{label}</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className={`text-[18px] font-black tabular-nums leading-none ${color}`}>{data[key]}</span>
                <span className="text-[9px] font-bold text-slate-400 dark:text-white/30 uppercase">{unit}</span>
              </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 transition-all w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-accent-primary hover:bg-white dark:hover:bg-white/10">
              <Edit2 size={11} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
