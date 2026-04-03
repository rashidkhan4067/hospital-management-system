import React from 'react';
import { Zap } from 'lucide-react';
import { Card } from '@/shared/components/ui';

export default function AIInterfaceProtocols({ config, setConfig }) {
  return (
    <Card className="p-8 bg-white dark:bg-slate-900/40 border-none rounded-[40px] shadow-sm">
       <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-1 h-4 bg-accent-primary rounded-full" />
             <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic text-slate-400">Interface Protocols</h3>
          </div>
          
          <div className="flex items-center justify-between p-6 bg-bg-base dark:bg-black/20 rounded-3xl border border-transparent hover:border-accent-primary/10 transition-all">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-accent-primary/10 text-accent-primary rounded-xl">
                  <Zap size={18} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Real-time Voice Propagation</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Enable low-latency clinical audio intents</p>
                </div>
             </div>
             <button 
              onClick={() => setConfig({...config, voiceEnabled: !config.voiceEnabled})}
              className={`w-12 h-6 rounded-full transition-all relative ${config.voiceEnabled ? 'bg-accent-primary shadow-lg shadow-accent-primary/20' : 'bg-slate-300 dark:bg-white/5'}`}
             >
               <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${config.voiceEnabled ? 'left-7' : 'left-1'}`} />
             </button>
          </div>
       </div>
    </Card>
  );
}
