import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Activity, UserPlus, Globe, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/features/auth/RegisterForm';

/**
 * 📝 RegisterPage - Sleek Horizontal Split Hub (V6)
 * Design: Wider horizontal profile (1150px) and decreased vertical height for a premium 'Letterbox' look.
 * Theme: Inspired by highnd Enterprise Portals – Al Shifaa Elite.
 */
export default function RegisterPage() {
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 lg:p-10 bg-[#f8f9fc] selection:bg-[#007aff] selection:text-white">
      {/* 🏛️ Letterbox Split Monolith */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1150px] lg:h-[720px] bg-white rounded-[40px] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row border border-slate-50/50"
      >
          {/* 🏔️ Sidebar - Clinical Identity (Sleek Section) */}
          <div className="lg:w-[40%] flex flex-col bg-[#007aff] text-white overflow-hidden">
              <div className="h-[40%] lg:h-[45%] w-full relative overflow-hidden group">
                  <img 
                    src="/assets/images/auth-sidebar.png" 
                    alt="Clinical Admission"
                    className="w-full h-full object-cover grayscale-[10%] contrast-[1.05] group-hover:scale-110 transition-transform duration-[3s]"
                  />
                  <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
              </div>

              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center relative">
                   {/* Brand Pulse */}
                   <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                   
                   <div className="flex items-center gap-3 mb-6 lg:mb-10">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-xl">
                         <Heart size={16} fill="white" className="text-white" />
                      </div>
                      <span className="text-[10px] font-black tracking-[0.4em] uppercase">Al Shifaa</span>
                   </div>

                   <div className="space-y-4 relative z-10">
                      <h2 className="text-3xl lg:text-[2.6rem] font-black tracking-tighter leading-[0.9] italic uppercase">
                         Establish <br /> <span className="opacity-40">Clinical Profile.</span>
                      </h2>
                      <div className="w-12 h-1 bg-white/20"></div>
                      <p className="text-xs font-medium leading-relaxed opacity-70 max-w-[200px]">
                         Join the clinical federation to access unified diagnostic units instantly.
                      </p>
                   </div>
              </div>
          </div>

          {/* 📄 Auth Section - Highnd Form Hub */}
          <div className="lg:w-[60%] bg-white p-8 lg:p-14 lg:pt-24 lg:pb-16 flex flex-col overflow-y-auto no-scrollbar">
              <div className="w-full max-w-[420px] mx-auto space-y-12">
                  <header className="space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                         <div className="p-1 bg-[#007aff]/5 text-[#007aff] rounded-lg">
                            <UserPlus size={16} />
                         </div>
                         <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#007aff]">Protocol Start</span>
                      </div>
                  </header>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-1 duration-500">
                        <Activity size={14} className="text-red-500" />
                        <p className="text-[9px] font-black uppercase tracking-widest text-red-600 leading-none">{error}</p>
                    </div>
                  )}

                  <RegisterForm setError={setError} />

                  <footer className="pt-8 border-t border-slate-50">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#86868b] flex items-center justify-between">
                        Registered Patient? 
                        <Link to="/login" className="text-[#007aff] hover:opacity-70 transition-opacity whitespace-nowrap">
                            Join Session <ArrowRight size={12} className="inline ml-1" />
                        </Link>
                     </p>
                  </footer>
              </div>
          </div>
      </motion.div>
    </div>
  );
}
