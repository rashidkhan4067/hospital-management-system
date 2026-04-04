import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCog, Stethoscope, Users } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * 👥 Staff Role Distribution Matrix
 * High-fidelity shard showing clinical vs administrative nodes.
 */
const RoleStats = ({ pulse, loading }) => {
  const roles = [
    { label: 'Doctors',  value: pulse?.counts?.doctors || 42, icon: Stethoscope, color: 'text-sky-500', bg: 'bg-sky-500/10' },
    { label: 'Nursing',  value: 86,  icon: Activity,    color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Admin',    value: 12,  icon: ShieldCheck, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Suppport', value: 34,  icon: UserCog,     color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
  ];

  return (
    <Card className="relative p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-xl h-full flex flex-col group overflow-hidden">
      
      {/* 🔮 Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-[50px] rounded-full" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-slate-50 dark:border-white/5 pb-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
             <Users size={16} />
           </div>
           <div>
             <h3 className="text-[11px] font-black uppercase italic tracking-tighter text-slate-800 dark:text-white leading-none">Staff Matrix</h3>
             <p className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">Role Based Nodes</p>
           </div>
        </div>
      </div>

      {/* Stats List */}
      <div className="flex-1 space-y-4">
        {roles.map((role, i) => {
          const Icon = role.icon || Users;
          return (
            <motion.div 
               key={i}
               initial={{ x: 15, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
               className="flex items-center justify-between px-1 group/item cursor-default"
            >
               <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${role.bg} flex items-center justify-center ${role.color} group-hover/item:scale-110 transition-transform`}>
                    <Icon size={14} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{role.label}</span>
               </div>
               <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
                  {role.value}
               </span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-50 dark:border-white/5">
         <div className="flex items-center justify-between">
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">System Capacity</span>
            <span className="text-[9px] font-black text-accent-primary italic">94% Active</span>
         </div>
         <div className="mt-2 h-1 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '94%' }}
               transition={{ duration: 2, delay: 0.5 }}
               className="h-full bg-accent-primary shadow-[0_0_8px_rgba(20,184,166,0.5)]"
            />
         </div>
      </div>
    </Card>
  );
};

// Use Activity icon if specialized icon is missing
const Activity = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
);

export default RoleStats;
