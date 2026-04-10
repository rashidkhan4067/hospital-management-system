import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * 📊 DashboardKpiCard (MD3 Specification)
 * High-density data node for critical clinical telemetry.
 */
const DashboardKpiCard = ({ 
    title, 
    value, 
    trend, 
    trendType = 'up', 
    icon: Icon,
    colorClass = 'text-primary',
    delay = 0 
}) => {
  const isPositive = trendType === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay }}
      className="bg-[#FEF7FF] border border-[#CAC4D0]/30 rounded-[28px] p-6 hover:shadow-lg hover:shadow-[#6750A4]/5 transition-all group flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-2xl bg-surface-variant/30 flex items-center justify-center ${colorClass} group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-black uppercase tracking-tight ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trend}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-[11px] font-black uppercase text-[#49454F] tracking-[0.15em] opacity-60">
           {title}
        </span>
        <span className="text-3xl font-black text-[#1C1B1F] tracking-tight mt-1">
           {value}
        </span>
      </div>

      {/* 🧬 Sub-Neural Data Matrix (Micro-chart placeholder) */}
      <div className="mt-2 h-1 w-full bg-[#E7E0EC] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isPositive ? "75%" : "40%" }}
            className={`h-full ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}
          />
      </div>
    </motion.div>
  );
};

export default DashboardKpiCard;
