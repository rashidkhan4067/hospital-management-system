import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Activity, Globe, Zap, ArrowRight, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/features/auth/LoginForm';

/**
 * 🔓 LoginPage - Sleek Horizontal Split Hub (V6.1)
 * Features: Mobile-optimized (Hide sidebar), Dynamic Home/Dashboard routing.
 */
export default function LoginPage() {
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 lg:p-10 bg-[#f8f9fc] selection:bg-[#007aff] selection:text-white relative">
      
      {/* 🚀 Floating Command Links (Top Right) */}
      <div className="absolute top-8 right-8 z-[100] flex items-center gap-4">
          <Link to="/" className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-[#1d1d1f] hover:bg-slate-50 transition-all shadow-sm">
             <Heart size={18} />
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="h-10 px-6 bg-[#1d1d1f] text-white rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
               Command Hub <LayoutGrid size={14} />
            </Link>
          )}
      </div>

      {/* 🏛️ Letterbox Split Monolith */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1150px] lg:h-[680px] bg-white rounded-[32px] lg:rounded-[40px] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row border border-slate-50/50"
      >
          {/* 🏔️ Sidebar - Clinical Identity (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:w-[40%] flex-col bg-[#007aff] text-white overflow-hidden">
              <div className="h-[45%] lg:h-[50%] w-full relative overflow-hidden group">
                  <img 
                    src="/assets/images/auth-sidebar.png" 
                    alt="Clinical Specialist"
                    className="w-full h-full object-cover grayscale-[10%] contrast-[1.05] group-hover:scale-110 transition-transform duration-[3s]"
                  />
                  <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
              </div>

              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center relative">
                   <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                   
                   <div className="flex items-center gap-3 mb-6 lg:mb-10">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-xl">
                         <Heart size={16} fill="white" className="text-white" />
                      </div>
                      <span className="text-[10px] font-black tracking-[0.4em] uppercase">Al Shifaa</span>
                   </div>

                   <div className="space-y-4 relative z-10">
                      <h2 className="text-3xl lg:text-[2.6rem] font-black tracking-tighter leading-[0.9] italic uppercase">
                         Welcome <br /> <span className="opacity-40">Clinical Unit.</span>
                      </h2>
                      <div className="w-12 h-1 bg-white/20"></div>
                      <p className="text-xs font-medium leading-relaxed opacity-70 max-w-[200px]">
                         Establishing high-integrity clinical connection to the specialist network.
                      </p>
                   </div>
              </div>
          </div>

          {/* 📄 Auth Section - Highnd Form Hub */}
          <div className="w-full lg:w-[60%] bg-white p-8 lg:p-14 pt-24 lg:pt-24 pb-16 lg:pb-16 flex flex-col overflow-y-auto no-scrollbar">
              <div className="w-full max-w-[420px] mx-auto space-y-12">
                  <header className="space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                         <div className="p-1 bg-[#007aff]/5 text-[#007aff] rounded-lg">
                            <ShieldCheck size={16} />
                         </div>
                         <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#007aff]">Secure Unit 01</span>
                      </div>
                  </header>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-in fade-in duration-500">
                        <Activity size={14} className="text-red-500" />
                        <p className="text-[9px] font-black uppercase tracking-widest text-red-600 leading-none">{error}</p>
                    </div>
                  )}

                  <LoginForm setError={setError} />

                  <footer className="pt-8 border-t border-slate-50">
                     <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#86868b] flex items-center justify-between">
                        New Patient? 
                        <Link to="/register" className="text-[#007aff] hover:opacity-70 transition-opacity whitespace-nowrap">
                            Create ID <ArrowRight size={12} className="inline ml-1" />
                        </Link>
                     </p>
                  </footer>
              </div>
          </div>
      </motion.div>
    </div>
  );
}
