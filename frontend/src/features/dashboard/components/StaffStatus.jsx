import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin } from 'lucide-react';
import { Card } from '@/components/primitives';

/**
 * 🏥 Staff Status Shard
 * Similar UI to Recent Patients but tracks clinical staff.
 */
const StaffStatus = ({ onNavigate }) => {
  const staff = [
    { name: 'Dr. Sarah Khan',   status: 'On Duty',    node: 'Ward A',   initials: 'SK', color: 'text-emerald-500' },
    { name: 'Nurse Ahmed',      status: 'In Surgery', node: 'OT-02',    initials: 'RA', color: 'text-rose-500' },
    { name: 'Dr. Zainab Ali',   status: 'On Break',   node: 'Lounge',   initials: 'ZA', color: 'text-amber-500' },
    { name: 'Technician Bilal', status: 'In Lab',     node: 'Pathology',initials: 'KB', color: 'text-sky-500' },
    { name: 'Dr. Usman Mir',    status: 'On Duty',    node: 'ER-01',    initials: 'UM', color: 'text-emerald-500' },
  ];

  return (
    <Card className="rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-white/70 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl h-full flex flex-col shadow-xl">
      {/* Header */}
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_8px_#0ea5e9]" />
          <h3 className="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-white leading-none">Clinical Staff</h3>
        </div>
        <button onClick={onNavigate} className="text-[9px] font-black uppercase tracking-widest text-accent-primary hover:tracking-widest transition-all bg-transparent border-none">Roster →</button>
      </div>

      <div className="flex-1 divide-y divide-slate-100 dark:divide-white/5">
        {staff.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/5 dark:to-transparent border border-slate-200 dark:border-white/10 flex items-center justify-center text-[11px] font-black text-slate-700 dark:text-slate-300 shrink-0 group-hover:border-accent-primary/30 group-hover:scale-110 transition-all">
              {s.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black uppercase italic tracking-tight text-slate-900 dark:text-white truncate leading-none">{s.name}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`text-[8px] font-black uppercase tracking-widest ${s.color}`}>{s.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 shrink-0">
              <MapPin size={10} className="text-slate-300" /> {s.node}
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-6 py-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/5">
          <div className="flex items-center justify-between">
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Node: STAFF-PULSE</span>
              <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500 animate-pulse italic">24 Active Now</span>
          </div>
      </div>
    </Card>
  );
};

export default StaffStatus;
