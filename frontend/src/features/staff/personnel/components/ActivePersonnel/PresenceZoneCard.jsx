import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🏥 PresenceZoneCard
 * Interactive workload shard for hospital zones (OT, ER, OPD).
 * Integrates navigational deep-linking and real-time metric binding.
 */
const PresenceZoneCard = ({ zone, onClick }) => {
  // Dynamic color matching registry
  const colorMap = {
    rose: { bg: 'bg-rose-500/5', text: 'text-rose-500', border: 'hover:border-rose-500/20' },
    amber: { bg: 'bg-amber-500/5', text: 'text-amber-500', border: 'hover:border-amber-500/20' },
    blue: { bg: 'bg-blue-500/5', text: 'text-blue-500', border: 'hover:border-blue-500/20' },
    emerald: { bg: 'bg-emerald-500/5', text: 'text-emerald-500', border: 'hover:border-emerald-500/20' }
  };

  const style = colorMap[zone.color] || colorMap.blue;

  return (
    <motion.div 
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-2xl ${style.bg} border border-transparent ${style.border} transition-all group/stat cursor-pointer`}
    >
      <div>
        <p className="text-[10px] font-black italic uppercase tracking-widest text-slate-400 group-hover/stat:text-slate-600 dark:group-hover/stat:text-slate-200 transition-colors leading-none">
          {zone.label}
        </p>
        <p className={`text-[8px] font-black uppercase tracking-[0.2em] mt-1 ${style.text}`}>
          {zone.count > 0 ? zone.status : 'No Active Cases'}
        </p>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-black text-slate-800 dark:text-white tabular-nums group-hover/stat:scale-110 transition-transform origin-right">
          {zone.count}
        </span>
        {zone.count > 0 && (
          <span className={`w-1.5 h-1.5 rounded-full ${style.text} bg-current animate-pulse`} />
        )}
      </div>
    </motion.div>
  );
};

export default PresenceZoneCard;
