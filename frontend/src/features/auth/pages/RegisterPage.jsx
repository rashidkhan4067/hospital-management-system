import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/core/auth/AuthContext';
import RegisterForm from '@/features/auth/components/RegisterForm';
import { Card } from '@/components/primitives';

/**
 * 📝 RegisterPage - Google Enterprise 'Create Account' Archetype
 * Implements the Material 3 centralized authentication terminal.
 */
export default function RegisterPage() {
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen bg-white md:bg-[#F8F9FA] flex flex-col items-center justify-center p-4 md:p-6 italic">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[650px]"
      >
        <Card variant="outlined" className="p-8 md:p-12 flex flex-col items-center bg-white shadow-none md:shadow-sm">
          {/* 🏛️ Brand Payload */}
          <div className="flex flex-col items-center gap-4 mb-8 w-full">
             <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1A73E8] to-[#64B5F6] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <Activity size={24} />
                    </div>
                    <span className="text-2xl font-black text-slate-900 tracking-tighter italic">Al Shifa</span>
                </div>
                <div className="text-right">
                    <h1 className="text-2xl font-semibold text-[#202124] tracking-tight leading-tight">Create your account</h1>
                    <p className="text-sm text-[#3C4043] font-medium">to continue to Health Intelligence Hub</p>
                </div>
             </div>
          </div>

          {/* 📟 Intelligence Enrollment Port (Form) */}
          <div className="w-full">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                  <ShieldCheck size={16} className="text-red-500" />
                  <p className="text-[11px] font-bold text-red-600 uppercase tracking-widest leading-none">{error}</p>
              </div>
            )}

            <RegisterForm setError={setError} />
          </div>

          {/* 🧾 Account Registry Redirection */}
          <div className="w-full flex items-center justify-between mt-10 p-0">
            <Link 
              to="/login" 
              className="text-sm font-bold text-[#1a73e8] hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
            >
              Sign in instead
            </Link>
          </div>
        </Card>

        {/* 🗺️ Global Footer Cluster (Enterprise Standard) */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 px-2 not-italic">
            <div className="flex items-center gap-6">
                <span className="text-[11px] font-bold text-[#5F6368] cursor-pointer hover:text-slate-900">English (United Kingdom)</span>
            </div>
            <div className="flex items-center gap-6">
                <Link className="text-[11px] font-bold text-[#5F6368] hover:text-slate-900 transition-colors">Help</Link>
                <Link className="text-[11px] font-bold text-[#5F6368] hover:text-slate-900 transition-colors">Privacy</Link>
                <Link className="text-[11px] font-bold text-[#5F6368] hover:text-slate-900 transition-colors">Terms</Link>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
