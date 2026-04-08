import React from 'react';
import Card from './Card';
import { motion } from 'framer-motion';

/**
 * 📈 Premium Statistical Shard (MetricShard)
 * High-fidelity icon containers, precise typography, and status-aware telemetry.
 * status: 'good' | 'warning' | 'critical' | 'default'
 */
export default function MetricShard({ 
  title, 
  value, 
  icon: Icon, 
  status = 'default',
  trend, 
  onClick, 
  loading = false,
  className = '' 
}) {
  
  // 🎨 Status Matrix Mapping
  const statusColors = {
    good:     'text-emerald-500 bg-emerald-500/5 border-emerald-500/20',
    warning:  'text-amber-500 bg-amber-500/5 border-amber-500/20',
    critical: 'text-rose-500 bg-rose-500/5 border-rose-500/20',
    default:  'text-accent-primary bg-accent-primary/5 border-accent-primary/20'
  };

  const statusColor = statusColors[status] || statusColors.default;

  const renderIcon = (size, stroke) => {
    if (!Icon) return null;
    
    // If it's already a JSX element (e.g. <Users />), return it as-is
    if (React.isValidElement(Icon)) return Icon;
    
    // If it's a component reference (e.g. Users), render it with props
    const IconComp = Icon;
    return <IconComp size={size} strokeWidth={stroke} />;
  };

  if (loading) {
    return (
      <Card className={`flex flex-row items-center gap-5 p-5 animate-pulse bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] border-none ${className}`}>
        <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-3 flex-1">
          <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </Card>
    );
  }

  return (
    <Card 
      onClick={onClick}
      className={`matrix-card group flex flex-row items-center gap-5 p-5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all duration-500 relative overflow-hidden bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl shadow-xl hover:shadow-2xl rounded-[2.5rem] ${onClick ? 'cursor-pointer hover:scale-[1.03] active:scale-[0.98]' : 'cursor-default'} ${className}`}
    >
      {/* 🚀 Dynamic Icon Portal */}
      <div className={`w-14 h-14 rounded-[22px] flex items-center justify-center shrink-0 shadow-lg transition-all duration-700 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 group-hover:scale-110 group-hover:rotate-6 ${statusColor.split(' ')[0]}`}>
        {renderIcon(24, 2.5)}
      </div>
      
      {/* 📊 Intelligence Matrix */}
      <div className="flex flex-col min-w-0 justify-center">
        <div className="flex items-baseline gap-2">
           <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none uppercase italic tabular-nums">
             {(value !== undefined && value !== null && value !== '') ? value : '--'}
           </h3>
           {trend && (
             <div className={`text-[8px] font-black uppercase tracking-tighter italic ${statusColor.split(' ')[0]}`}>
                {trend}
             </div>
           )}
        </div>
        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] italic mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
          {title}
        </p>
      </div>

      {/* 🔮 Background Geometric Shard */}
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-700 pointer-events-none ${statusColor.split(' ')[0]}`}>
          {renderIcon(96, 1)}
      </div>
    </Card>
  );
}
