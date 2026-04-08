import React from 'react';
import { Zap } from 'lucide-react';
import { Card } from '@/components/primitives';

/**
 * ⚡ Fiscal Velocity Shard
 * Specialized telemetry for clinical through-put.
 * Optimized for theme consistency and dark mode depth.
 */
export default function FiscalVelocityShard({ amount = "82.4K", subtitle = "Avg. Per Patient Shard", efficiency = "98.2%" }) {
   return (
      <Card className="p-7 rounded-[2.5rem] bg-slate-900 border border-slate-800 text-white flex flex-col gap-6 relative overflow-hidden group shadow-2als h-full transition-all hover:bg-slate-950">
         <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-primary/10 blur-[80px] rounded-full" />
         
         <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white italic border border-white/10 shadow-sm transition-transform group-hover:rotate-12">
               <Zap size={20} className="fill-white" />
            </div>
            <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display text-white">Fiscal Velocity</h4>
         </div>

         <div className="flex flex-col gap-2 relative z-10">
            <span className="text-3xl lg:text-4xl font-black italic tracking-tighter tabular-nums leading-none text-white">Rs. {amount}</span>
            <span className="text-[9px] font-bold text-accent-primary uppercase tracking-widest italic opacity-80">{subtitle}</span>
         </div>

         <p className="text-[9px] font-black italic text-slate-400 dark:text-slate-500 leading-relaxed uppercase tracking-wide opacity-80 relative z-10">
            Operational through-put is <span className="text-white font-black">{efficiency} optimal</span>. No fiscal leakage detected in the propagation matrix.
         </p>
      </Card>
   );
}
