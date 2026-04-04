import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * 🌠 UnifiedHeroCTA — Premium Universal Command Shard
 * Highly configurable dark hero shard with glassmorphic depth and dynamic action nodes.
 * Replaces: WelcomeCTA, PatientCTA, AppointmentCTA.
 */
const UnifiedHeroCTA = ({ 
  title, 
  subtitle, 
  pillPrefix, 
  pillIcon: PillIcon,
  actions = [], 
  className = '',
  accentGlow = 'bg-accent-primary/10',
  compact = false
}) => {
  return (
    <Card className={`relative overflow-hidden ${compact ? 'p-6 sm:p-8' : 'p-6 sm:p-10'} rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/5 shadow-2xals group/cta mb-8 ${className}`}>
      
      {/* 🔮 Atmospheric Depth Layers */}
      <div className={`absolute top-0 right-0 w-[400px] h-[400px] ${accentGlow} blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none group-hover/cta:scale-110 transition-transform duration-1000`} />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-white/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className={`relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 ${compact ? 'lg:gap-8' : 'lg:gap-12'}`}>
        
        {/* Left Section: Information Matrix */}
        <div className={`flex-1 ${compact ? 'space-y-3' : 'space-y-4 sm:space-y-6'}`}>
          {(pillPrefix || PillIcon) && (
            <div className="flex items-center gap-3">
              <div className={`${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded-2xl bg-accent-primary/20 flex items-center justify-center text-accent-primary shadow-inner border border-accent-primary/30 transition-all`}>
                {PillIcon && <PillIcon size={compact ? 16 : 20} />}
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent-primary/80 italic leading-none">
                {pillPrefix}
              </span>
            </div>
          )}
          
          <div className={`${compact ? 'space-y-2' : 'space-y-3 sm:space-y-4'}`}>
            <h2 className={`font-black text-white tracking-tighter leading-none italic uppercase ${compact ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-5xl lg:text-5xl'}`}>
              {title}
            </h2>
            <p className={`${compact ? 'text-[10px] sm:text-[11px]' : 'text-[11px] sm:text-[13px]'} font-bold text-slate-400 uppercase tracking-widest max-w-2xl leading-relaxed italic`}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Section: Action Nodes Matrix */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0`}>
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={action.onClick}
              className={`group/btn relative ${compact ? 'px-5 py-3' : 'px-6 py-4 sm:py-5'} rounded-2xl bg-white/5 border border-white/10 hover:border-accent-primary/50 transition-all duration-500 flex items-center gap-4 text-left overflow-hidden ${compact ? 'min-w-[180px]' : 'min-w-[220px]'}`}
            >
              <div className="absolute inset-0 bg-accent-primary/0 group-hover/btn:bg-accent-primary/5 transition-colors" />
              <div className={`${compact ? 'w-8 h-8' : 'w-10 h-10 sm:w-12 sm:h-12'} rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover/btn:scale-110 transition-transform`}>
                {action.icon && <action.icon size={compact ? 18 : 22} />}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <p className="text-[10px] font-black text-white uppercase tracking-wider leading-none truncate">{action.title}</p>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1.5 truncate">{action.subtitle}</p>
              </div>
              <ArrowRight size={14} className="ml-2 text-slate-600 group-hover/btn:text-accent-primary group-hover/btn:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* 🚀 Visual Decoy Sparkline */}
      <div className="absolute bottom-0 right-0 left-0 h-[3px] bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent opacity-30 shadow-[0_0_15px_rgba(45,212,191,0.2)]" />
    </Card>
  );
};

export default UnifiedHeroCTA;
