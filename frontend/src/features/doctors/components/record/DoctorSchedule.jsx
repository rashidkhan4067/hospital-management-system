import React from 'react';
import { Clock, Calendar, RefreshCw } from 'lucide-react';

const DEFAULT_SCHEDULE = [
  { day: 'Monday', time: '09:00 AM - 05:00 PM', status: 'Active' },
  { day: 'Wednesday', time: '09:00 AM - 05:00 PM', status: 'Active' },
  { day: 'Friday', time: '09:00 AM - 02:00 PM', status: 'Active' },
];

/**
 * 🛰 DoctorSchedule
 * Weekly clinical schedule — consistent with system card design language.
 */
export default function DoctorSchedule({ schedule = DEFAULT_SCHEDULE, onUpdate }) {
  return (
    <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-slate-200 dark:border-white/[0.06] overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
            <Clock size={16} />
          </div>
          <div>
            <h3 className="text-[12px] font-black text-slate-800 dark:text-white uppercase tracking-tight">Active Schedule</h3>
            <p className="text-[9px] text-slate-400 dark:text-white/30 font-medium">Standard Weekly Rotation</p>
          </div>
        </div>
        <button 
          onClick={onUpdate}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-accent-primary hover:bg-accent-primary/10 transition-all"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Schedule Items */}
      <div className="p-4 space-y-2">
        {schedule.map((shift, i) => (
          <div 
            key={i} 
            className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] hover:border-accent-primary/20 transition-all group"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-slate-900 dark:text-white tracking-widest">{shift.day}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-wider">{shift.time}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 shadow-sm opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest leading-none">Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
