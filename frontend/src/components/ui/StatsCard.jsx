import React from 'react';
import Card from './Card';

export default function StatsCard({ title, value, icon: Icon, color = '#6366f1', trend }) {
  return (
    <Card className="group relative flex flex-row items-center gap-6 p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 active:scale-[0.98] cursor-default overflow-hidden glass-panel border-white/5">
      {/* Decorative background glow */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-5 group-hover:opacity-10 transition-opacity -z-10"
        style={{ background: color }}
      />
      
      <div 
        className="p-4 rounded-2xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-black/20" 
        style={{ 
          background: `${color}15`, 
          border: `1px solid ${color}30`,
          color: color
        }}
      >
        {Icon && <Icon size={24} />}
      </div>
      
      <div className="flex-1 space-y-1">
        <h3 className="text-3xl font-extrabold text-white tracking-tight leading-none">
          {value}
        </h3>
        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em]">
          {title}
        </p>
        
        {trend && (
           <div className={`text-[10px] font-black mt-2 flex items-center gap-1 uppercase tracking-widest ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              <span className="opacity-60">{trend.startsWith('+') ? '↑' : '↓'}</span> {trend}
           </div>
        )}
      </div>
    </Card>
  );
}
