import React from 'react';
import { Award, DollarSign, Clock, ShieldCheck, Star } from 'lucide-react';
import { Card, Badge } from '@/shared/components/ui';

const DoctorBio = ({ doctor }) => {
  return (
    <Card className="p-8 sm:p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-2als relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start md:items-center">
        {/* Avatar Shard */}
        <div className="relative shrink-0">
           <div className="w-32 h-32 rounded-[40px] bg-accent-primary/10 border-2 border-accent-primary/20 flex items-center justify-center text-accent-primary font-black text-4xl shadow-lg shadow-accent-primary/10 overflow-hidden uppercase">
              {doctor.photo_url ? (
                <img src={doctor.photo_url} alt={doctor.full_name} className="w-full h-full object-cover" />
              ) : (
                doctor.full_name?.split(' ').map(n => n[0]).join('').slice(0,2) || 'Dr'
              )}
           </div>
           <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-2xl bg-emerald-500 border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center">
              <ShieldCheck size={14} className="text-white" />
           </div>
        </div>

        {/* Content Node */}
        <div className="flex-1 space-y-6">
           <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">{doctor.full_name}</h1>
                 <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[11px] font-black tracking-tighter">4.9</span>
                 </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                 <Badge className="bg-accent-primary/10 text-accent-primary border-none text-[10px] font-black uppercase px-5 py-2">{doctor.specialization_display || doctor.specialization}</Badge>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">• Pakistan Medical Council Verified</span>
              </div>
           </div>

           <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-2xl">
              {doctor.about || `${doctor.full_name} is a highly accomplished specialist in ${doctor.specialization} with over ${doctor.experience_years} years of institutional experience. Dedicated to providing precision clinical diagnostics and patient-centric care models.`}
           </p>

           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-100 dark:border-white/5">
              <div className="space-y-1">
                 <p className="text-xl font-black text-slate-900 dark:text-white italic tabular-nums leading-none">{doctor.experience_years}Y+</p>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Experience</p>
              </div>
              <div className="space-y-1">
                 <p className="text-xl font-black text-slate-900 dark:text-white italic tabular-nums leading-none">Rs. {doctor.consultation_fee}</p>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Consultation</p>
              </div>
              <div className="space-y-1">
                 <p className="text-xl font-black text-slate-900 dark:text-white italic tabular-nums leading-none">98%</p>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Success Rate</p>
              </div>
              <div className="space-y-1">
                 <p className="text-xl font-black text-emerald-500 italic tabular-nums leading-none">Active</p>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
              </div>
           </div>
        </div>
      </div>
    </Card>
  );
};

export default DoctorBio;
