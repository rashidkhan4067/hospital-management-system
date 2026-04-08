import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, CreditCard, ShieldCheck, ArrowRight, User, Stethoscope, CheckCircle2 } from 'lucide-react';
import { Button, Card, Badge } from '@/components/primitives';
import { motion, AnimatePresence } from 'framer-motion';
import DoctorService from '@/features/doctors/api/doctorService';
import AppointmentService from '@/features/appointments/api/appointmentService';
import { useNotifications } from '@/hooks/useNotifications';
import BookingSuccess from '../components/patient/BookingSuccess';

const steps = [
  { id: 1, label: 'Doctor Node', icon: Stethoscope },
  { id: 2, label: 'Time Selection', icon: Clock },
  { id: 3, label: 'Identity Confirmation', icon: ShieldCheck }
];

export default function PatientBookingPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addNotification } = useNotifications();

  // 🧭 UI State
  const [step, setStep] = useState(3); // Start at 3 if coming from detail with info
  const [doctor, setDoctor] = useState(location.state?.doctor || null);
  const [selectedDate, setSelectedDate] = useState(location.state?.selectedDate ? new Date(location.state.selectedDate) : null);
  const [selectedSlot, setSelectedSlot] = useState(location.state?.selectedSlot || null);
  const [booked, setBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!doctor) {
       const fetchDoctor = async () => {
          try {
             const data = await DoctorService.getById(doctorId);
             setDoctor(data);
             setStep(2); // If we just have doctor, proceed to date select
          } catch (err) {
             addNotification('Error', 'Clinical Node not found.', 'error');
             navigate('/doctors');
          }
       };
       fetchDoctor();
    }
  }, [doctorId, doctor]);

  const handleBook = async () => {
    setIsSubmitting(true);
    try {
       const payload = {
          doctor: doctorId,
          appointment_date: selectedDate.toISOString().split('T')[0],
          appointment_time: selectedSlot,
          status: 'pending' // Or 'scheduled'
       };
       // 🚀 Call backend
       await AppointmentService.create(payload);
       setBooked(true);
    } catch (err) {
       addNotification('Error', 'Failed to synchronize booking with clinical matrix.', 'error');
    } finally {
       setIsSubmitting(false);
    }
  };

  if (booked) {
     return (
        <div className="min-h-[700px] flex items-center justify-center p-6 animate-in zoom-in duration-500">
           <div className="max-w-2xl w-full">
              <BookingSuccess 
                doctor={doctor} 
                date={selectedDate?.toLocaleDateString()} 
                slot={selectedSlot} 
              />
           </div>
        </div>
     );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1200px] mx-auto">
      {/* 🧭 Step Progress Shard */}
      <div className="flex flex-col items-center justify-center gap-10">
         <div className="flex items-center w-full max-w-lg relative px-4">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 dark:bg-white/5 -translate-y-1/2 -z-0" />
            <div className="absolute top-1/2 left-0 h-[2px] bg-accent-primary -translate-y-1/2 z-0 transition-all duration-500 shadow-md" style={{ width: `${(step-1)*50}%` }} />
            
            {steps.map((s, i) => (
               <div key={s.id} className="flex-1 flex flex-col items-center relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                    step >= s.id 
                    ? 'bg-accent-primary border-accent-primary text-white scale-110 shadow-lg shadow-accent-primary/20' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-400'
                  }`}>
                    {step > s.id ? <CheckCircle2 size={24} /> : <s.icon size={24} />}
                  </div>
                  <div className="absolute top-16 text-center whitespace-nowrap">
                    <p className={`text-[9px] font-black uppercase tracking-[0.2em] italic ${step >= s.id ? 'text-accent-primary' : 'text-slate-400'}`}>{s.label}</p>
                  </div>
               </div>
            ))}
         </div>
         <div className="h-6" /> 
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
         {/* 🧛 Left: Booking Detail Confirmation */}
         <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-10">
            <div className="space-y-4">
               <div>
                  <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Confirm Booking</h1>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic mt-2 opacity-60">Identity verification & slot commitment hub</p>
               </div>
            </div>

            <Card className="p-8 sm:p-12 rounded-[3.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-soft">
               <div className="space-y-10">
                  <div className="flex items-center gap-3">
                     <div className="w-1 h-5 bg-accent-primary rounded-full" />
                     <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Clinical Node Finalization</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-black/20 border border-transparent hover:border-accent-primary/10 transition-all flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                           <Stethoscope size={32} />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Specialist Unit</p>
                           <p className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mt-0.5 leading-none">{doctor?.full_name}</p>
                           <Badge className="bg-white/50 dark:bg-white/5 text-accent-primary border-none text-[8px] font-black uppercase px-3 py-1 mt-2">{doctor?.specialization_display || doctor?.specialization}</Badge>
                        </div>
                     </div>

                     <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-black/20 border border-transparent hover:border-accent-primary/10 transition-all flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                           <Calendar size={32} />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Date & Time Node</p>
                           <p className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mt-0.5 leading-none">{selectedDate?.toLocaleDateString()}</p>
                           <p className="text-[11px] font-black text-accent-primary uppercase tracking-[0.2em] italic mt-2">Slot: {selectedSlot}</p>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
                     <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
                           <ShieldCheck size={28} />
                        </div>
                        <div>
                           <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Secured by Sana Integration</h4>
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Clinical trust protocols active</p>
                        </div>
                     </div>
                     <Badge className="bg-indigo-500/10 text-indigo-500 border-none text-[9px] font-black uppercase px-6 py-2">Identity Verified</Badge>
                  </div>
               </div>
            </Card>

            <div className="flex items-center justify-between gap-6 px-4">
               <button 
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-3 text-slate-400 hover:text-slate-900 dark:hover:text-white text-[10px] font-black uppercase tracking-widest transition-all italic hover:-translate-x-2"
               >
                  <ChevronLeft size={16} /> Re-configure Slot
               </button>
               <div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-widest italic opacity-40">
                  Transaction Hub v.42.0.1 • <span className="text-emerald-500">Node Secure</span>
               </div>
            </div>
         </div>

         {/* 💳 Right: Payment/Confirm Shard */}
         <div className="lg:col-span-12 xl:col-span-4 h-fit sticky top-24">
            <Card className="p-10 rounded-[3rem] bg-slate-950 border border-white/5 shadow-2als relative overflow-hidden group/final">
               <div className="absolute top-0 right-0 w-full h-full bg-accent-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none group-hover/final:bg-accent-primary/10 transition-all duration-1000 opacity-60" />
               <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-accent-primary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-40" />

               <div className="relative z-10 flex flex-col gap-10">
                  <div className="space-y-2">
                     <p className="text-[9px] font-black uppercase tracking-[0.4em] text-accent-primary/80 italic">Billing Summary</p>
                     <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Confirm Submission</h4>
                  </div>

                  <div className="space-y-6">
                     <div className="flex justify-between items-center text-slate-500">
                        <span className="text-[11px] font-black uppercase tracking-widest italic">Base Fee</span>
                        <span className="text-xl font-black text-white italic tabular-nums">Rs. {doctor?.consultation_fee}</span>
                     </div>
                     <div className="flex justify-between items-center text-slate-500">
                        <span className="text-[11px] font-black uppercase tracking-widest italic">Clinical Tax</span>
                        <span className="text-xl font-black text-white/30 italic tabular-nums">Rs. 0</span>
                     </div>
                     <div className="h-[1px] bg-white/5 w-full my-2 border-t border-dashed" />
                     <div className="flex justify-between items-center">
                        <span className="text-[14px] font-black text-accent-primary uppercase tracking-widest italic">Total Commitment</span>
                        <span className="text-4xl font-black text-white italic tabular-nums tracking-tighter">Rs. {doctor?.consultation_fee}</span>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-center gap-4 text-white/40">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Instant Node Allocation</p>
                     </div>
                     <div className="flex items-center gap-4 text-white/40">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Email Identity Token</p>
                     </div>
                  </div>

                  <Button 
                    onClick={handleBook}
                    loading={isSubmitting}
                    className="w-full py-7 rounded-2xl bg-white dark:bg-white text-slate-900 dark:text-slate-950 text-[12px] font-black uppercase tracking-[0.4em] italic shadow-2xl flex items-center justify-center gap-3 border-none hover:scale-105 active:scale-95 transition-all"
                  >
                    Confirm Booking <ArrowRight size={20} />
                  </Button>

                  <p className="text-[8px] font-black text-center text-slate-600 uppercase tracking-widest leading-relaxed">
                    By confirming, you agree to Al Shifaa's Clinical Data Protocols and Identity Privacy Shards.
                  </p>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
