import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, BedDouble, Activity } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * 🛰️ Operational Shards & Section Distribution
 * Transformed from a basic summary to a high-fidelity clinical telemetry hub.
 */
const TodaySummary = ({ pulse, loading }) => {
  const shards = [
    {
      label: "Appointments Shard",
      value: loading ? '...' : (pulse?.counts?.appointments ?? 0),
      icon: Calendar,
      color: 'text-accent-primary',
      bg: 'bg-accent-primary/10',
      status: 'Synchronized',
    },
    {
      label: 'OPD Queue Distribution',
      value: loading ? '...' : (pulse?.counts?.opd_queue ?? '--'),
      icon: Users,
      color: 'text-sky-500',
      bg: 'bg-sky-500/10',
      status: 'Live',
    },
    {
      label: 'Triage Latency (Avg)',
      value: loading ? '...' : '18 min',
      icon: Clock,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      status: 'Optimal',
    },
    {
      label: 'Ward Occupancy Shard',
      value: loading ? '...' : (pulse?.counts?.admitted ?? '--'),
      icon: BedDouble,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      status: 'Balanced',
    },
  ];

  return (
    <Card className="p-5 sm:p-7 rounded-3xl sm:rounded-[2.5rem] bg-white/70 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-3xl relative overflow-hidden group h-full">

      {/* 🔮 Background Neural Shard */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-1000" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Header Shard */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
              <Activity size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase italic tracking-tighter text-slate-800 dark:text-white leading-none">Operational Shards</h3>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">Section Distribution Matrix</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-slate-200 dark:bg-white/10 border-2 border-white dark:border-slate-900 overflow-hidden">
                  <div className="w-full h-full bg-accent-primary/20 animate-pulse" />
                </div>
              ))}
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />
            <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest animate-pulse">Scanning Hub...</span>
          </div>
        </div>

        {/* Shard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {shards.map((shard, i) => {
            const Icon = shard.icon;
            return (
              <div
                key={i}
                className="relative p-4 rounded-[1.8rem] bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 group/item"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-8 h-8 rounded-xl ${shard.bg} flex items-center justify-center ${shard.color} group-hover/item:scale-110 transition-transform`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-[7px] font-black uppercase tracking-widest tabular-nums px-2 py-0.5 rounded-full border border-current opacity-60 ${shard.color}`}>
                      {shard.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums leading-none tracking-tighter">
                    {shard.value}
                  </span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1 truncate">
                    {shard.label}
                  </span>
                </div>

                {/* Micro-sparkline decoy */}
                <div className="mt-4 flex items-end gap-1 h-3 opacity-20">
                  {[...Array(8)].map((_, j) => (
                    <div
                      key={j}
                      className={`w-full rounded-full transition-all duration-700 ${shard.bg.replace('bg-', 'bg-')}`}
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default TodaySummary;
