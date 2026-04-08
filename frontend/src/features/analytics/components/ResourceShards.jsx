import React from 'react';
import { Card, Badge, Button } from '@/components/primitives';
import { 
  Zap, ShieldAlert, Activity, Package, 
  Truck, Settings, HeartPulse, HardDrive,
  ArrowUpRight, AlertTriangle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

/**
 * 🛰 AssetHealthShard
 */
export function AssetHealthShard() {
  const data = [
    { name: 'Operational', value: 85, color: '#14b8a6' },
    { name: 'Maintenance', value: 10, color: '#f59e0b' },
    { name: 'Offline', value: 5, color: '#f43f5e' },
  ];

  return (
    <Card className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-6 group italic">
       <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
       
       <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-accent-primary border border-white/10 shadow-2xl">
                <HeartPulse size={24} strokeWidth={2.5} />
             </div>
             <div className="flex flex-col">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none font-display">Asset Vitality</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 opacity-60 italic">Global Equipment Pulse</p>
             </div>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase italic tracking-widest border border-emerald-500/20 px-4 py-1.5 rounded-xl">L5 Secure</Badge>
       </div>

       <div className="h-[200px] w-full mt-2 relative z-10 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
             <PieChart>
                <Pie
                   data={data}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={8}
                   dataKey="value"
                >
                   {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                   ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '10px', color: '#fff' }}
                />
             </PieChart>
          </ResponsiveContainer>
       </div>

       <div className="space-y-3 relative z-10">
          {data.map((item, i) => (
             <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-sm font-black text-slate-900 dark:text-white italic tabular-nums">{item.value}%</span>
             </div>
          ))}
       </div>
    </Card>
  );
}

/**
 * 🚚 SupplyChainFluxShard
 */
export function SupplyChainFluxShard() {
    return (
        <Card className="p-8 rounded-[3rem] bg-slate-950 border-none flex flex-col gap-6 shadow-2als relative overflow-hidden group italic text-white">
            <div className="absolute top-0 left-0 w-32 h-32 bg-accent-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12">
                    <Truck size={24} className="text-accent-primary" />
                </div>
                <div className="flex flex-col">
                   <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display text-white">Logistics Flux</h4>
                   <span className="text-[8px] font-bold uppercase text-white/40 mt-1.5 tracking-widest">Inbound Provisioning</span>
                </div>
            </div>
            
            <div className="mt-2 space-y-1 relative z-10">
                <div className="flex items-baseline gap-2">
                   <p className="text-3xl font-black italic tracking-tighter leading-none text-white">12</p>
                   <p className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">Shards En Route</p>
                </div>
                <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest italic opacity-80 mt-2">Active supply chain propagation from primary medicinal nodes.</p>
            </div>

            <div className="mt-auto flex items-center gap-4 relative z-10 bg-white/5 p-4 rounded-2xl border border-white/5">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-black text-accent-primary">#{i}</div>
                  ))}
               </div>
               <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Node Propagation: Active</span>
            </div>
        </Card>
    );
}

/**
 * 🛠 MaintenanceProtocolShard
 */
export function MaintenanceProtocolShard() {
    return (
        <Card className="p-8 rounded-[3rem] bg-indigo-600 text-white border-none flex flex-col gap-6 shadow-xl shadow-indigo-600/20 relative overflow-hidden group italic h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/20 shadow-sm transition-transform group-hover:-rotate-12">
                    <Settings size={18} className="text-white" />
                </div>
                <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display">Maintenance Matrix</h4>
            </div>
            <div className="mt-2 space-y-3 relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-relaxed tabular-nums">4 Critical Asset Cycles pending realignment protocols.</p>
                <div className="flex flex-col gap-2 mt-4">
                   <div className="flex items-center justify-between text-[9px] font-black uppercase">
                      <span>MRI Shard #01</span>
                      <AlertTriangle size={12} className="text-rose-300" />
                   </div>
                   <div className="flex items-center justify-between text-[9px] font-black uppercase">
                      <span>V-Matrix #12</span>
                      <ShieldAlert size={12} className="text-amber-300" />
                   </div>
                </div>
            </div>
            <ArrowUpRight size={20} className="mt-auto self-end opacity-40 group-hover:opacity-100 transition-opacity cursor-pointer" />
        </Card>
    );
}
