import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * Row 3 Right — OPDQueue
 * Waiting patients list with queue number and estimated time.
 */
const OPDQueue = ({ onNavigate }) => {
  const queue = [
    { token: 'A-001', name: 'Kamran Hussain',   dept: 'General OPD',  wait: '5 min',  priority: 'normal' },
    { token: 'A-002', name: 'Aisha Siddiqui',   dept: 'Cardiology',   wait: '12 min', priority: 'urgent' },
    { token: 'A-003', name: 'Muhammad Farooq',  dept: 'Orthopedics',  wait: '18 min', priority: 'normal' },
    { token: 'A-004', name: 'Layla Tariq',      dept: 'Neurology',    wait: '25 min', priority: 'normal' },
    { token: 'A-005', name: 'Irfan Akhtar',     dept: 'Dermatology',  wait: '30 min', priority: 'low'    },
  ];

  const priorityColor = {
    urgent: 'bg-red-500/10 text-red-500 border-red-500/20',
    normal: 'bg-accent-primary/10 text-accent-primary border-accent-primary/20',
    low:    'bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500 border-transparent',
  };

  return (
    <Card className="rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-white/70 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl h-full flex flex-col shadow-xl">
      {/* Header */}
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 flex items-center justify-between border-b border-slate-100 dark:divide-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
          <h3 className="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-white leading-none">OPD Queue</h3>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
          <Users size={12} className="text-slate-300" /> {queue.length} waiting
        </div>
      </div>

      {/* Queue */}
      <div className="flex-1 divide-y divide-slate-100 dark:divide-white/5">
        {queue.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer group"
            onClick={onNavigate}
          >
            {/* Token badge */}
            <div className={`px-2 py-1.5 rounded-xl text-[10px] font-black border ${priorityColor[p.priority]} shrink-0 tabular-nums w-16 text-center shadow-sm group-hover:scale-105 transition-transform`}>
              {p.token}
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black uppercase italic tracking-tight text-slate-900 dark:text-white truncate leading-none">{p.name}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">{p.dept}</p>
            </div>
            {/* Wait */}
            <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 tabular-nums shrink-0">
              <Clock size={11} className="text-slate-300" /> {p.wait}
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/5">
        <button onClick={onNavigate} className="w-full text-[9px] font-black uppercase tracking-widest text-accent-primary hover:tracking-widest transition-all text-center bg-transparent border-none">Manage Full Queue →</button>
      </div>
    </Card>
  );
};

export default OPDQueue;
