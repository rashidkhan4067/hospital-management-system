import React from 'react';
import Card from './Card';
import { motion } from 'framer-motion';

/**
 * 📈 Premium Statistical Shard
 * Features high-fidelity icon containers, precise typography, and soft depth shadows.
 */
export default function StatsCard({ title, value, icon: Icon, color = 'var(--accent-primary)', trend }) {
  const isUp = trend?.startsWith('+');
  const isNeutral = trend?.toLowerCase() === 'stable';

  return (
    <Card className="group relative flex flex-row items-center gap-6 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 border-none bg-white dark:bg-slate-900/40 rounded-[32px] overflow-hidden">
      {/* Subtle Glow Background */}
      <div 
        className="absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: color }}
      />
      
      <div 
        className="w-14 h-14 rounded-[22px] flex items-center justify-center shrink-0 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" 
        style={{ 
          background: `color-mix(in srgb, ${color}, transparent 92%)`, 
          border: `1px solid color-mix(in srgb, ${color}, transparent 80%)`,
          color: color
        }}
      >
        {Icon && <Icon size={22} strokeWidth={2.5} />}
      </div>
      
      <div className="flex flex-col gap-0.5 min-w-0">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase italic underline decoration-transparent group-hover:decoration-accent-primary/10 transition-all">
          {value}
        </h3>
        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] mb-1">
          {title}
        </p>
        
        {trend && (
           <div className={`text-[10px] font-black flex items-center gap-1.5 uppercase tracking-widest ${
             isUp ? 'text-emerald-500' : isNeutral ? 'text-slate-400' : 'text-rose-500'
           }`}>
              <span className="opacity-40 text-[8px]">{isUp ? '↑' : isNeutral ? '•' : '↓'}</span>
              {trend}
           </div>
        )}
      </div>
    </Card>
  );
}
