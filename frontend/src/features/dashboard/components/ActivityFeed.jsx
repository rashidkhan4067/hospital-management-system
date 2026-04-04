import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * Row 3 — ActivityFeed
 * Real-time actions — "Ahmed booked via Sana", "Dr. Ali confirmed".
 */
const ActivityFeed = ({ logs = [] }) => {
  // Fallback feed if no live data
  const feed = logs.length > 0 ? logs.slice(0, 6) : [
    { title: 'Ahmed booked via Sana AI',     time: '2 min ago', status: 'Success', node: 'AI Booking' },
    { title: 'Dr. Ali confirmed appointment', time: '5 min ago', status: 'Success', node: 'Doctor' },
    { title: 'Invoice #INV-A9F3 generated',   time: '9 min ago', status: 'Success', node: 'Billing' },
    { title: 'Fatima Malik admitted to Ward 2',time: '14 min ago',status: 'Success', node: 'IPD' },
    { title: 'Stock alert: Paracetamol low',  time: '22 min ago',status: 'Warning', node: 'Pharmacy' },
    { title: 'New patient Sara registered',   time: '35 min ago',status: 'Success', node: 'EMR' },
  ];

  const statusColor = {
    Success: 'bg-emerald-500',
    Warning: 'bg-amber-500',
    Error:   'bg-red-500',
  };

  return (
    <Card className="rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-white/70 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl h-full flex flex-col shadow-xl">
      {/* Header */}
      <div className="px-5 sm:px-7 pt-5 sm:pt-7 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-2">
          <Zap size={13} className="text-amber-500" />
          <h3 className="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-white leading-none">Activity Feed</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Live</span>
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/5">
        {feed.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 px-5 py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
          >
            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${statusColor[item.status] || 'bg-slate-300'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight">{item.title}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.node}</p>
            </div>
            <span className="text-[8px] font-bold text-slate-400 tabular-nums shrink-0 whitespace-nowrap">{item.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityFeed;
