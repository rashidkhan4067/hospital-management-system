import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Card, Button } from '@/components/primitives';
import { motion, AnimatePresence } from 'framer-motion';

const AvailabilityCalendar = ({ selectedDate, onDateSelect, availableDays = ['Monday', 'Wednesday', 'Friday'] }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getWeekDays = (date) => {
    const days = [];
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday
    
    for(let i=0; i<7; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeek);
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
         <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Select Consultation Date</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Clinical Node Synchronized</p>
         </div>
         <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                const d = new Date(currentWeek);
                d.setDate(d.getDate() - 7);
                setCurrentWeek(d);
              }}
              className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-accent-primary/40 transition-all text-slate-400 hover:text-accent-primary"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => {
                const d = new Date(currentWeek);
                d.setDate(d.getDate() + 7);
                setCurrentWeek(d);
              }}
              className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-accent-primary/40 transition-all text-slate-400 hover:text-accent-primary"
            >
              <ChevronRight size={16} />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {weekDays.map((day, i) => {
          const isSelected = selectedDate?.toDateString() === day.toDateString();
          const dayName = day.toLocaleDateString('en-US', { weekday: 'long' });
          const isAvailable = availableDays.includes(dayName);
          const isPast = day < new Date(new Date().setHours(0,0,0,0));

          return (
            <motion.button
              key={i}
              whileHover={!isPast && isAvailable ? { scale: 1.05 } : {}}
              whileTap={!isPast && isAvailable ? { scale: 0.95 } : {}}
              disabled={isPast || !isAvailable}
              onClick={() => onDateSelect(day)}
              className={`p-5 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all duration-300 border ${
                isSelected 
                  ? 'bg-accent-primary border-accent-primary text-white shadow-xl shadow-accent-primary/25' 
                  : isAvailable && !isPast
                    ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-white/5 text-slate-900 dark:text-white hover:border-accent-primary/20'
                    : 'bg-slate-50 dark:bg-black/20 border-transparent text-slate-400 dark:text-slate-600 cursor-not-allowed grayscale'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-white' : 'text-slate-400'}`}>{dayNames[i]}</span>
              <span className="text-2xl font-black italic tracking-tighter leading-none">{day.getDate()}</span>
              {isAvailable && !isPast && !isSelected && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

const SlotPicker = ({ slots = ['09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '05:00 PM'], selectedSlot, onSlotSelect }) => {
  return (
    <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-white/5">
       <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Available Time Nodes</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Real-time scheduling matrix active</p>
       </div>
       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {slots.map((slot, i) => (
            <button
              key={i}
              onClick={() => onSlotSelect(slot)}
              className={`p-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 border ${
                selectedSlot === slot
                  ? 'bg-accent-primary border-accent-primary text-white shadow-xl shadow-accent-primary/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-accent-primary/30 shadow-soft'
              }`}
            >
              <Clock size={14} className={selectedSlot === slot ? 'text-white' : 'text-accent-primary'} />
              <span className="text-[11px] font-black uppercase tracking-widest italic">{slot}</span>
            </button>
          ))}
       </div>
    </div>
  );
};

export { AvailabilityCalendar, SlotPicker };
