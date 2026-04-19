import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '@/features/auth/components/LoginForm';

/**
 * 🔓 LoginPage - Google 'Sign-in' Archetype (M3 Content Node)
 */
export default function LoginPage() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center w-full"
    >
      {/* 🏛️ Google-Style Brand Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center mb-3 h-10">
          <span className="text-2xl font-semibold tracking-tight text-[#202124] flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#4285F4] flex items-center justify-center text-white font-bold text-xl">S</span>
            <span className="text-[#5f6368]">Shifaa HMS</span>
          </span>
        </div>
        
        <h1 className="text-2xl font-normal text-[#202124] tracking-normal text-center mb-1">
          Sign in
        </h1>
        <p className="text-base text-[#202124] font-normal text-center">
          Use your Shifaa Account
        </p>
      </div>

      {/* 📟 Form Port */}
      <div className="w-full">
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 animate-in slide-in-from-top-2">
              <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[10px] text-white">!</div>
              <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 bg-green-50 border border-green-100 rounded-lg flex items-center gap-2 animate-in slide-in-from-top-2">
              <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center text-[10px] text-white font-bold">✓</div>
              <p className="text-sm font-medium text-green-700">{success}</p>
          </div>
        )}

        <LoginForm setError={setError} setSuccess={setSuccess} />
      </div>
    </motion.div>
  );
}
