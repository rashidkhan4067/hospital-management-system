import React from 'react';
import { Clock, Calendar, Stethoscope, XCircle } from 'lucide-react';
import { Card, Badge, Button } from '@/shared/components/ui';

const UpcomingAppointmentCard = ({ appointment, onCancel }) => {
  if (!appointment) return null;

  return (
    <Card className="h-full p-8 sm:p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-2als group/apt transition-all hover:border-accent-primary/20">
      <div className="flex flex-col h-full gap-6">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover/apt:scale-110 transition-transform duration-500">
                 <Stethoscope size={24} />
              </div>
              <div>
                 <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Next Visit</h3>
                 <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Sana Connected Clinic</p>
              </div>
           </div>
           <Badge className="bg-accent-primary/10 text-accent-primary border-none text-[8px] font-black uppercase px-4 py-1.5">{appointment.status || 'Confirmed'}</Badge>
        </div>

        <div className="space-y-4 py-4 border-y border-slate-100 dark:border-white/5">
           <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                 <Calendar size={16} className="text-accent-primary" />
                 <span className="text-[11px] font-black uppercase tracking-[0.1em] italic">{new Date(appointment.appointment_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3">
                 <Clock size={16} className="text-accent-primary" />
                 <span className="text-[11px] font-black uppercase tracking-[0.1em] italic">{appointment.appointment_time || '09:00 AM'}</span>
              </div>
           </div>
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Consulting with</p>
              <p className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mt-0.5 truncate">{appointment.doctor_detailed?.full_name || 'Al Shifaa Specialist'}</p>
           </div>
        </div>

        <div className="flex items-center gap-3 mt-auto">
           <Button 
            className="flex-1 bg-accent-primary text-white text-[10px] font-black uppercase tracking-widest py-4 rounded-2xl shadow-lg shadow-accent-primary/25 group/btn border-none"
           >
            View Details
           </Button>
           <Button
            onClick={() => onCancel(appointment.id)}
            variant="ghost"
            className="w-14 h-14 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-red-500/20 text-slate-400 hover:text-red-500 p-0 flex items-center justify-center transition-all bg-transparent"
           >
            <XCircle size={22} />
           </Button>
        </div>
      </div>
    </Card>
  );
};

export default UpcomingAppointmentCard;
