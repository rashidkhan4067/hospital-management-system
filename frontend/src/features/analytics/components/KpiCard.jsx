import React from 'react';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { UI_TOKENS } from '@/core/config/UI';

/**
 * 📊 KpiCard — Analytics Shard
 * Refactored to match Metric UI (StatsCard style) but with integrated telemetry.
 * Compact, premium, and data-dense.
 */
const KpiCard = ({ title, value, trend, percent, data = [], color = '#14b8a6', icon: Icon }) => {
  const isUp = trend === 'up';
  const isDown = trend === 'down';

  return (
    <div className={`${UI_TOKENS.SHARD_BASE} min-h-[140px] flex items-center gap-6 p-6 group/kpi relative overflow-hidden bg-white/50 dark:bg-slate-900/40 border-white/5`}>
      <div className={UI_TOKENS.GLOW_ACCENT} />

      {/* 🚀 Dynamic Icon Portal (Matching StatsCard) */}
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-xl group-hover/kpi:scale-110 transition-transform" 
        style={{ color: color }}
      >
        {Icon ? <Icon size={24} strokeWidth={2.5} /> : <Activity size={24} strokeWidth={2.5} />}
      </div>

      <div className="flex flex-col min-w-0 flex-1 relative z-10">
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none italic uppercase">
            {value}
          </h3>
          <div className={`text-[9px] font-black uppercase flex items-center gap-1 italic ${isUp ? 'text-emerald-500' : isDown ? 'text-rose-500' : 'text-slate-400'}`}>
            {isUp && <span>↑</span>}
            {isDown && <span>↓</span>}
            {percent}%
          </div>
        </div>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic mt-2 opacity-60 group-hover/kpi:opacity-100 transition-opacity whitespace-nowrap">
          {title}
        </p>
      </div>

      {/* 📉 Integrated Sparkline (Background Layer) */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 opacity-20 group-hover/kpi:opacity-40 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="val" 
              stroke={color} 
              strokeWidth={2} 
              dot={false}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KpiCard;
