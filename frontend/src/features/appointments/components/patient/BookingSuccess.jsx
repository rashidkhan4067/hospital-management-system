import React from 'react';
import { CheckCircle2, Calendar, Clock, ArrowRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Card } from '@/shared/components/ui';
import { useNavigate } from 'react-router-dom';

const BookingSuccess = ({ doctor, date, slot }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 text-center space-y-8"
    >
      <div className="relative">
         <div className="w-24 h-24 rounded-[32px] bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/10">
            <CheckCircle2 size={48} />
         </div>
         <motion.div 
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ delay: 0.3 }}
           className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent-primary border-4 border-white dark:border-slate-910 flex items-center justify-center text-white"
         >
            <Calendar size={12} />
         </motion.div>
      </div>

      <div className="space-y-3">
         <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Booking Confirmed!</h2>
         <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Digital confirmation node synchronized • Email sent.</p>
      </div>

      <Card className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 max-w-md w-full">
         <div className="flex flex-col gap-4 text-left">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary font-black uppercase">
                  {doctor?.full_name?.[0]}
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Specialist</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">{doctor?.full_name}</p>
               </div>
            </div>
            <div className="h-[1px] bg-slate-100 dark:bg-white/5 w-full my-1" />
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{date}</span>
               </div>
               <div className="flex items-center gap-2 text-slate-500">
                  <Clock size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{slot}</span>
               </div>
            </div>
         </div>
      </Card>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
         <Button 
            onClick={() => navigate('/appointments')}
            className="w-full py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl"
         >
            View My Appointments <ArrowRight size={16} />
         </Button>
         <Button 
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            className="w-full py-5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-400 hover:text-accent-primary flex items-center justify-center gap-2 transition-all bg-transparent"
         >
            <Home size={16} /> Dashboard
         </Button>
      </div>
    </motion.div>
  );
};

export default BookingSuccess;
