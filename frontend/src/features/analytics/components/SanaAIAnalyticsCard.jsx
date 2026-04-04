import React from 'react';
import { Card } from '@/shared/components/ui';
import { Sparkles, CheckCircle, BrainCircuit, Activity, Cpu } from 'lucide-react';
import { UI_TOKENS, BREAKPOINTS } from '@/core/config/UI';

/**
 * 🌌 Sana AI Mini Shard — Analytics Version
 * Refactored to be concise like Channel Velocity.
 * Features ultra-premium glassmorphism and neural telemetry.
 */
const SanaAIAnalyticsCard = () => {
   return (
      <Card className={`${UI_TOKENS.SHARD_BASE} min-h-[300px] flex flex-col justify-between p-8 bg-slate-950 border-white/5 relative overflow-hidden group/sana`}>
         
         {/* 🌠 High-Fidelity Neural Atmospheric Glow */}
         <div className="absolute -top-20 -right-20 w-48 h-48 bg-indigo-600/20 blur-[80px] rounded-full group-hover/sana:scale-125 transition-transform duration-1000 animate-pulse" />

         <div className="relative z-10 flex flex-col h-full">

            {/* 📑 Specialized AI Header Logic */}
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30 group-hover/sana:rotate-6 transition-transform">
                     <Cpu size={20} />
                  </div>
                  <div>
                     <h3 className="text-[12px] font-black text-indigo-100 uppercase italic leading-none">Neural Hub</h3>
                     <p className="text-[8px] font-black text-indigo-400/40 uppercase tracking-widest mt-1">Sana AI Matrix</p>
                  </div>
               </div>
               <div className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8] animate-pulse" />
                  <span className="text-[8px] font-black uppercase text-indigo-400 tracking-widest leading-none">Active</span>
               </div>
            </div>

            {/* Core Neural Telemetry */}
            <div className="space-y-6 flex-1">
               {[
                  { label: 'Success Rate', val: '94.8%', icon: CheckCircle, color: 'text-emerald-500' },
                  { label: 'Confidence', val: '0.962', icon: BrainCircuit, color: 'text-indigo-400' },
                  { label: 'Intelligence', val: '12.4k', icon: Activity, color: 'text-amber-400' }
               ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <item.icon size={14} className={item.color} />
                           <span className="text-[10px] font-black uppercase text-slate-500 italic tracking-widest">{item.label}</span>
                        </div>
                        <span className="text-[12px] font-black text-white italic">{item.val}</span>
                     </div>
                     <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                           className={`h-full ${item.color.replace('text-', 'bg-')} bg-opacity-80 rounded-full transition-all duration-1000`} 
                           style={{ width: idx === 0 ? '94%' : idx === 1 ? '96%' : '82%' }}
                        />
                     </div>
                  </div>
               ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-center">
               <p className="text-[8px] font-black text-indigo-400/30 uppercase tracking-[0.3em] italic">Optimization: Synchronized</p>
            </div>

         </div>
      </Card>
   );
};

export default SanaAIAnalyticsCard;
