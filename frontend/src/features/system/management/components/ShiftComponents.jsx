import React from 'react';
import { Card, Badge, Button } from '@/components/primitives';
import { 
  Clock, Sun, Moon, Sunrise, Users, 
  MapPin, CheckCircle, AlertCircle, ChevronLeft, 
  ChevronRight, Calendar, User, MoreVertical, ArrowUpRight 
} from 'lucide-react';

/**
 * 🛰️ Shift Timeline Shard — High-fidelity duty progression
 */
export function ShiftTimelineShard() {
  const shifts = [
    { name: 'Morning Shard', time: '08:00 - 16:00', icon: Sunrise, status: 'Active', color: 'text-orange-500', bg: 'bg-orange-500/5', count: 12 },
    { name: 'Evening Node', time: '16:00 - 00:00', icon: Sun, status: 'Standby', color: 'text-blue-500', bg: 'bg-blue-500/5', count: 8 },
    { name: 'Night Pulse', time: '00:00 - 08:00', icon: Moon, status: 'Scheduled', color: 'text-indigo-500', bg: 'bg-indigo-500/5', count: 6 },
  ];

  return (
    <div className="flex flex-col gap-6">
       {shifts.map((shift, i) => (
          <Card key={i} className="p-6 rounded-[2rem] bg-white dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/5 shadow-2als group hover:bg-slate-50 transition-all cursor-pointer italic">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-xl ${shift.bg} flex items-center justify-center ${shift.color} border border-current/10 shrink-0`}>
                      <shift.icon size={22} strokeWidth={2.5} />
                   </div>
                   <div className="flex flex-col min-w-0">
                      <h4 className="text-[13px] font-black uppercase text-slate-900 dark:text-white tracking-widest leading-none font-display truncate">
                        {shift.name} 
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                         <Clock size={10} className="text-slate-400" />
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{shift.time}</span>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                   <Badge variant={shift.status === 'Active' ? 'success' : 'outline'} className="text-[8px] font-black uppercase italic">
                      {shift.status} Shift
                   </Badge>
                   <span className="text-[9px] font-black text-slate-400 uppercase opacity-50">{shift.count} Nodes Active</span>
                </div>
             </div>
          </Card>
       ))}
    </div>
  );
}

/**
 * 📅 Shift Matrix Shard — High-Density Duty Grid
 */
export function ShiftMatrixShard({ selectedDay = new Date() }) {
  const staff = [
    { id: 1, name: 'Dr. Sarah Chen', role: 'Cardiology', shiftSlot: 'Morning', status: 'On-Call', color: 'accent-primary' },
    { id: 2, name: 'Alex Rivera', role: 'Nurse Elite', shiftSlot: 'Evening', status: 'On-Duty', color: 'orange-500' },
    { id: 3, name: 'Maya Sterling', role: 'Logistics', shiftSlot: 'Night', status: 'Scheduled', color: 'indigo-500' },
    { id: 4, name: 'Dr. James Wilson', role: 'Radiology', shiftSlot: 'Morning', status: 'Duty Sync', color: 'emerald-500' },
  ];

  return (
    <Card className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-2als relative overflow-hidden flex flex-col gap-8 group italic min-h-[500px]">
       <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
       
       <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-accent-primary border border-white/10 shadow-2xl">
                <Calendar size={24} strokeWidth={2.5} />
             </div>
             <div className="flex flex-col">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none font-display">Duty Hub Matrix</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 opacity-60">Session Synchronization: {selectedDay.toLocaleDateString()}</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" className="w-9 h-9 p-0 rounded-xl bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-sm"><ChevronLeft size={16} /></Button>
             <Button variant="outline" className="w-9 h-9 p-0 rounded-xl bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-sm"><ChevronRight size={16} /></Button>
          </div>
       </div>

       <div className="flex flex-col gap-5 relative z-10">
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10">
             <span className="col-span-6 text-[9px] font-black uppercase text-slate-400 tracking-widest italic">Personnel Identity Node</span>
             <span className="col-span-3 text-[9px] font-black uppercase text-slate-400 tracking-widest italic text-center">Duty Slot</span>
             <span className="col-span-3 text-[9px] font-black uppercase text-slate-400 tracking-widest italic text-right">Status Sync</span>
          </div>

          <div className="space-y-3">
             {staff.map((s, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 items-center p-4 rounded-[1.5rem] hover:bg-slate-50 dark:hover:bg-white/5 transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5 group/row">
                   <div className="col-span-6 flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-[1.1rem] bg-${s.color}/10 flex items-center justify-center text-${s.color} border border-${s.color}/20 min-w-[2.75rem]`}>
                         <User size={20} />
                      </div>
                      <div className="flex flex-col min-w-0">
                         <p className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tighter truncate font-display">{s.name}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60 italic">{s.role}</p>
                      </div>
                   </div>
                   <div className="col-span-3 flex justify-center">
                      <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border border-slate-200/50">
                         {s.shiftSlot}
                      </Badge>
                   </div>
                   <div className="col-span-3 flex justify-end">
                      <div className="flex items-center gap-2">
                         <div className={`w-1.5 h-1.5 rounded-full bg-${s.color} animate-pulse`} />
                         <span className="text-[10px] font-black uppercase text-slate-500 whitespace-nowrap">{s.status}</span>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>

       <div className="mt-auto flex items-center justify-between p-6 bg-slate-950 rounded-[2rem] text-white border border-white/5 shadow-2xl relative overflow-hidden group/cta cursor-pointer">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[60px] rounded-full pointer-events-none transition-transform group-hover/cta:scale-150 duration-1000" />
          <div className="flex items-center gap-4 relative z-10">
             <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 shadow-sm">
                <Users size={18} className="text-white" />
             </div>
             <div className="flex flex-col">
                <h4 className="text-[11px] font-black uppercase italic tracking-widest leading-none">Roster Optimization</h4>
                <p className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">Personnel Allocation: Balanced</p>
             </div>
          </div>
          <ArrowUpRight size={18} className="text-white opacity-40 group-hover/cta:opacity-100 transition-opacity relative z-10" />
       </div>
    </Card>
  );
}

/**
 * ⚡ OperationalSyncShard — Performance Analytics
 */
export function OperationalSyncShard() {
    return (
        <Card className="p-8 rounded-[2.5rem] bg-indigo-600 text-white border-none flex flex-col gap-6 shadow-2als relative overflow-hidden group italic">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 blur-[80px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-[2s]" />
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white border border-white/20 shadow-sm transition-transform group-hover:rotate-12 italic">
                    <CheckCircle size={18} className="text-white" />
                </div>
                <h4 className="text-[12px] font-black uppercase italic tracking-widest leading-none font-display text-white">Clinical Sync</h4>
            </div>
            
            <div className="mt-2 space-y-1 relative z-10">
                <p className="text-3xl font-black italic tracking-tighter leading-none text-white">Sync Finalized</p>
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest italic opacity-80 mt-2">All duty nodes successfully provisioned for the current timeline cycle.</p>
            </div>

            <div className="mt-auto flex flex-col gap-3 relative z-10">
               <div className="flex items-center justify-between text-[10px] font-black uppercase">
                  <span>Load Node 01</span>
                  <span className="text-white/60 italic">Stable</span>
               </div>
               <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-full" />
               </div>
            </div>
        </Card>
    );
}
