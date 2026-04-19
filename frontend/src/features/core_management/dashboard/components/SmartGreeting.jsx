import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/core/store/useAuthStore';
import { useDataStore } from '@/core/store/useDataStore';
import { Sparkles, ArrowUpRight, Clock, AlertCircle } from 'lucide-react';

/**
 * 👋 SmartGreeting (High-Efficiency Context Node)
 * Minimalist time-based welcome system with actionable clinical intelligence.
 */
const SmartGreeting = () => {
    const user = useAuthStore(state => state.user);
    const filters = useDataStore(state => state.filters);
    const date = new Date();
    const hour = date.getHours();

    const getGreeting = () => {
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 py-2 border-b border-[#CAC4D0]/10">
            {/* 👤 Primary Identity Node */}
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
            >
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <Sparkles size={20} />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-black text-[#1C1B1F] tracking-tight">
                            {getGreeting()}, <span className="text-primary">{user?.full_name?.split(' ')[0] || 'Director'}</span>
                        </h1>
                        <div className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                            Matrix Online
                        </div>
                    </div>
                    {/* 💡 Intelligent Insight Node */}
                    <div className="flex items-center gap-2 mt-0.5">
                        <AlertCircle size={12} className="text-rose-600 animate-pulse" />
                        <span className="text-sm font-bold text-[#1C1B1F]/70">
                            System Intelligence: <span className="text-rose-600">12 critical appointments</span> scheduled for today
                        </span>
                        <ArrowUpRight size={14} className="text-[#49454F] opacity-40" />
                    </div>
                </div>
            </motion.div>

            {/* 🕒 Operational Logic Node */}
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-[#49454F] uppercase tracking-widest opacity-40">Operational Period</span>
                    <div className="flex items-center gap-2 text-sm font-bold text-[#1C1B1F]">
                        <Clock size={14} className="text-primary" />
                        {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </div>
                </div>
                
                {/* 🔳 MD3 Range Selector (Transferred from large header) */}
                <div className="flex items-center p-1 bg-[#F7F2FA] border border-[#CAC4D0]/30 rounded-full h-fit">
                    {['today', 'week', 'month'].map((range) => (
                        <button
                            key={range}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                                filters.dateRange === range 
                                ? 'bg-primary text-white shadow-md' 
                                : 'text-[#49454F] hover:bg-white/50'
                            }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SmartGreeting;
