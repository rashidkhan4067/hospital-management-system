import React from 'react';
import { Star, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { Card, Badge, Button } from '@/components/primitives';
import { useNavigate } from 'react-router-dom';

const PatientDoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <Card className="group relative p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-soft hover:shadow-2als transition-all duration-500 hover:border-accent-primary/20 overflow-hidden">
      {/* 🏔️ Background Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10 flex flex-col gap-6">
        {/* Top: Avatar + Rating */}
        <div className="flex items-start justify-between">
           <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-accent-primary/10 border border-accent-primary/10 flex items-center justify-center text-accent-primary font-black text-2xl group-hover:scale-105 transition-transform duration-500 overflow-hidden shadow-inner uppercase">
                 {doctor.photo_url ? (
                   <img src={doctor.photo_url} alt={doctor.full_name} className="w-full h-full object-cover" />
                 ) : (
                   doctor.full_name?.split(' ').map(n => n[0]).join('').slice(0,2) || 'Dr'
                 )}
              </div>
              {doctor.is_available && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 shadow-lg shadow-emerald-500/30" />
              )}
           </div>
           
           <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-amber-500">
                 <Star size={12} fill="currentColor" />
                 <span className="text-[11px] font-black tracking-tighter">4.9</span>
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Rating</p>
           </div>
        </div>

        {/* Content: Identity */}
        <div className="space-y-4">
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-primary italic">Specialist Node</p>
                 <ShieldCheck size={10} className="text-accent-primary animate-pulse" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">{doctor.full_name}</h3>
           </div>
           
           <Badge className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-none text-[8px] font-black uppercase px-4 py-1.5 w-fit">
              {doctor.specialization_display || doctor.specialization}
           </Badge>

           <div className="flex items-center gap-6 pt-2 border-t border-slate-100 dark:border-white/5 overflow-hidden">
              <div className="flex flex-col gap-0.5">
                 <p className="text-[10px] font-black text-slate-900 dark:text-white tabular-nums">{doctor.experience_years}Y+</p>
                 <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Experience</p>
              </div>
              <div className="flex flex-col gap-0.5">
                 <p className="text-[10px] font-black text-slate-900 dark:text-white tabular-nums">Rs. {doctor.consultation_fee}</p>
                 <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Consultation</p>
              </div>
           </div>
        </div>

        {/* Bottom: Action */}
        <div className="flex items-center gap-2 mt-2 pt-2">
           <Button 
            onClick={() => navigate(`/doctors/${doctor.id}`)}
            className="flex-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-[9px] font-black uppercase tracking-[0.2em] py-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all shadow-soft"
           >
            View Profile
           </Button>
           <Button
            onClick={() => navigate(`/book/${doctor.id}`)}
            className="flex-1 bg-accent-primary text-white text-[9px] font-black uppercase tracking-[0.2em] py-3 rounded-xl shadow-lg shadow-accent-primary/25 border-none hover:scale-105 transition-all flex items-center justify-center gap-2"
           >
            Book Now <ArrowRight size={12} />
           </Button>
        </div>
      </div>
    </Card>
  );
};

export default PatientDoctorCard;
