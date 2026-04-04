import React from 'react';
import { Calendar, Clock, Stethoscope, ChevronRight, XCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, Badge, Button } from '@/shared/components/ui';
import { motion } from 'framer-motion';

const AppointmentRow = ({ appointment, onCancel, index }) => {
  const isUpcoming = appointment.status === 'scheduled' || appointment.status === 'pending';
  const isCompleted = appointment.status === 'completed';
  const isCancelled = appointment.status === 'cancelled';

  const statusConfig = {
    scheduled: { color: 'text-blue-500 bg-blue-500/10', icon: Clock },
    pending: { color: 'text-amber-500 bg-amber-500/10', icon: AlertCircle },
    completed: { color: 'text-emerald-500 bg-emerald-500/10', icon: CheckCircle2 },
    cancelled: { color: 'text-rose-500 bg-rose-500/10', icon: XCircle },
  };

  const config = statusConfig[appointment.status] || statusConfig.pending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group relative p-6 sm:p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-soft hover:shadow-2als hover:border-accent-primary/20 transition-all duration-500 overflow-hidden cursor-pointer">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
           {/* Section 1: Doctor Identity */}
           <div className="flex items-center gap-6 lg:w-[35%]">
              <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary font-black uppercase text-xl group-hover:scale-110 transition-transform duration-500">
                 {appointment.doctor_detailed?.full_name?.[0] || appointment.doctor_name?.[0] || 'D'}
              </div>
              <div className="space-y-1">
                 <div className="flex items-center gap-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-primary italic leading-none">Clinical Node</p>
                    <Stethoscope size={10} className="text-accent-primary" />
                 </div>
                 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">{appointment.doctor_detailed?.full_name || appointment.doctor_name || 'Al Shifaa Specialist'}</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{appointment.doctor_detailed?.specialization_display || appointment.specialization || 'General Consultation'}</p>
              </div>
           </div>

           {/* Section 2: Temporal Node */}
           <div className="flex items-center gap-10 lg:w-[35%]">
              <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-2 text-slate-400">
                    <Calendar size={14} className="text-accent-primary" />
                    <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Date</p>
                 </div>
                 <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase italic tracking-widest">{new Date(appointment.appointment_date).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={14} className="text-accent-primary" />
                    <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Time Slot</p>
                 </div>
                 <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase italic tracking-widest">{appointment.appointment_time || '09:00 AM'}</p>
              </div>
           </div>

           {/* Section 3: Status & Action */}
           <div className="flex items-center justify-between lg:justify-end gap-6 lg:w-[30%]">
              <Badge className={`${config.color} border-none text-[9px] font-black uppercase px-6 py-2 rounded-xl flex items-center gap-2 h-fit`}>
                 <config.icon size={12} />
                 {appointment.status}
              </Badge>
              
              <div className="flex items-center gap-3">
                 {isUpcoming && (
                   <Button 
                    onClick={(e) => { e.stopPropagation(); onCancel(appointment.id); }}
                    variant="ghost"
                    className="w-12 h-12 rounded-xl border border-rose-100 dark:border-rose-500/10 text-rose-500 hover:bg-rose-500/10 p-0 flex items-center justify-center transition-all bg-transparent"
                    title="Cancel Node"
                   >
                    <XCircle size={20} />
                   </Button>
                 )}
                 <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-accent-primary group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                 </div>
              </div>
           </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AppointmentRow;
