import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity } from 'lucide-react';

/**
 * 📊 UnifiedKpiGrid (Institutional Telemetry Shard)
 * Modular grid for displaying mission-critical KPIs with high-fidelity visual feedback.
 */
export default function UnifiedKpiGrid({ stats = [], loading = false, className = "" }) {
    if (loading) {
        return (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 ${className}`}>
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-32 bg-slate-50 border border-slate-100 rounded-[32px] animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 ${className}`}>
            {stats.map((stat, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 hover:border-accent-primary/20 transition-all duration-500 group"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-accent-primary group-hover:text-white transition-all duration-500">
                            {stat.icon ? <stat.icon size={20} /> : <Activity size={20} />}
                        </div>
                        {stat.trend && (
                            <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                                <TrendingUp size={10} /> {stat.trend}
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-1">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{stat.title}</p>
                        <h4 className="text-2xl font-black text-slate-900 tracking-tight tabular-nums">{stat.value}</h4>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
