import React from 'react';
import { Card } from '@/components/primitives';
import { Mic, Activity, Zap } from 'lucide-react';

/**
 * 🛰 SanaVoiceBooking — Compact dark-themed voice widget
 * Standardized intelligence shard for AI interaction across the clinical matrix.
 */
export default function SanaVoiceBooking({ onStart, title = "Talk to Sana", subtitle = "Neural Clinical Hub" }) {
    return (
        <Card className="p-5 lg:p-6 rounded-[2.5rem] bg-slate-950 border border-accent-primary/20 shadow-2als relative overflow-hidden flex flex-col gap-6 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="flex items-center justify-between relative z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-primary/20 flex items-center justify-center text-accent-primary border border-accent-primary/30 shadow-inner group-hover:scale-110 transition-transform">
                        <Mic size={20} strokeWidth={2.5} className="animate-pulse" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-lg lg:text-xl font-black text-indigo-100 italic uppercase tracking-tighter leading-none">{title}</h3>
                        <p className="text-[9px] font-bold text-accent-primary/50 uppercase tracking-[0.2em] mt-1">{subtitle}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-black uppercase italic shadow-sm leading-none">
                    <Activity size={8} /> Active
                </div>
            </div>

            {/* 🌊 Sound Wave Visualization (Micro) */}
            <div className="flex items-center justify-between gap-0.5 h-8 relative z-10 px-2 opacity-60">
                {[1,2,3,4,5,6,3,5,7,8,6,4,3,2,1].map((h, i) => (
                    <div key={i} className="flex-1 bg-accent-primary/40 rounded-full animate-wave" style={{ height: `${h * 12}%`, animationDelay: `${i * 0.08}s` }} />
                ))}
            </div>

            <button 
                onClick={onStart}
                className="w-full py-4 rounded-2xl bg-accent-primary hover:bg-accent-primary/90 text-[10px] font-black uppercase text-white tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-accent-primary/25 border-none transition-all group-hover:scale-[1.02] italic"
            >
                Initiate Neural Dialogue <Zap size={16} className="fill-white" />
            </button>

            <div className="flex items-center justify-center gap-4 relative z-10 opacity-30">
                <div className="flex flex-col items-center">
                    <span className="text-[9px] font-black text-slate-400 italic font-bold">Confidence</span>
                    <span className="text-[10px] font-black text-white italic tracking-tighter tabular-nums mt-0.5 uppercase">98.4%</span>
                </div>
                <div className="w-[1px] h-4 bg-white/10" />
                <div className="flex flex-col items-center">
                    <span className="text-[9px] font-black text-slate-400 italic font-bold">Latency</span>
                    <span className="text-[10px] font-black text-white italic tracking-tighter tabular-nums mt-0.5 uppercase">42ms</span>
                </div>
            </div>
        </Card>
    );
}
