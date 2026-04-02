import React from 'react';
import { ShieldCheck, MoreHorizontal, ShieldAlert, Key, Fingerprint, Lock } from 'lucide-react';
import { Card, Badge, Button } from '../../components/ui';
import { motion } from 'framer-motion';

export default function RoleArchitecture() {
  const roles = [
    { title: 'Super Administrator', users: 2, access: 'Global', sensitivity: 'L5', color: 'rose' },
    { title: 'Medical Director', users: 4, access: 'Clinical + Admin', sensitivity: 'L4', color: 'accent' },
    { title: 'Nursing Chief', users: 12, access: 'Ward Matrix', sensitivity: 'L3', color: 'emerald' },
    { title: 'Staff Physician', users: 48, access: 'Patient Records', sensitivity: 'L3', color: 'blue' },
    { title: 'Reception/Staff', users: 24, access: 'Appointments', sensitivity: 'L2', color: 'slate' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2">
         <div className="space-y-1">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-6 bg-accent-primary rounded-full shadow-lg shadow-accent-primary/20" />
               <h1 className="text-xl md:text-2xl font-black text-text-primary dark:text-white tracking-tight uppercase italic font-display">Role Architecture</h1>
            </div>
            <p className="text-[9px] font-bold text-text-secondary dark:text-white/30 uppercase tracking-[0.3em] ml-5 opacity-60">System Permission Shards</p>
         </div>

         <Button className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2">
            <ShieldAlert size={16} /> Forge Role Shard
         </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, i) => (
          <motion.div
            key={role.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-8 bg-bg-offset dark:bg-slate-800/40 border border-white/5 rounded-[40px] relative overflow-hidden group hover:scale-[1.02] transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-bg-base dark:bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
                  <ShieldCheck className={`text-${role.color}-500`} size={28} />
                </div>
                <button className="p-2 text-text-secondary opacity-40 hover:opacity-100 transition-opacity"><MoreHorizontal size={20} /></button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[9px] font-black text-text-secondary dark:text-white/20 uppercase tracking-[0.3em] italic mb-1">Authorization Tier</p>
                  <h3 className="text-xl font-black text-text-primary dark:text-white italic uppercase tracking-tight leading-none">{role.title}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-3xl bg-bg-base dark:bg-black/20 border border-white/5">
                    <p className="text-[8px] font-black text-text-secondary dark:text-white/20 uppercase tracking-widest mb-1">Users</p>
                    <p className="text-lg font-black">{role.users}</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-bg-base dark:bg-black/20 border border-white/5">
                    <p className="text-[8px] font-black text-text-secondary dark:text-white/20 uppercase tracking-widest mb-1">Sensitivity</p>
                    <p className="text-lg font-black text-accent-primary">{role.sensitivity}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-text-secondary flex items-center gap-2"><Key size={12} /> Access Scope</span>
                    <span className="text-[10px] font-black uppercase text-text-primary">{role.access}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-primary w-[75%] rounded-full opacity-40" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-accent-primary/5 border border-accent-primary/10 rounded-[48px] p-10 flex flex-col lg:flex-row items-center gap-10">
        <div className="w-20 h-20 bg-accent-primary rounded-[28px] flex items-center justify-center text-white shadow-2xl shadow-accent-primary/20 shrink-0">
          <Fingerprint size={40} />
        </div>
        <div className="space-y-2 flex-1 text-center lg:text-left">
          <h2 className="text-2xl font-black italic uppercase tracking-tight">Advanced Entropy Control</h2>
          <p className="text-sm font-medium text-text-secondary max-w-2xl">Modify global permission shards and protocol levels. Changes here will propagate through the entire clinical network in real-time.</p>
        </div>
        <Button className="bg-text-primary dark:bg-white text-bg-base px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
          <Lock size={16} /> Access Master Table
        </Button>
      </Card>
    </div>
  );
}
