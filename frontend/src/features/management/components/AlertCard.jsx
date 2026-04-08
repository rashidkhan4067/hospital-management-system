import React from 'react';
import { Bell, Zap } from 'lucide-react';
import { Badge } from '@/components/primitives';
import { motion } from 'framer-motion';

export default function AlertCard({ alert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 bg-white dark:bg-slate-900/40 border border-white/5 rounded-[32px] flex items-center justify-between group hover:bg-bg-base dark:hover:bg-white/5 transition-all"
    >
      <div className="flex items-center gap-6">
         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            alert.priority === 'critical' ? 'bg-rose-500/10 text-rose-500' : 
            alert.priority === 'warning' ? 'bg-amber-500/10 text-amber-500' : 
            'bg-accent-primary/10 text-accent-primary'
         }`}>
            {alert.priority === 'critical' ? <Zap size={20} /> : <Bell size={20} />}
         </div>
         <div className="space-y-1">
            <p className="text-[13px] font-black uppercase italic tracking-tight">{alert.title}</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[400px]">{alert.message}</p>
         </div>
      </div>
      <div className="flex items-center gap-8 text-right">
         <div className="hidden md:block">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time-Stamp</p>
            <p className="text-[9px] font-bold opacity-60 uppercase">{new Date(alert.created_at || alert.timestamp).toLocaleString()}</p>
         </div>
         <Badge className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase text-white shadow-lg ${
            alert.priority === 'critical' ? 'bg-rose-500 shadow-rose-500/20' : 
            alert.priority === 'warning' ? 'bg-amber-500 shadow-amber-500/20' : 
            'bg-emerald-500 shadow-emerald-500/20'
         }`}>
            {alert.priority}
         </Badge>
      </div>
    </motion.div>
  );
}
