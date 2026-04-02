import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../../../ui';

/**
 * 📊 Professional SaaS Stat Matrix
 * Strictly following the Theme Color Tokens (Accent Primary).
 */
const MetricCards = ({ metrics }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {metrics.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                    className="w-full"
                >
                    <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-default h-full flex flex-col justify-between min-h-[160px] lg:shadow-[6px_6px_12px_#e2e8f0,-6px_-6px_12px_#ffffff] dark:lg:shadow-none">
                        
                        <div className="flex items-start justify-between">
                            {/* 🎨 Dynamic Accent Color Applied */}
                            <div className="w-12 h-12 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-3 transition-transform">
                                {React.cloneElement(stat.icon, { size: 22, strokeWidth: 2.5 })}
                            </div>
                            
                            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                stat.trendType === 'up' ? 'bg-status-success/10 text-status-success' : stat.trendType === 'down' ? 'bg-status-error/10 text-status-error' : 'bg-slate-100 text-slate-500'
                            }`}>
                                {stat.trendType === 'up' ? <TrendingUp size={12} /> : stat.trendType === 'down' ? <TrendingDown size={12} /> : null}
                                {stat.trend}
                            </div>
                        </div>

                        <div className="mt-4 space-y-1">
                            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.title}</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">{stat.value}</h3>
                                <div className="h-1.5 w-1.5 rounded-full bg-accent-primary animate-pulse shadow-[0_0_8px_rgba(var(--color-accent-primary),0.6)]" />
                            </div>
                        </div>

                        {/* 🌊 Decorative Accent Shard */}
                        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-accent-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

export default MetricCards;
