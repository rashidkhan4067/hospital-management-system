import React from 'react';
import { Card, Badge } from '@/shared/components/ui';

/**
 * 🕵️ Audit Flux Diagnostic Shard
 * Tracks real-time administrative propagation events.
 * Optimized for high-density responsiveness and theme-clamped styling.
 */
import { motion } from 'framer-motion';

const SystemPulse = ({ logs, onExpand }) => {
    return (
        <Card className="matrix-card rounded-[2.5rem] p-5 flex flex-col gap-6 relative overflow-hidden transition-all duration-700 border border-transparent hover:border-accent-primary/10 bg-white/70 dark:bg-slate-900/10 backdrop-blur-3xl shadow-xl">
            
            {/* 🌌 Atmospheric Flow Node */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-[70px] rounded-full pointer-events-none" />
            
            <div className="flex items-center justify-between relative z-10">
                 <div className="flex flex-col gap-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-800 dark:text-white leading-none">System Pulse</h4>
                    </div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-60 ml-3.5">Real-time Diagnostics</p>
                 </div>
                 <div className="px-2 py-0.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[7px] font-black uppercase tracking-widest">
                    Live Feed
                 </div>
            </div>

            <div className="flex flex-col gap-4 relative z-10 flex-1">
                {logs.map((log, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        key={idx} 
                        className="flex gap-4 group/item cursor-default items-start"
                    >
                        <div className="flex flex-col items-center gap-2 pt-1.5 h-full shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-accent-primary ring-4 ring-accent-primary/5 group-hover/item:scale-125 transition-all shadow-md" />
                            {idx !== logs.length - 1 && <div className="w-px flex-1 min-h-[14px] bg-slate-100 dark:bg-white/5" />}
                        </div>
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <h5 className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic tracking-tighter group-hover/item:text-accent-primary transition-colors leading-none truncate">{log.title}</h5>
                            <div className="flex items-center gap-2">
                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest truncate opacity-60">{log.time}</p>
                                <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/10" />
                                <Badge className={`px-1.5 py-0 rounded text-[7px] font-black uppercase tracking-widest border-none shadow-sm ${
                                    log.status === 'Success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                                }`}>{log.status}</Badge>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/5 relative z-10">
                <button 
                    onClick={onExpand}
                    className="w-full text-center text-[9px] font-black uppercase tracking-[0.2em] italic text-accent-primary hover:tracking-[0.3em] transition-all duration-500 active:scale-95 border-none bg-transparent"
                >
                    Expand Intelligence Matrix
                </button>
            </div>
        </Card>
    );
};

export default SystemPulse;
