import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

/**
 * 📊 StatCard (Senior Architecture Refinement)
 * Optimized for high-density mobile indexing and desktop tactical oversight.
 */
const StatCard = memo(({ 
    title, 
    value, 
    trend, 
    isUp = true, 
    icon: Icon,
    variant = 'surface',
    delay = 0,
    className = '',
    onClick 
}) => {
    const sparkData = [
        { v: 10 }, { v: 15 }, { v: 8 }, { v: 22 }, { v: 18 }, { v: 25 }, { v: 21 },
    ];

    const variants = {
        surface: 'bg-surface-bright border-outline/30 shadow-sm',
        glass: 'bg-surface-bright/40 backdrop-blur-md border-outline/20 shadow-lg',
        tint: 'bg-primary/5 border-primary/10'
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.3 }}
            onClick={onClick}
            className={`
                group relative flex flex-col sm:flex-row lg:flex-col 
                p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] border transition-all duration-300 
                overflow-hidden h-full min-h-[100px] sm:min-h-[160px]
                ${variants[variant]}
                ${onClick ? 'cursor-pointer active:scale-95 hover:shadow-md' : 'cursor-default'}
                ${className}
            `}
        >
            <div className="flex flex-row lg:flex-row items-center sm:items-start lg:items-center gap-4 relative z-10 w-full sm:w-auto">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                    isUp ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                    {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />}
                </div>
                
                <div className="flex flex-col">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase text-text-sub tracking-[0.15em] opacity-60">
                        {title}
                    </span>
                    {trend && (
                        <div className={`flex items-center gap-1 mt-0.5 text-[9px] sm:text-[10px] font-bold ${
                            isUp ? 'text-success' : 'text-error'
                        }`}>
                            {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            {trend}
                        </div>
                    )}
                </div>

                {/* Mobile Metric (Pushed to Right) */}
                <div className="flex sm:hidden ml-auto">
                    <span className="text-3xl font-black text-text-main tracking-tighter leading-none">
                        {value}
                    </span>
                </div>
            </div>

            <div className="hidden sm:flex flex-col justify-end flex-grow mt-4 sm:mt-auto relative z-10 w-full">
                <div className="flex items-end justify-between gap-4">
                    <span className="text-3xl sm:text-4xl font-black text-text-main tracking-tighter leading-none truncate">
                        {value}
                    </span>

                    <div className="hidden lg:block w-20 h-10 opacity-30 group-hover:opacity-100 transition-opacity">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={sparkData}>
                                <Line type="monotone" dataKey="v" stroke={isUp ? 'var(--color-success)' : 'var(--color-error)'} strokeWidth={3} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Progress Bar (Desktop only for focus) */}
                <div className="hidden sm:block mt-4 h-1.5 w-full bg-outline/10 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: isUp ? '85%' : '32%' }}
                        className={`h-full rounded-full ${isUp ? 'bg-success shadow-[0_0_12px_rgba(19,115,51,0.4)]' : 'bg-error'}`}
                    />
                </div>
            </div>
        </motion.div>
    );
});

StatCard.displayName = 'StatCard';
export default StatCard;
