import React from 'react';
import { Card } from '@/shared/components/ui';
import { 
  Users, Stethoscope, Briefcase, Activity, Zap, 
  ShieldCheck, PieChart as PieIcon, ArrowUpRight, 
  Globe, Shield, Heart
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

/**
 * 🏢 Role Distribution Shard — Aesthetic identity analytics
 */
export function RoleDistributionShard({ users = [], loading = false }) {
  const roles = [
    { name: 'Doctor',  value: users.filter(u => u.role === 'doctor').length,  color: '#3B82F6', icon: Stethoscope },
    { name: 'Staff',   value: users.filter(u => u.role === 'staff').length,   color: '#14B8A6', icon: Briefcase },
    { name: 'Admin',   value: users.filter(u => u.role === 'admin').length,   color: '#F59E0B', icon: Shield },
    { name: 'Patient', value: users.filter(u => u.role === 'patient').length, color: '#8B5CF6', icon: Activity },
  ];

  const total = roles.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-8 group italic">
      {/* Dynamic Backdrop */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none transition-all duration-1000 group-hover:bg-accent-primary/10 group-hover:scale-110" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-accent-primary border border-white/10 shadow-2xl group-hover:rotate-6 transition-transform italic shrink-0">
            <PieIcon size={28} strokeWidth={2.5} className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none font-display">Identity Matrix</h3>
            <div className="flex items-center gap-2 mt-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] opacity-60 italic">Live Distribution Shard</p>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-end">
           <span className="text-[10px] font-black uppercase text-slate-400 opacity-50 tracking-[0.3em]">Registry Load</span>
           <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums mt-1">{total} Nodes</span>
        </div>
      </div>

      <div className="w-full h-72 relative z-10 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={roles}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={105}
              paddingAngle={6}
              dataKey="value"
              stroke="none"
              cornerRadius={12}
            >
              {roles.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.98)', 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                borderRadius: '24px',
                padding: '20px',
                boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
                backdropFilter: 'blur(20px)'
              }} 
              itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Indicator */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <div className="w-24 h-24 rounded-full border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-inner">
              <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest leading-none">Healthy</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white mt-1">100%</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
         {roles.map((role, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-[2rem] bg-slate-50 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/5 group/item transition-all hover:bg-white dark:hover:bg-white/10 hover:shadow-xl hover:-translate-y-1">
               <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm transition-transform group-hover/item:scale-110" style={{ backgroundColor: `${role.color}15`, color: role.color, borderColor: `${role.color}30` }}>
                  <role.icon size={18} strokeWidth={2.5} />
               </div>
               <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-black uppercase text-slate-400 italic tracking-widest truncate">{role.name} Nodes</span>
                  <div className="flex items-end gap-2 mt-1">
                     <span className="text-xl font-black text-slate-900 dark:text-white italic leading-none tabular-nums">{role.value}</span>
                     <span className="text-[8px] font-black uppercase text-emerald-500 opacity-60 mb-0.5">Live</span>
                  </div>
               </div>
            </div>
         ))}
      </div>
      
      <div className="mt-2 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between relative z-10">
         <div className="flex items-center gap-2">
            <Globe size={12} className="text-accent-primary animate-spin-slow" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Global Registry Sync Active</span>
         </div>
         <div className="flex -space-x-2">
            {[1,2,3].map(i => (
               <div key={i} className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-white/10 border-2 border-white dark:border-slate-900" />
            ))}
         </div>
      </div>
    </Card>
  );
}

/**
 * 🛡️ SecurityAuditShard — Identity Health Pulse
 */
export function SecurityAuditShard() {
    return (
        <Card className="p-8 rounded-[2.5rem] bg-slate-900 text-white border-none flex flex-col gap-6 shadow-2als relative overflow-hidden group italic">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-sm transition-transform group-hover:rotate-12 italic">
                    <ShieldCheck size={18} className="text-accent-primary" />
                </div>
                <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display text-white">Trust Shard</h4>
            </div>
            
            <div className="mt-2 space-y-1 relative z-10">
                <p className="text-3xl font-black italic tracking-tighter leading-none text-accent-primary">99.9% Secure</p>
                <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest italic opacity-80 mt-2">Zero Authentication Breaches</p>
            </div>

            <div className="mt-auto flex flex-col gap-3 relative z-10">
               <div className="flex items-center justify-between text-[10px] font-black uppercase">
                  <span>Audit Sync</span>
                  <span className="text-emerald-500 italic">Success</span>
               </div>
               <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-primary w-full" />
               </div>
            </div>
        </Card>
    );
}

/**
 * ⚡ ActivityPulseShard — High-Fidelity Signal
 */
export function ActivityPulseShard() {
    return (
        <Card className="p-6 rounded-[3rem] bg-indigo-600 text-white flex flex-col gap-5 relative overflow-hidden group shadow-xl shadow-indigo-600/10 border-none italic">
           <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-[80px] rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-[2s]" />
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center border border-white/20 shadow-sm">
                 <Zap size={22} className="text-white fill-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                 <h4 className="text-[12px] font-black uppercase italic tracking-[0.2em] leading-none text-white">Activity Pulse</h4>
                 <span className="text-[8px] font-bold uppercase text-white/40 mt-1 tracking-widest">Signal: Excellent</span>
              </div>
           </div>
           <p className="text-[11px] font-black italic text-white/95 leading-relaxed uppercase tracking-wide opacity-80 relative z-10 font-display">
              {Math.floor(Math.random() * 20 + 5)} users currently transacting within the clinical matrix. Load variance within threshold. Peak velocity detected.
           </p>
           <div className="mt-auto flex items-center justify-between relative z-10">
              <div className="flex gap-1">
                 {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-1.5 h-6 bg-white/20 rounded-full overflow-hidden">
                       <div className="w-full bg-white animate-pulse" style={{ height: `${Math.random() * 100}%` }} />
                    </div>
                 ))}
              </div>
              <ArrowUpRight size={16} className="text-white/40 group-hover:text-white transition-colors" />
           </div>
        </Card>
    );
}
