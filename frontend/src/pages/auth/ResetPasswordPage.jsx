import React, { useState } from 'react';
import { Lock, ArrowLeft, Send, Sparkles, CheckCircle, ShieldCheck, Heart, Activity } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input, Button, Badge, Alert } from '../../components/ui';
import api from '../../services/apiClient';

/**
 * 🔐 ResetPasswordPage - Sleek Horizontal Split Hub (V6)
 * Design: Unified Horizontal Profile consistent with Login suite.
 * Theme: Clinical Security & Elite Prism.
 */
export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!uid || !token) {
        setError('Security Protocol Violation: Missing Token');
        return;
    }
    
    if (password !== confirmPassword) {
      setError('Key Mismatch: Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Complexity Error: Password too short');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await api.post('auth/password/reset/confirm/', { 
        uid, 
        token, 
        new_password1: password,
        new_password2: confirmPassword
      });
      setIsSuccess(true);
    } catch (err) {
      console.error('Password Reset Error:', err.response?.data);
      setError('Reset Link Expired or Protocol Dispatch Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 lg:p-10 bg-[#f8f9fc] selection:bg-[#007aff] selection:text-white">
      {/* 🏛️ Letterbox Split Monolith */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1150px] lg:h-[720px] bg-white rounded-[40px] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row border border-slate-50/50"
      >
          {/* 🏔️ Sidebar - Clinical Identity */}
          <div className="lg:w-[40%] flex flex-col bg-[#007aff] text-white">
              <div className="h-[40%] lg:h-[45%] w-full relative overflow-hidden group">
                  <img 
                    src="/assets/images/auth-sidebar.png" 
                    alt="Clinical Reset"
                    className="w-full h-full object-cover grayscale-[10%] contrast-[1.05] group-hover:scale-110 transition-transform duration-[3s]"
                  />
                  <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
              </div>

              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center relative">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-xl">
                         <Heart size={16} fill="white" className="text-white" />
                      </div>
                      <span className="text-[10px] font-black tracking-[0.4em] uppercase">Al Shifaa</span>
                   </div>

                   <div className="space-y-4 relative z-10">
                      <h2 className="text-3xl lg:text-[2.6rem] font-black tracking-tighter leading-[0.9] italic uppercase">
                         Secure <br /> <span className="opacity-40">Override.</span>
                      </h2>
                      <div className="w-12 h-1 bg-white/20"></div>
                      <p className="text-xs font-medium leading-relaxed opacity-70 max-w-[200px]">
                         Establishing a new clinical master key for your unified profile.
                      </p>
                   </div>
              </div>
          </div>

          {/* 📄 Auth Section - Highnd Form Hub */}
          <div className="lg:w-[60%] bg-white p-8 lg:p-14 flex flex-col justify-center overflow-y-auto no-scrollbar">
              <div className="w-full max-w-[420px] mx-auto space-y-12">
                  <header className="space-y-3">
                      <div className="flex items-center gap-2">
                         <div className="p-1 bg-[#007aff]/5 text-[#007aff] rounded-lg">
                            <ShieldCheck size={16} />
                         </div>
                         <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#007aff]">Security Gate 02</span>
                      </div>
                  </header>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-1 duration-500">
                        <Activity size={14} className="text-red-500" />
                        <p className="text-[9px] font-black uppercase tracking-widest text-red-600 leading-none">{error}</p>
                    </div>
                  )}

                  {isSuccess ? (
                    <div className="space-y-10 animate-in zoom-in-95 duration-500 text-center lg:text-left">
                        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[40px] flex items-center justify-center mx-auto lg:mx-0 shadow-sm ring-4 ring-emerald-500/5">
                           <CheckCircle size={48} strokeWidth={1} />
                        </div>
                        <div className="space-y-4">
                           <h3 className="text-4xl font-black text-[#1d1d1f] tracking-tighter italic uppercase">Updated.</h3>
                           <p className="text-base font-medium text-[#86868b] leading-relaxed">
                              Your clinical master key has been synchronized. Access is now restored via the main Identity Hub.
                           </p>
                        </div>
                        <Button onClick={() => window.location.href = '/login'} className="w-full h-20 rounded-[32px] bg-[#1d1d1f] text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-4 group/btn">
                           Back to Identity Hub <ArrowLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
                        </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="space-y-8">
                            <Input 
                                label="New Master Key"
                                type="password" 
                                placeholder="Enter secure key..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={Lock}
                                required
                            />
                            
                            <Input 
                                label="Verify Master Key"
                                type="password" 
                                placeholder="Sync secure key..."
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                icon={ShieldCheck}
                                required
                            />
                        </div>

                        <Button 
                          type="submit" 
                          loading={loading} 
                          className="w-full h-20 rounded-[32px] bg-[#1d1d1f] text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-4 group/btn"
                        >
                           Override Protocol <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </Button>
                    </form>
                  )}

                  <footer className="pt-8 border-t border-slate-50 flex items-center justify-between">
                     <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#86868b] opacity-40">
                        Unified Security 2.2
                     </p>
                  </footer>
              </div>
          </div>
      </motion.div>
    </div>
  );
}
