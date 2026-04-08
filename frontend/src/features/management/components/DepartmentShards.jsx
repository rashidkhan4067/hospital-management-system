import React from 'react';
import { Card, Badge, Button } from '@/components/primitives';
import { 
  Activity, Users, LayoutGrid, ArrowUpRight, 
  MapPin, Clock, ShieldCheck, Database, 
  ArrowDownRight, Zap
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

/**
 * 🏥 Department Throughput Shard — High-fidelity clinical flow
 */
export function DepartmentThroughputShard() {
  const data = [
    { name: '00:00', load: 30 },
    { name: '04:00', load: 45 },
    { name: '08:00', load: 85 },
    { name: '12:00', load: 92 },
    { name: '16:00', load: 78 },
    { name: '20:00', load: 55 },
    { name: '23:59', load: 40 },
  ];

  return (
    <Card className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-6 group italic">
       <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />
       
       <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-accent-primary border border-white/10 shadow-2xl">
                <Zap size={24} strokeWidth={2.5} />
             </div>
             <div className="flex flex-col">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none font-display">Global Throughput</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 opacity-60 italic">Real-time Clinical Load Matrix</p>
             </div>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase italic tracking-widest border border-emerald-500/20 px-4 py-1.5 rounded-xl">Stable Pulse</Badge>
       </div>

       <div className="h-[200px] w-full mt-2 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={data}>
                <defs>
                   <linearGradient id="loadGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.1} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '10px', color: '#fff' }} 
                   itemStyle={{ color: '#14b8a6', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="load" stroke="#14b8a6" strokeWidth={4} fillOpacity={1} fill="url(#loadGradient)" />
             </AreaChart>
          </ResponsiveContainer>
       </div>

       <div className="grid grid-cols-3 gap-6 pt-2 relative z-10 border-t border-slate-50 dark:border-white/5 mt-auto">
          <div className="flex flex-col">
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-1">Peak Flux</span>
             <span className="text-lg font-black text-slate-900 dark:text-white italic leading-none">94.2%</span>
          </div>
          <div className="flex flex-col">
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-1">Saturation</span>
             <span className="text-lg font-black text-slate-900 dark:text-white italic leading-none">72.8%</span>
          </div>
          <div className="flex flex-col">
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-1">Velocity</span>
             <span className="text-lg font-black text-emerald-500 italic leading-none">+4.2%</span>
          </div>
       </div>
    </Card>
  );
}

/**
 * 🛰 UnitEfficiencyShard
 */
export function UnitEfficiencyShard() {
    return (
        <Card className="p-8 rounded-[3rem] bg-slate-950 border-none flex flex-col gap-6 shadow-2als relative overflow-hidden group italic text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12">
                    <Activity size={24} className="text-accent-primary" />
                </div>
                <div className="flex flex-col">
                   <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display">Unit Resonance</h4>
                   <span className="text-[8px] font-bold uppercase text-white/40 mt-1.5 tracking-widest">Protocol: Active</span>
                </div>
            </div>
            
            <div className="mt-2 space-y-1 relative z-10">
                <p className="text-3xl font-black italic tracking-tighter leading-none text-accent-primary">Superior</p>
                <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest italic opacity-80 mt-2">Clinical operational efficiency exceeding baseline benchmarks by 12% globally.</p>
            </div>

            <div className="mt-auto flex flex-col gap-4 relative z-10">
               <div className="flex items-center justify-between text-[10px] font-black uppercase">
                  <span>Resource Sync</span>
                  <span className="text-emerald-500 italic tabular-nums">98.4%</span>
               </div>
               <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-accent-primary w-[98.4%] animate-pulse shadow-[0_0_8px_rgba(20,184,166,1)]" />
               </div>
            </div>
        </Card>
    );
}

/**
 * 🗺 TopologyMatrixShard
 */
export function TopologyMatrixShard() {
    return (
        <Card className="p-8 rounded-[3rem] bg-accent-primary text-white border-none flex flex-col gap-6 shadow-xl shadow-accent-primary/20 relative overflow-hidden group italic h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/20 shadow-sm transition-transform group-hover:-rotate-12">
                    <LayoutGrid size={18} className="text-white" />
                </div>
                <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display">Topology Matrix</h4>
            </div>
            <div className="mt-2 space-y-3 relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-relaxed">Configuring additional departmental shards for the clinical grid network mapping.</p>
                <div className="flex flex-col gap-2 mt-4">
                   <div className="flex items-center justify-between text-[9px] font-black uppercase">
                      <span>Grid Verified</span>
                      <ShieldCheck size={12} className="text-white" />
                   </div>
                   <div className="flex items-center justify-between text-[9px] font-black uppercase">
                      <span>Sync Pulse</span>
                      <Database size={12} className="text-white" />
                   </div>
                </div>
            </div>
            <ArrowUpRight size={20} className="mt-auto self-end opacity-40 group-hover:opacity-100 transition-opacity" />
        </Card>
    );
}
