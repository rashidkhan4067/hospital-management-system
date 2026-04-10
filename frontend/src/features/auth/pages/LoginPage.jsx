import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '@/features/auth/components/LoginForm';

/**
 * 🔓 LoginPage - Google 'Sign-in' Archetype (M3 Content Node)
 */
export default function LoginPage() {
  const [error, setError] = useState(null);

  const brandColors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC05",
    green: "#34A853"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center w-full"
    >
      {/* 🏛️ Google-Style Brand Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center mb-4 h-10">
          <span className="text-3xl font-medium tracking-tight text-[#202124]">
            <span style={{ color: brandColors.blue }}>S</span>
            <span style={{ color: brandColors.red }}>h</span>
            <span style={{ color: brandColors.yellow }}>i</span>
            <span style={{ color: brandColors.blue }}>f</span>
            <span style={{ color: brandColors.green }}>a</span>
            <span style={{ color: brandColors.red }}>a</span>
          </span>
        </div>
        
        <h1 className="text-2xl font-normal text-[#202124] tracking-normal text-center mb-2">
          Sign in
        </h1>
        <p className="text-base text-[#202124] font-normal text-center mb-10">
          Use your Shifaa Account
        </p>


      </div>

      {/* 📟 Form Port */}
      <div className="w-full">
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[10px] text-white">!</div>
              <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}

        <LoginForm setError={setError} />
      </div>
    </motion.div>
  );
}
