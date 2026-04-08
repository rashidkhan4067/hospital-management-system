import React from 'react';
import Card from './Card';
import { motion } from 'framer-motion';

/**
 * 📈 Premium Statistical Shard (MetricShard)
 * High-fidelity icon containers, precise typography, and soft depth shadows.
 * This is the foundational atomic primitive for all numerical telemetry.
 */
export default function MetricShard({ title, value, icon: Icon, color = 'var(--accent-primary)', trend, onClick, className = '' }) {
  const isUp = trend?.toLowerCase().includes('up') || trend?.startsWith('+');
  const isNeutral = trend?.toLowerCase().includes('stable') || trend?.toLowerCase().includes('sync') || trend?.toLowerCase().includes('real-time') || trend?.toLowerCase().includes('ok');

  // 🛡️ Robust Icon Resolution Logic
  const renderIcon = (size, stroke) => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) return Icon;
    const IconComp = Icon;
    return <IconComp size={size} strokeWidth={stroke} />;
  };

  return (
    <Card 
      onClick={onClick}
      className={`matrix-card group flex flex-row items-center gap-4 sm:gap-5 p-4 sm:p-5 border border-transparent hover:border-accent-primary/10 transition-all duration-500 relative overflow-hidden bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl shadow-xl hover:shadow-2xl rounded-3xl sm:rounded-[2.5rem] ${onClick ? 'cursor-pointer sm:hover:scale-[1.03] active:scale-[0.98]' : 'cursor-default'} ${className}`}
    >
      {/* 🚀 Dynamic Icon Portal */}
      <div 
        className="w-14 h-14 rounded-[22px] flex items-center justify-center shrink-0 shadow-lg transition-all duration-700 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-accent-primary/20" 
        style={{ color: color }}
      >
        {renderIcon(24, 2.5)}
      </div>
      
      {/* 📊 Intelligence Matrix */}
      <div className="flex flex-col min-w-0 justify-center">
        <div className="flex items-baseline gap-2">
           <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none uppercase italic tabular-nums">
             {value}
           </h3>
           {trend && (
             <div className={`text-[8px] font-black flex items-center gap-0.5 uppercase tracking-tighter italic ${
               isUp || isNeutral ? 'text-accent-primary' : 'text-rose-500'
             }`}>
                {isUp && <span>↑</span>}
                {isNeutral && <span className="mr-0.5 animate-pulse">•</span>}
                {!isUp && !isNeutral && <span>↓</span>}
                {trend}
             </div>
           )}
        </div>
        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] italic mt-2 opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {title}
        </p>
      </div>

      {/* 🔮 Background Geometric Shard */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-700 pointer-events-none" style={{ color: color }}>
          {renderIcon(96, 1)}
      </div>
    </Card>
  );
}
