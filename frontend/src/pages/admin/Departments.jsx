import React from 'react';
import { LayoutGrid, MoreHorizontal, Bed, UserCircle, Microscope, Activity, Calendar } from 'lucide-react';
import { Card, Badge, Button } from '../../components/ui';
import { motion } from 'framer-motion';

export default function DepartmentMatrix() {
  const departments = [
    { name: 'Emergency Matrix', icon: <Activity />, staff: 12, capacity: '82%', load: 'Critical', color: 'rose' },
    { name: 'Cardiology Hub', icon: <Microscope />, staff: 24, capacity: '65%', load: 'Stable', color: 'accent' },
    { name: 'Neurology Unit', icon: <LayoutGrid />, staff: 8, capacity: '92%', load: 'High', color: 'indigo' },
    { name: 'Pediatrics Shard', icon: <UserCircle />, staff: 16, capacity: '45%', load: 'Low', color: 'emerald' },
    { name: 'Surgical Theatre', icon: <Bed />, staff: 32, capacity: '88%', load: 'Overloading', color: 'amber' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2">
         <div className="space-y-1">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-6 bg-accent-primary rounded-full shadow-lg shadow-accent-primary/20" />
               <h1 className="text-xl md:text-2xl font-black text-text-primary dark:text-white tracking-tight uppercase italic font-display">Department Matrix</h1>
            </div>
            <p className="text-[9px] font-bold text-text-secondary dark:text-white/30 uppercase tracking-[0.3em] ml-5 opacity-60">Clinical Unit Shards</p>
         </div>

         <div className="flex items-center gap-3 bg-bg-offset dark:bg-slate-800/40 p-2 rounded-2xl border border-white/5 flex items-center shadow-sm">
            <Button className="bg-accent-primary text-white px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20 flex items-center gap-2">
               <LayoutGrid size={16} /> Deploy New Matrix
            </Button>
         </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          {departments.map((dept, i) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 bg-bg-offset dark:bg-slate-800/40 border border-white/5 rounded-[32px] flex items-center gap-8 relative overflow-hidden group hover:bg-bg-base dark:hover:bg-white/5 transition-all">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-${dept.color}-500/10 text-${dept.color}-500 shadow-inner group-hover:rotate-6 transition-transform`}>
                  {dept.icon && React.cloneElement(dept.icon, { size: 32 })}
                </div>
                
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-black text-text-primary dark:text-white uppercase italic tracking-tight">{dept.name}</h3>
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-60 flex items-center gap-3">
                    <UserCircle size={12} /> {dept.staff} Active Personnel
                  </p>
                </div>

                <div className="hidden lg:flex flex-col items-center px-10 border-x border-white/5">
                  <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest mb-2 opacity-40">Load Pulse</p>
                  <Badge className={`px-4 py-1 rounded-full text-[8px] font-black uppercase text-white shadow-lg ${
                    dept.load === 'Critical' ? 'bg-rose-500 shadow-rose-500/20' : 
                    dept.load === 'Stable' ? 'bg-emerald-500 shadow-emerald-500/20' : 
                    'bg-amber-500 shadow-amber-500/20'
                  }`}>{dept.load}</Badge>
                </div>

                <div className="space-y-2 w-32">
                   <div className="flex justify-between items-center text-[9px] font-black uppercase opacity-60 italic">
                      <span>Occupancy</span>
                      <span>{dept.capacity}</span>
                   </div>
                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full bg-accent-primary rounded-full transition-all duration-1000`} style={{ width: dept.capacity }} />
                   </div>
                </div>

                <button className="p-3 rounded-xl bg-bg-base dark:bg-slate-800 border border-white/5 text-text-secondary hover:text-accent-primary shadow-inner">
                  <MoreHorizontal size={18} />
                </button>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-8">
           <Card className="p-8 bg-accent-primary text-white rounded-[48px] shadow-2xl shadow-accent-primary/20 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[60px] rounded-full group-hover:scale-125 transition-transform" />
              <div className="space-y-4 relative z-10">
                 <h2 className="text-2xl font-black uppercase italic tracking-tight leading-none">Matrix Analytics</h2>
                 <p className="text-xs font-bold opacity-60 uppercase tracking-widest leading-relaxed">Global Cross-Department Shard Efficiency and Resource Propagation Level 122.a</p>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10 pt-4">
                 <div className="p-6 rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/10">
                    <p className="text-[9px] font-black uppercase opacity-60 mb-2">Wait Time</p>
                    <p className="text-xl font-black italic">12.4m</p>
                 </div>
                 <div className="p-6 rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/10">
                    <p className="text-[9px] font-black uppercase opacity-60 mb-2">ER Load</p>
                    <p className="text-xl font-black italic">92%</p>
                 </div>
              </div>
              
              <Button className="w-full bg-white text-accent-primary py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl relative z-10 group-hover:scale-[1.02] transition-transform">
                 <Calendar size={16} /> Schedule Sync
              </Button>
           </Card>

           <div className="p-8 bg-bg-offset dark:bg-slate-800/40 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center text-center gap-6 group">
              <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center opacity-40 group-hover:scale-110 transition-transform">
                 <LayoutGrid size={32} />
              </div>
              <div className="space-y-2">
                 <p className="text-[8px] font-black uppercase tracking-[0.4em] text-text-secondary">Topology Matrix</p>
                 <p className="text-sm font-medium text-text-secondary px-6">Configure additional departmental shards for the clinical grid network.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
