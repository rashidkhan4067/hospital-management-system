import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🛰️ Page Header
 * Shared header component for all admin pages.
 */
export const PageHeader = ({ 
    title, 
    subtitle, 
    actions, 
    status = null,
    time = null,
    className = '',
    accentColor = 'var(--accent-primary)' 
}) => {
    return (
        <header className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/50 dark:border-white/5 relative z-10 w-full overflow-hidden ${className}`}>
            <div className="flex flex-col gap-3">
                {(status || time) && (
                    <div className="flex items-center gap-4">
                        {status && (
                            <div className="px-2.5 py-0.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[8px] font-black uppercase tracking-[0.2em] shadow-sm">
                                {status}
                            </div>
                        )}
                        {time && (
                            <span className="text-[9px] font-black text-slate-400 tabular-nums uppercase italic opacity-60">
                                {time}
                            </span>
                        )}
                    </div>
                )}
                
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: 28 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="w-1.5 rounded-full shadow-lg"
                            style={{ backgroundColor: accentColor }}
                        />
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic font-display leading-none"
                        >
                            {title}
                        </motion.h1>
                    </div>
                    {subtitle && (
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-[0.3em] ml-4 italic"
                        >
                            {subtitle}
                        </motion.p>
                    )}
                </div>
            </div>

            {actions && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-white/5 p-1 rounded-xl backdrop-blur-3xl"
                >
                    {actions}
                </motion.div>
            )}
        </header>
    );
};

export default PageHeader;

