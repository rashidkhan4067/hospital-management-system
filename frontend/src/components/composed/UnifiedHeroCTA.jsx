import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🏔️ UnifiedHeroCTA (Institutional Hero Shard)
 * High-fidelity orchestrator for dashboard entry points.
 */
export default function UnifiedHeroCTA({ 
    title, 
    subtitle, 
    pillPrefix, 
    pillIcon: PillIcon, 
    actions = [], 
    className = "" 
}) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative p-12 md:p-16 rounded-[48px] bg-slate-900 text-white overflow-hidden shadow-2xl shadow-slate-200 ${className}`}
        >
            {/* Background Architectural Shards */}
            <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                    <circle cx="400" cy="0" r="300" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="10 10" />
                    <circle cx="400" cy="0" r="200" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>
            </div>

            <div className="relative z-10 flex flex-col items-start max-w-2xl">
                {pillPrefix && (
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-full border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-8">
                        {PillIcon && <PillIcon size={14} className="text-accent-primary" />}
                        {pillPrefix}
                    </div>
                )}

                <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-6">
                    {title}
                </h1>
                
                <p className="text-lg font-medium text-white/40 leading-relaxed max-w-lg mb-12">
                    {subtitle}
                </p>

                <div className="flex flex-wrap gap-4">
                    {actions.map((action, idx) => (
                        <button 
                            key={idx}
                            onClick={action.onClick}
                            className={`flex items-center gap-4 p-4 rounded-3xl transition-all duration-300 group
                                ${idx === 0 
                                    ? 'bg-white text-slate-900 shadow-xl shadow-white/5 hover:scale-105 active:scale-95' 
                                    : 'bg-white/5 text-white border border-white/5 hover:bg-white/10'}`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                                ${idx === 0 ? 'bg-slate-100' : 'bg-white/10'}`}>
                                {action.icon && <action.icon size={20} />}
                            </div>
                            <div className="text-left pr-4">
                                <p className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">{action.title}</p>
                                <p className={`text-[10px] font-bold ${idx === 0 ? 'text-slate-400' : 'text-white/20'}`}>{action.subtitle}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
