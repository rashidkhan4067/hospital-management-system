import React from 'react';
import { Card } from '@/shared/components/ui';
import { ShieldCheck, AlertCircle, Zap } from 'lucide-react';

/**
 * 🛰 UnifiedProtocolShard
 * Standardized protocol/notice card used in sidebars.
 * Prevents redundancy and ensures high-fidelity design across clinical modules.
 */
export default function UnifiedProtocolShard({ 
    title = "Protocol Notice", 
    message = "Safety synchronization verified. Node credentials synchronized.",
    icon: Icon = ShieldCheck,
    variant = "blue" // blue, orange, emerald, rose, primary
}) {
    // 🎨 Theme Matrix Logic
    const variants = {
        blue: "bg-indigo-600 shadow-indigo-600/10",
        orange: "bg-orange-500 shadow-orange-500/10",
        emerald: "bg-emerald-600 shadow-emerald-600/15",
        rose: "bg-rose-600 shadow-rose-500/10",
        slate: "bg-slate-900 shadow-slate-900/10 dark:bg-slate-800/40",
        primary: "bg-accent-primary shadow-accent-primary/20",
    };

    return (
        <Card className={`p-5 lg:p-6 rounded-[2.5rem] flex flex-col gap-4 relative overflow-hidden group border-none transition-all hover:scale-[1.02] text-white ${variants[variant] || variants.blue}`}>
            
            {/* 🌊 Dynamic Glow Ornament */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-white/20 transition-all duration-700" />
            
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/20 shadow-sm transition-transform group-hover:rotate-12 italic shrink-0">
                    <Icon size={20} className="text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-[12px] font-black uppercase italic tracking-[0.15em] leading-none">{title}</h4>
                    <p className="text-[7px] font-black uppercase tracking-widest opacity-40 mt-1.5 italic">PROTOCOL-NODE-v2.1</p>
                </div>
            </div>
            
            <p className="text-[10px] font-black italic text-white/90 leading-relaxed uppercase tracking-wide opacity-80 relative z-10">
                {message}
            </p>

            {/* 🧬 Secondary Micro-telemetry */}
            <div className="mt-2 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5 opacity-40">
                    <Zap size={10} className="fill-white" />
                    <span className="text-[8px] font-black uppercase italic tracking-tighter">System Ready</span>
                </div>
                <span className="text-[8px] font-black uppercase italic tracking-tighter opacity-40 tabular-nums">SYNC: 100%</span>
            </div>
        </Card>
    );
}
