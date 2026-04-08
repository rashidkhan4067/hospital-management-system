import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * 📝 ActivityItem
 * High-fidelity event node with dynamic category mapping and hover intelligence.
 * Memoized for performance in high-velocity event streams.
 */
const ActivityItem = memo(({ activity }) => {
    const navigate = useNavigate();

    // ── Category Intelligence Matrix ─────────────────────────────────────
    const getStyles = (category) => {
        const map = {
            'AI BOOKING': { color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            'DOCTOR': { color: 'text-sky-500', bg: 'bg-sky-500/10' },
            'BILLING': { color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
            'EMR': { color: 'text-rose-500', bg: 'bg-rose-500/10' },
            'PHARMACY': { color: 'text-amber-500', bg: 'bg-amber-500/10' },
            'URGENT': { color: 'text-orange-500', bg: 'bg-orange-500/10' },
        };
        return map[category] || { color: 'text-slate-500', bg: 'bg-slate-500/10' };
    };

    const style = getStyles(activity.category);

    return (
        <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 5 }}
            onClick={() => navigate(activity.target_url)}
            className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer group/item border border-transparent hover:border-slate-100 dark:hover:border-white/5"
        >
            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${activity.status === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`} />
            
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full ${style.bg} ${style.color}`}>
                        {activity.category}
                    </span>
                    <span className="flex items-center gap-1 text-[8px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                        <Clock size={10} />
                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                
                <h5 className="text-[11px] font-black text-slate-800 dark:text-slate-200 line-clamp-1 mb-0.5 group-hover/item:text-sky-500 transition-colors">
                    {activity.title}
                </h5>
                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed italic">
                    {activity.description}
                </p>
            </div>

            <ChevronRight size={14} className="mt-1 text-slate-300 group-hover/item:text-sky-500 transition-colors" />
        </motion.div>
    );
});

ActivityItem.displayName = 'ActivityItem';

export default ActivityItem;
