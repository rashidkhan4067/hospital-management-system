import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button, Card, Badge } from '@/components/primitives';
import { motion, AnimatePresence } from 'framer-motion';
import DoctorBio from '../components/patient/DoctorBio';
import { AvailabilityCalendar, SlotPicker } from '../components/patient/AvailabilityCalendar';
import DoctorService from '@/features/clinical/doctors/api/doctorService';
import { useNotifications } from '@/core/hooks/useNotifications';

export default function PatientDoctorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await DoctorService.getById(id);
        setDoctor(data);
      } catch (err) {
        addNotification('Error', 'Clinical Node not found.', 'error');
        navigate('/doctors');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) {
      addNotification('Selection Required', 'Please select a date and time slot.', 'error');
      return;
    }
    // 🚀 Navigation to Page 4: Appointment Booking
    navigate(`/book/${id}`, { 
      state: { 
        doctor, 
        selectedDate: selectedDate.toISOString(), 
        selectedSlot 
      } 
    });
  };

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[600px] gap-6">
           <div className="w-16 h-16 rounded-[28px] bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary animate-spin">
              <Calendar size={32} />
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">Syncing Clinical Node...</p>
        </div>
     );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      {/* 🏙️ Navigation Shard */}
      <div className="flex items-center gap-4">
         <Button 
            onClick={() => navigate('/doctors')}
            className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-accent-primary/40 transition-all text-slate-400 hover:text-accent-primary flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border-none"
         >
            <ChevronLeft size={16} /> Back to Directory
         </Button>
         <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />
         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Specialist Node Identification</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
         {/* 🧛 Left: Doctor Profile & Bio */}
         <div className="xl:col-span-12">
            <DoctorBio doctor={doctor} />
         </div>

         {/* 🧭 Middle: Scheduling Matrix */}
         <div className="xl:col-span-8 space-y-10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl p-8 sm:p-12 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-soft hover:shadow-2als transition-all">
            <AvailabilityCalendar 
              selectedDate={selectedDate} 
              onDateSelect={(d) => {setSelectedDate(d); setSelectedSlot(null);}} 
            />
            
            <AnimatePresence>
               {selectedDate && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                 >
                    <SlotPicker 
                        selectedSlot={selectedSlot} 
                        onSlotSelect={setSelectedSlot} 
                    />
                 </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* 💳 Right: Summary & Action Card */}
         <div className="xl:col-span-4 h-fit">
            <Card className="p-8 sm:p-10 rounded-[3rem] bg-slate-950 border border-white/10 shadow-2als relative overflow-hidden group/final">
               <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none group-hover/final:bg-accent-primary/20 transition-all duration-1000" />
               
               <div className="relative z-10 flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10">
                        <CreditCard size={22} />
                     </div>
                     <div>
                        <h4 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">Consultation Summary</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Sana Integrated Billing</p>
                     </div>
                  </div>

                  <div className="space-y-4 py-6 border-y border-white/5">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none italic">Consultation Fee</span>
                        <span className="text-xl font-black text-white italic tabular-nums leading-none">Rs. {doctor.consultation_fee}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none italic">Clinical Tax</span>
                        <span className="text-xl font-black text-white/40 italic tabular-nums leading-none">Rs. 0</span>
                     </div>
                     <div className="flex justify-between items-center pt-4 mt-2">
                        <span className="text-[12px] font-black text-accent-primary uppercase tracking-widest leading-none italic">Total Identity Commitment</span>
                        <span className="text-3xl font-black text-white italic tabular-nums leading-none">Rs. {doctor.consultation_fee}</span>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center gap-3 text-slate-500">
                        <Calendar size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{selectedDate ? selectedDate.toLocaleDateString() : 'Date Not Selected'}</span>
                     </div>
                     <div className="flex items-center gap-3 text-slate-500">
                        <Clock size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{selectedSlot ? selectedSlot : 'Slot Not Selected'}</span>
                     </div>
                  </div>

                  <Button 
                     onClick={handleBooking}
                     disabled={!selectedDate || !selectedSlot}
                     className={`w-full py-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 ${
                       selectedDate && selectedSlot 
                       ? 'bg-accent-primary text-white shadow-xl shadow-accent-primary/30 border-none hover:scale-105' 
                       : 'bg-white/5 text-slate-600 border border-white/5 grayscale cursor-not-allowed'
                     }`}
                  >
                     <span className="text-[11px] font-black uppercase tracking-[0.3em] italic">Commit to Booking</span>
                     <ArrowRight size={16} />
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 opacity-40">
                     <ShieldCheck size={12} className="text-accent-primary" />
                     <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Secure Clinical Transaction v.42.0</p>
                  </div>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}


