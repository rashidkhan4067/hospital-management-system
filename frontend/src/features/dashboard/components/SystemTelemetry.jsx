import React from 'react';
import { Database, Zap, Globe } from 'lucide-react';

export default function SystemTelemetry() {
  const nodes = [
    { name: 'Clinical DB', status: 'Optimal', latency: '12ms', color: 'bg-emerald-500' },
    { name: 'Gateway API', status: 'Optimal', latency: '45ms', color: 'bg-emerald-500' },
    { name: 'AI Engine', status: 'Degraded', latency: '412ms', color: 'bg-amber-500' },
  ];

  return (
    <div className="col-span-12 lg:col-span-6 bg-white border border-outline-variant rounded-xl p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-text-sub uppercase tracking-[0.2em]">Live System Telemetry</span>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">System Operational</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {nodes.map((node, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-lg border border-transparent hover:border-outline-variant transition-all group">
            <div className="flex items-center gap-4">
              <div className={`w-1.5 h-1.5 rounded-full ${node.color}`} />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-main">{node.name}</span>
                <span className="text-[10px] font-medium text-text-sub uppercase tracking-tight">{node.status}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-text-main">{node.latency}</span>
                <span className="text-[9px] font-bold text-text-sub uppercase">Latency</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
