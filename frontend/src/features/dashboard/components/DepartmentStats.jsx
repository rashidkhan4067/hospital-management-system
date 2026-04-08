import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Users, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, UnifiedSkeleton } from '@/components/primitives';
import { useDepartmentStats } from '../hooks/useDepartmentStats';

/**
 * 🏢 Department Performance Matrix
 * Highly interactive, data-driven section density shard.
 */
const DepartmentStats = memo(({ onNavigate }) => {
  const navigate = useNavigate();
  const { departments, loading, error } = useDepartmentStats();

  // 🛰️ Navigation Matrix
  const handleDeptClick = (deptId) => {
    navigate(`/admin/departments?section=${deptId}`);
  };

  if (loading) {
    return (
      <Card className="p-8 rounded-[2.5rem] bg-[#1a1d23] border border-white/5 h-[400px] flex flex-col gap-6">
        <UnifiedSkeleton height="h-20" />
        <div className="flex-1 space-y-8 mt-4">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="space-y-4">
                <UnifiedSkeleton height="h-3" width="w-2/3" />
                <UnifiedSkeleton height="h-2" />
             </div>
           ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative p-8 rounded-[2.5rem] bg-[#1a1d23] border border-white/5 shadow-2xl h-[400px] flex flex-col group overflow-hidden transition-all duration-700 hover:shadow-accent-primary/10">
      {/* 🌌 Atmospheric Glow */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-sky-500/10 blur-[80px] rounded-full" />

      {/* Header Intelligence */}
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-inner group-hover:rotate-6 transition-transform duration-500">
             <Building2 size={24} />
           </div>
           <div>
             <h3 className="text-lg font-bold text-white uppercase tracking-tight leading-none">Dept Load</h3>
             <p className="text-[10px] font-black text-sky-400/60 uppercase tracking-[0.3em] mt-1.5 italic">Section Distribution Matrix</p>
           </div>
        </div>
        <button 
          onClick={() => navigate('/admin/departments')} 
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-sky-400 transition-all border-none"
        >
           <TrendingUp size={16} />
        </button>
      </div>

      {/* 📊 Distribution Registry */}
      <div className="flex-1 flex flex-col justify-between py-2 relative z-10">
        {departments.map((dept, i) => (
          <div 
            key={dept.id} 
            onClick={() => handleDeptClick(dept.id)}
            className="space-y-3 p-1 rounded-xl hover:bg-white/5 transition-all cursor-pointer group/row"
          >
            <div className="flex justify-between items-end px-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/50 flex items-center gap-3">
                <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: dept.color, boxShadow: `0 0 10px ${dept.color}88` }} 
                />
                {dept.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white tabular-nums tracking-tighter">
                    {dept.load}%
                </span>
                <ChevronRight size={12} className="text-white/20 group-hover/row:text-sky-400 group-hover/row:translate-x-1 transition-all" />
              </div>
            </div>
            
            <div className="h-2 w-full bg-[#2d323b] rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${dept.load}%` }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                style={{ backgroundColor: dept.color }}
                className="h-full rounded-full relative"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Operations Footer ── */}
      <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between relative z-10">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30">
                <Users size={14} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Registry: 124 Units</span>
         </div>
         <span className="px-3 py-1 bg-sky-500/10 text-sky-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-sky-500/20 italic">Node: Optimal</span>
      </div>
    </Card>
  );
});

DepartmentStats.displayName = 'DepartmentStats';

export default DepartmentStats;
