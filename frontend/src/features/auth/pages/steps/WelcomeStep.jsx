import React from 'react';
import { ShieldCheck, HeartPulse, Activity, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WelcomeStep({ user }) {
  const firstName = user?.full_name?.split(' ')[0] || 'there';

  return (
    <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
      <div className="relative">
        <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center relative z-10">
          <ShieldCheck size={48} className="text-[#4285F4]" />
        </div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute -top-2 -right-2 w-28 h-28 bg-blue-100 rounded-full z-0 blur-2xl" 
        />
      </div>

      <div className="space-y-3">
        <h1 className="text-[32px] font-semibold text-[#202124] leading-tight tracking-tight">
          Welcome to Shifaa, <span className="text-[#4285F4]">{firstName}</span>
        </h1>
        <p className="text-[16px] text-[#5F6368] leading-relaxed max-w-[320px] mx-auto">
          We're initializing your clinical environment. Let's set up your health profile in a few quick steps.
        </p>
      </div>

      <div className="grid grid-cols-1 w-full gap-4 pt-4">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8F9FA] border border-[#F1F3F4] text-left">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <HeartPulse size={20} className="text-[#EA4335]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#202124]">Personalized Care</h3>
            <p className="text-[12px] text-[#5F6368]">AI-driven treatment plans tailored for you.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8F9FA] border border-[#F1F3F4] text-left">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <Activity size={20} className="text-[#34A853]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#202124]">Real-time Telemetry</h3>
            <p className="text-[12px] text-[#5F6368]">Live monitoring of your medical records.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8F9FA] border border-[#F1F3F4] text-left">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <Sparkles size={20} className="text-[#FBBC05]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#202124]">Unified Identity</h3>
            <p className="text-[12px] text-[#5F6368]">One health file, accessible globally.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
