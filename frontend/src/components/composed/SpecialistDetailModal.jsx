import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe2, Stethoscope, Star, Calendar, Clock, DollarSign, Award, ShieldCheck, Heart, Zap, ChevronRight, Activity, MapPin, BookOpen } from 'lucide-react';
import { Badge, Button } from '@/components/primitives';

import { useAuth } from '@/core/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * 🌠 SpecialistDetailModal - Modern Pop-up Edition (v2.2)
 * Features: Auth-gate for clinical engagement.
 */
export default function SpecialistDetailModal({ doc, isOpen, onClose }) {
  const [selectedDate, setSelectedDate] = useState('Today');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Robust scroll lock and safety
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Proceed with booking logic (to be implemented)
    console.log("Establish Session logic triggered for:", doc.full_name);
  };

  if (!doc) return null;

  const dates = ['Today', 'Tomorrow', 'Thu 12', 'Fri 13'];
  const slots = ['09:30 AM', '11:00 AM', '02:00 PM', '04:30 PM'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 lg:p-12 overflow-hidden">
          {/* 🏔️ Deep Liquid Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#fbfbfd]/95 backdrop-blur-[100px]"
          />

          {/* 🏛️ Modern Floating Pop-up Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`
              relative w-full max-w-5xl max-h-[90vh] bg-white 
              shadow-[0_80px_160px_-40px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col 
              rounded-[48px] border border-slate-100/50
            `}
          >
            {/* 🔝 Floating Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-50 w-12 h-12 bg-[#1d1d1f] text-white rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl"
            >
              <X size={20} />
            </button>

            {/* 📜 Content Integration */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-10 lg:p-16 space-y-16">
                
                {/* 🌌 Minimal Header with Profile Pulse */}
                <div className="space-y-8">
                   <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-2">
                                <Badge className="bg-[#007aff]/5 text-[#007aff] border-none px-4 py-1 text-[9px] font-black uppercase tracking-[0.2em] shadow-sm">Board Certified Specialist</Badge>
                                <Badge className="bg-emerald-50 text-emerald-600 border-none px-4 py-1 text-[9px] font-black uppercase tracking-[0.2em]">Live In-Network</Badge>
                            </div>
                            <h2 className="text-5xl lg:text-[5.5rem] font-black text-[#1d1d1f] tracking-tighter leading-[0.85]">
                                Dr. {doc.full_name}
                            </h2>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Stethoscope size={18} className="text-[#007aff]" />
                                    <span className="text-sm font-black text-[#86868b] uppercase tracking-widest">{doc.specialization_display}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star size={16} fill="#ffcc00" className="text-[#ffcc00]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1d1d1f]">Top Tier Unit</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block w-32 h-32 bg-[#f5f5f7] rounded-[40px] flex items-center justify-center text-[#007aff] ring-4 ring-[#007aff]/5">
                            <Activity size={56} strokeWidth={1} />
                        </div>
                   </div>
                </div>

                {/* 🧪 Expert Profile Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Education & Bio */}
                    <div className="lg:col-span-2 space-y-10 order-2 lg:order-1">
                        <section className="space-y-6">
                             <div className="flex items-center gap-4 text-[#1d1d1f]">
                                <BookOpen size={18} className="text-[#007aff]" />
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Clinical Credentials</h3>
                             </div>
                             <p className="text-xl lg:text-2xl font-semibold text-[#1d1d1f] leading-relaxed">
                                {doc.education || "MBBS, Resident Fellowship (Specialized Unit)"}
                             </p>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-4 text-[#1d1d1f]">
                                <Zap size={18} className="text-[#007aff]" />
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Professional Synopsis</h3>
                             </div>
                            <p className="text-lg lg:text-xl text-[#86868b] leading-relaxed font-medium">
                                {doc.bio || `Senior expert in ${doc.specialization_display} with advanced training in clinical diagnostics and unified medicine protocols.`}
                            </p>
                        </section>
                    </div>

                    {/* Technical stats panel */}
                    <div className="space-y-4 order-1 lg:order-2">
                        {[
                          { icon: <Award size={18} />, label: "Ex-Level", value: `${doc.experience_years}Y+ Clinical` },
                          { icon: <ShieldCheck size={18} />, label: "Unit ID", value: `PMDC-${doc.license_number?.split('-')?.[1] || 'VBD'}` },
                          { icon: <MapPin size={18} />, label: "Station", value: doc.clinic_address || "Clinical Wing A" },
                          { icon: <Globe2 size={18} />, label: "Interface", value: "EN, UR" }
                        ].map((item, i) => (
                          <div key={i} className="p-6 bg-[#fbfbfd] rounded-2xl border border-slate-50 transition-all hover:shadow-soft">
                              <p className="text-[8px] font-black uppercase tracking-widest text-[#86868b] mb-1">{item.label}</p>
                              <div className="flex items-center gap-3">
                                <div className="text-[#007aff]">{item.icon}</div>
                                <p className="text-base font-black text-[#1d1d1f]">{item.value}</p>
                              </div>
                          </div>
                        ))}
                    </div>
                </div>

                {/* 🗓️ Clinical Scheduler Interface */}
                <div className="space-y-12 border-t border-slate-50 pt-16 pb-12">
                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                         <Calendar size={18} className="text-[#007aff]" />
                         <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1d1d1f]">Tactical Schedule Matrix</h3>
                      </div>
                      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
                        {dates.map(date => (
                            <button 
                                key={date}
                                onClick={() => setSelectedDate(date)}
                                className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    selectedDate === date ? 'bg-[#1d1d1f] text-white shadow-xl' : 'bg-[#f5f5f7] text-[#86868b] hover:bg-slate-200'
                                }`}
                            >
                                {date}
                            </button>
                        ))}
                      </div>
                   </div>

                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {slots.map(slot => (
                        <button key={slot} className="p-8 border border-slate-50 rounded-[32px] text-lg font-black text-[#1d1d1f] hover:border-[#007aff] hover:bg-[#007aff]/5 transition-all group">
                           <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-2 group-hover:animate-pulse">Active Unit</p>
                           {slot}
                        </button>
                      ))}
                   </div>
                </div>
            </div>

            {/* 🏷️ Strategic Footer */}
            <footer className="p-10 lg:px-16 border-t border-slate-50 bg-[#fbfbfd]/50 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#86868b]">Consultation Unit Engagement</p>
                   <p className="text-4xl font-black text-[#1d1d1f]">Rs. {doc.consultation_fee}</p>
                </div>
                <Button 
                    onClick={handleBooking}
                    className="w-full sm:w-auto h-20 px-16 rounded-3xl bg-[#007aff] text-white font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-5 group"
                >
                    Establish Session Match <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Button>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
