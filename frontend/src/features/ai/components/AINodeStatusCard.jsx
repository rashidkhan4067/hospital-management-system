import React from 'react';
import { Card } from '@/shared/components/ui';

function StatusItem({ label, value, status }) {
  const colors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500'
  }
  return (
    <div className="flex items-center justify-between p-2">
       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
       <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${colors[status]}`} />
          <span className="text-[10px] font-black uppercase leading-none">{value}</span>
       </div>
    </div>
  )
}

export default function AINodeStatusCard() {
  return (
    <>
      <Card className="p-8 bg-black/5 dark:bg-black/40 border-none rounded-[40px] shadow-inner">
         <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-1 h-4 bg-accent-primary rounded-full" />
               <h3 className="text-[11px] font-black uppercase tracking-[0.3em] italic text-slate-400">Node Status</h3>
            </div>
            
            <div className="space-y-4">
               <StatusItem label="Neural Uptime" value="Synced" status="emerald" />
               <StatusItem label="Mean Latency" value="---" status="emerald" />
               <StatusItem label="Safety Guard" value="Active" status="blue" />
               <StatusItem label="Kernel Load" value="Stable" status="emerald" />
            </div>
         </div>
      </Card>

      <Card className="p-8 bg-accent-primary/5 border border-accent-primary/10 rounded-[40px]">
         <p className="text-[9px] font-black uppercase tracking-widest text-accent-primary text-center leading-relaxed">
           Modifying neural settings affects all connected clinical nodes. High diagnostic depth requires additional GPU processing credits.
         </p>
      </Card>
    </>
  );
}
