import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Badge, Card } from '@/components/primitives';

const mockDistribution = [
    { name: 'Approved', value: 65, color: '#14B8A6' },
    { name: 'Pending', value: 25, color: '#3B82F6' },
    { name: 'Rejected', value: 10, color: '#F43F5E' }
];

/**
 * 🛡️ Insurance Registry Shard
 * Themed telemetry for insurance claim distribution.
 * Highly consistent with administrative design tokens check mapping.
 */
export default function InsuranceNodeShard({ distribution = mockDistribution }) {
   return (
      <Card className="p-7 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm flex flex-col gap-6 group hover:border-accent-primary/20 transition-all h-full">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-sm border border-accent-primary/10 group-hover:scale-110 transition-transform italic">
                  <ShieldCheck size={20} />
               </div>
               <h4 className="text-[12px] font-black uppercase italic tracking-widest text-slate-900 dark:text-white font-display">Insurance Node</h4>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase">Sync'd</Badge>
         </div>
         <div className="flex items-center gap-6">
               <div className="flex-1 flex flex-col gap-4">
                  {distribution.map((item, idx) => (
                     <div key={idx} className="flex justify-between items-center">
                        <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">{item.name}</span>
                        <div className="flex items-center gap-3">
                           <div className="w-24 h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                              <div className="h-full bg-accent-primary" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                           </div>
                           <span className="text-[11px] font-black text-slate-900 dark:text-white tabular-nums italic">{item.value}%</span>
                        </div>
                     </div>
                  ))}
               </div>
         </div>
      </Card>
   );
}
