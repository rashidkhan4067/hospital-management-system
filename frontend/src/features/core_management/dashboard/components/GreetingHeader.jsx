import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/core/store/useAuthStore';
import { Sparkles, ArrowRight, Zap, Cloud } from 'lucide-react';

/**
 * 👋 GreetingHeader (MD3 8px Standard)
 * Implements strict grid alignment and semantic color tokens.
 */
const GreetingHeader = () => {
    const user = useAuthStore(state => state.user);
    const date = new Date();
    const hour = date.getHours();

    const getGreeting = () => {
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <section className="col-span-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 py-2">
            
            {/* 🏷️ Identity Cluster */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-start gap-1"
            >
                <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(26,115,232,0.4)] animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-primary tracking-[0.3em]">Operational Pulse Active</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-text-main tracking-tighter leading-none">
                    {getGreeting()}, <span className="text-primary italic">{user?.display_name || 'Admin'}</span>
                </h1>
                <div className="flex items-center gap-2 mt-4">
                    <Cloud size={14} className="text-text-sub opacity-40" />
                    <p className="text-xs font-bold text-text-sub opacity-60">
                        Facility telemetry is healthy. All systems nominal for {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.
                    </p>
                </div>
            </motion.div>

            {/* ⚡ Action Node cluster */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-6 bg-surface-bright p-2 rounded-[32px] border border-outline/10 shadow-sm"
            >
                <div className="flex flex-col px-6 border-r border-outline/10">
                    <span className="text-[10px] font-black uppercase text-text-sub tracking-widest opacity-40 mb-0.5">Ready Shards</span>
                    <span className="text-sm font-black text-text-main">14 Active Nodes</span>
                </div>
                
                <button className="flex items-center gap-3 px-8 h-14 bg-text-main text-surface-bright rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-text-main/10 hover:scale-[1.02] active:scale-[0.98] transition-all group">
                    <Zap size={16} className="text-primary" />
                    Strategic View
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </button>
            </motion.div>
        </section>
    );
};

export default GreetingHeader;
