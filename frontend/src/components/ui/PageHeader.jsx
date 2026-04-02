import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🛰️ Elite Enterprise Page Header
 * Features: Accent Bar, Subtitle, Secondary Action Slot, and Framer Motion entry.
 */
export const PageHeader = ({ 
    title, 
    subtitle, 
    actions, 
    className = '',
    accentColor = 'var(--accent-primary)' 
}) => {
    return (
        <header className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2 mb-8 relative z-10 w-full overflow-hidden ${className}`}>
            <div className="space-y-1.5 pt-2">
                <div className="flex items-center gap-3">
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: 24 }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                        className="w-1.5 rounded-full shadow-lg"
                        style={{ backgroundColor: accentColor }}
                    />
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic underline decoration-accent-primary/20 decoration-2 underline-offset-8 font-display"
                    >
                        {title}
                    </motion.h1>
                </div>
                {subtitle && (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 0.3 }}
                        className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-[0.3em] ml-5"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>

            {actions && (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-3"
                >
                    {actions}
                </motion.div>
            )}
        </header>
    );
};

export default PageHeader;

