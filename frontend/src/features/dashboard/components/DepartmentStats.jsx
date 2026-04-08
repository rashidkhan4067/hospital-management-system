import React from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Users } from 'lucide-react';
import { Card } from '@/components/primitives';

/**
 * 🏢 Department Performance Matrix
 * Customized to be a high-fidelity 'Section Distribution' shard.
 */
const DepartmentStats = ({ onNavigate }) => {
  const depts = [
    { name: 'Cardiology', load: 82, color: '#06b6d4', icon: 'CD' },
    { name: 'Pediatrics', load: 45, color: '#10b981', icon: 'PD' },
    { name: 'Orthopedics', load: 68, color: '#f59e0b', icon: 'OR' },
    { name: 'Neurology',  load: 91, color: '#ef4444', icon: 'NL' },
  ];

  return (
    <Card className="relative p-5 sm:p-7 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 border border-white/5 shadow-2xl h-full flex flex-col group overflow-hidden">
      
      {/* 🌌 Atmospheric Glow */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-sky-500/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 border-b border-white/5 pb-4 sm:pb-5 relative z-10">
        <div className="flex items-center gap-2 sm:gap-3">
           <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-400 shadow-inner group-hover:rotate-6 transition-transform">
             <Building2 size={16} className="sm:w-5 sm:h-5" />
           </div>
           <div>
             <h3 className="text-[11px] sm:text-sm font-black uppercase italic tracking-tighter text-white leading-none">Dept Load</h3>
             <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30 mt-0.5 sm:mt-1">Section Distribution Matrix</p>
           </div>
        </div>
        <button onClick={onNavigate} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-sky-400 hover:border-sky-400/30 transition-all border-none">
           <TrendingUp size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Dept List */}
      <div className="flex-1 flex flex-col justify-between space-y-5 sm:space-y-6 relative z-10">
        {depts.map((dept, i) => (
          <div 
            key={i}
            className="space-y-2.5 sm:space-y-3"
          >
            <div className="flex justify-between items-end px-1">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-widest text-white/50 flex items-center gap-2 sm:gap-2.5">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full shadow-lg" style={{ backgroundColor: dept.color, boxShadow: `0 0 10px ${dept.color}88` }} />
                {dept.name}
              </span>
              <span className="text-[11px] sm:text-[14px] font-black text-white tabular-nums tracking-tighter leading-none">
                {dept.load}%
              </span>
            </div>
            
            <div className="h-2 sm:h-2.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div 
                style={{ width: `${dept.load}%`, backgroundColor: dept.color }}
                className="h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_-3px_rgba(0,0,0,0.5)] relative"
              >
                <div className="absolute inset-0 bg-white/30 blur-[1px] rounded-full opacity-50" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 sm:pt-5 border-t border-white/5 flex items-center justify-between relative z-10">
         <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-white/5 flex items-center justify-center text-white/30">
                <Users size={12} className="sm:w-3.5 sm:h-3.5" />
            </div>
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white/30">Staff Count: 124</span>
         </div>
         <span className="px-2 sm:px-3 py-1 bg-sky-500/10 text-sky-400 text-[7px] sm:text-[8px] font-black uppercase tracking-widest rounded-full border border-sky-500/20 italic">Node: Optimal</span>
      </div>
    </Card>
  );
};

export default DepartmentStats;
