import React from 'react';
import { Sparkles, ArrowRight, BrainCircuit, Zap, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * 🧠 AISummaryCard
 * A premium, agentic intelligence card designed for the 2026 clinical landscape.
 * Instead of just showing data, it suggests proactive operational maneuvers.
 */
const AISummaryCard = ({ isLoading }) => {
    if (isLoading) {
        return (
            <div className="w-full h-[120px] bg-surface-bright/50 animate-pulse rounded-[32px] border border-outline/10" />
        );
    }

    const insights = [
        {
            id: 1,
            type: 'proactive',
            title: "OPD Flow Predicted +15%",
            message: "Patient inflow is trending higher than predicted for Tuesday. Open Counter 4 to maintain < 8min wait time.",
            action: "Open Counter 4",
            icon: BrainCircuit,
            gradient: 'from-primary/10 via-primary/5 to-transparent',
            accent: 'var(--m3-primary)'
        },
        {
            id: 2,
            type: 'efficiency',
            title: "Inventory Alert: Saline",
            message: "Consumption rate in ICU surged by 40%. Restock recommended within 2 hours to avoid stockout.",
            action: "Restock Now",
            icon: Zap,
            gradient: 'from-warning/10 via-warning/5 to-transparent',
            accent: 'var(--m3-warning)'
        }
    ];

    // For this demonstration, we'll show the top priority one
    const insight = insights[0];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative overflow-hidden rounded-[32px] border border-outline-variant/30 bg-white shadow-xl shadow-primary/5 p-6"
        >
            {/* ✨ Liquid Glow Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} opacity-40 group-hover:opacity-70 transition-opacity duration-700`} />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                    <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-500"
                        style={{ background: insight.accent, color: '#fff' }}
                    >
                        <insight.icon size={28} />
                    </div>
                    
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles size={14} className="text-primary animate-pulse" />
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-sub opacity-50">
                                AI Clinical Insight
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-text-main tracking-tight mb-2">
                            {insight.title}
                        </h3>
                        <p className="text-sm text-text-sub max-w-[600px] leading-relaxed">
                            {insight.message}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <button className="px-6 py-3 rounded-full bg-surface-variant border border-outline-variant/30 text-text-main text-[13px] font-bold hover:bg-surface-variant/80 transition-all">
                        Dismiss
                    </button>
                    <button 
                        className="flex items-center gap-2 px-8 py-3 rounded-full text-white text-[13px] font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all group/btn"
                        style={{ background: insight.accent }}
                    >
                        {insight.action}
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* 🧬 Animated Pulse Orbs */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none animate-pulse" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
        </motion.div>
    );
};

export default AISummaryCard;
