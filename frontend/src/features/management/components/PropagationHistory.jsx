import React from 'react';
import { History } from 'lucide-react';
import AlertCard from './AlertCard';

export default function PropagationHistory({ alerts }) {
  return (
    <div className="space-y-6 pt-4">
       <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
             <div className="w-1 h-8 bg-accent-primary rounded-full" />
             <h2 className="text-xl font-black italic uppercase tracking-tight">Recent Propagation Shards</h2>
          </div>
       </div>

       <div className="grid grid-cols-1 gap-4">
          {alerts && alerts.length === 0 ? (
            <div className="p-12 bg-bg-offset dark:bg-white/5 rounded-[40px] border border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-40">
               <History size={32} className="mb-3" />
               <p className="text-[10px] font-black uppercase tracking-widest leading-none">No propagation history found in this sector</p>
            </div>
          ) : alerts && alerts.slice(0, 5).map((a, i) => (
             <AlertCard key={a.id} alert={a} index={i} />
          ))}
       </div>
    </div>
  );
}
