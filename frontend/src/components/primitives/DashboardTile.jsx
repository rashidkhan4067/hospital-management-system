import React from 'react';
import Card from './Card';

/**
 * 🧱 DashboardTile
 * A high-fidelity, interactive block used for building dashboard layouts.
 * Supports highlighting, iconography, and structured content.
 */
export default function DashboardTile({ 
  title, 
  subtitle, 
  icon: Icon, 
  iconColor = 'text-accent-primary', 
  actions,
  children,
  className = '',
  variant = 'default' 
}) {
  const styles = {
    default: 'bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl border-slate-200 dark:border-white/5',
    accent: 'bg-accent-primary text-white border-none shadow-2xl shadow-accent-primary/30',
    warning: 'bg-orange-500 text-white border-none shadow-xl shadow-orange-500/10',
    danger: 'bg-rose-500 text-white border-none shadow-xl shadow-rose-500/10',
  };

  const currentStyles = styles[variant] || styles.default;

  return (
    <Card className={`p-8 rounded-[48px] border flex flex-col gap-6 relative overflow-hidden transition-all duration-500 shadow-2als group ${currentStyles} ${className}`}>
      {/* 🛸 Secondary Shard Background Effect */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-[3s] pointer-events-none" />
      
      {/* 🧭 Tile Header Cluster */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className={`w-12 h-12 rounded-[22px] flex items-center justify-center shrink-0 shadow-lg transition-all duration-700 bg-white/10 border border-white/10 ${variant === 'default' ? iconColor : 'text-white'}`}>
              <Icon size={24} strokeWidth={2.5} />
            </div>
          )}
          <div className="space-y-1">
            <h3 className={`text-xl font-black uppercase italic tracking-tighter leading-none ${variant === 'default' ? 'text-slate-800 dark:text-white' : 'text-white'}`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`text-[9px] font-bold uppercase tracking-widest mt-1.5 opacity-60 leading-none ${variant === 'default' ? 'text-slate-400' : 'text-white/80'}`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* 🛰 Tile Core Content Assembly */}
      <div className="relative z-10 flex-1">
        {children}
      </div>
    </Card>
  );
}
