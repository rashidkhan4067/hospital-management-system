import React from 'react';
import { motion } from 'framer-motion';
import { ServerCog, Wifi, Database, Bot } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * Row 5 — SystemHealth
 * API status, DB connection, Sana AI uptime with coloured dots.
 */
const SystemHealth = ({ onNavigate }) => {
  const systems = [
    { label: 'API Server',    status: 'Online',    uptime: '99.9%', icon: Wifi,      color: 'text-emerald-500', dot: 'bg-emerald-500' },
    { label: 'Database',      status: 'Connected', uptime: '100%',  icon: Database,  color: 'text-emerald-500', dot: 'bg-emerald-500' },
    { label: 'Sana AI',       status: 'Active',    uptime: '98.2%', icon: Bot,       color: 'text-accent-primary', dot: 'bg-accent-primary' },
    { label: 'Billing Engine',status: 'Running',   uptime: '99.5%', icon: ServerCog, color: 'text-sky-500', dot: 'bg-sky-500' },
  ];

  return (
    <Card className="relative bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/40 dark:border-white/5 rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-7 shadow-2xl overflow-hidden group transition-all duration-700 cursor-pointer hover:border-accent-primary/20" onClick={onNavigate}>
      <div className="flex items-center gap-2 mb-6">
        <ServerCog size={13} className="text-sky-500" />
        <h3 className="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-white leading-none">System Health</h3>
      </div>

      <div className="space-y-3">
        {systems.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5"
            >
              <div className={`w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 ${s.color}`}>
                <Icon size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black uppercase tracking-tight text-slate-700 dark:text-slate-300 leading-none">{s.label}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{s.status}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
                <span className="text-[9px] font-black text-slate-500 tabular-nums">{s.uptime}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SystemHealth;
