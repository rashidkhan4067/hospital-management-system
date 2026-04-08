import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/core/auth/AuthContext';
import LoginForm from '@/features/auth/components/LoginForm';
import PageContainer from '@/components/composed/PageContainer';

/**
 * 🔓 LoginPage - Sleek Horizontal Split Hub
 */
export default function LoginPage() {
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  return (
    <PageContainer 
      title="Login" 
      description="Access your Al Shifaa clinical dashboard."
      maxWidth="lg"
      className="flex items-center justify-center"
    >
      {/* 🏛️ Letterbox Split Monolith */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1150px] lg:h-[680px] bg-white rounded-[32px] lg:rounded-[40px] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row border border-slate-50/50"
      >
          {/* 🏔️ Sidebar - Clinical Identity */}
          <div className="hidden lg:flex lg:w-[40%] flex-col bg-[#007aff] text-white overflow-hidden">
              <div className="h-[50%] w-full relative overflow-hidden group">
                  <img 
                    src="/assets/images/auth-sidebar.png" 
                    alt="Clinical Specialist"
                    className="w-full h-full object-cover grayscale-[10%] contrast-[1.05] group-hover:scale-110 transition-transform duration-[3s]"
                  />
                  <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
              </div>

              <div className="flex-1 p-12 flex flex-col justify-center relative">
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

          {/* 📄 Auth Section */}
          <div className="w-full lg:w-[60%] bg-white p-8 lg:p-14 pt-24 pb-16 flex flex-col overflow-y-auto">
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
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
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
    </PageContainer>
  );
}
