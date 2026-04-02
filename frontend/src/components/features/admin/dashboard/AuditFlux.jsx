import React from 'react';
import { Card, Badge } from '../../../ui';

/**
 * 🕵️ Audit Flux Diagnostic Shard
 * Tracks real-time administrative propagation events.
 * Optimized for high-density responsiveness and theme-clamped styling.
 */
const AuditFlux = ({ logs }) => {
    return (
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-2xl p-6 md:p-8 space-y-8 flex-1 shadow-lg relative overflow-hidden group
            lg:shadow-[6px_6px_12px_#e2e8f0,-6px_-6px_12px_#ffffff] dark:lg:shadow-none transition-all duration-500">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            
            <div className="flex items-center justify-between mb-4">
                 <div className="space-y-1 overflow-hidden">
                    <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] italic text-slate-500 dark:text-slate-400 leading-none truncate">Audit Spectrum</h4>
                    <p className="text-[7px] md:text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-40 truncate">Propagated Matrix</p>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-accent-primary animate-ping shrink-0" />
            </div>

            <div className="space-y-6 relative z-10">
                {logs.map((log, idx) => (
                    <div key={idx} className="flex gap-4 md:gap-6 group/item cursor-default items-start">
                        <div className="flex flex-col items-center gap-2 pt-1.5 h-full shrink-0">
                            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-accent-primary ring-4 ring-accent-primary/10 group-hover/item:scale-125 transition-transform shadow-[0_0_8px_rgba(var(--color-accent-primary),0.5)]" />
                            {idx !== logs.length - 1 && <div className="w-px flex-1 min-h-[30px] bg-slate-100 dark:bg-white/5" />}
                        </div>
                        <div className="space-y-1 flex-1 min-w-0">
                            <h5 className="text-[10px] md:text-[11px] font-bold md:font-black text-slate-900 dark:text-white uppercase italic tracking-tighter group-hover/item:text-accent-primary transition-colors leading-none truncate">{log.title}</h5>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <p className="text-[7px] md:text-[8px] font-bold text-slate-400 uppercase tracking-[0.1em] truncate">{log.time} • {log.node}</p>
                                <div className="flex sm:block justify-start shrink-0">
                                  <Badge className={`px-2 py-0.5 rounded-full text-[6px] md:text-[7px] font-black uppercase border-none ${
                                      log.status === 'Success' ? 'bg-status-success/10 text-status-success' : 'bg-status-warning/10 text-status-warning'
                                  }`}>{log.status}</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-center">
                <button className="text-[9px] font-black uppercase tracking-[0.2em] italic text-accent-primary hover:tracking-[0.3em] transition-all duration-300">Expand Registry</button>
            </div>
        </Card>
    );
};

export default AuditFlux;
