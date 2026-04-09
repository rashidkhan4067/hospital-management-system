import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🛰️ M3 Loading Primitive (Google Standard)
 * Features an indeterminate circular progress indicator using Google's signature Blue.
 */
export default function Loading({ size = 'md', message = "Syncing clinical data...", fullPage = false }) {
  
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-[4px]"
  };

  const containerStyle = fullPage 
    ? "fixed inset-0 z-[3000] bg-white/80 backdrop-blur-[4px] flex flex-col items-center justify-center p-6" 
    : "flex flex-col items-center justify-center p-8 w-full h-full min-h-[200px]";

  return (
    <div className={containerStyle}>
      <div className="relative">
        {/* Track */}
        <div className={`${sizes[size]} rounded-full border-slate-100 absolute inset-0`} />
        
        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`${sizes[size]} rounded-full border-[#1a73e8] border-t-transparent`}
        />
      </div>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-sm font-medium text-[#3c4043] tracking-wide animate-pulse"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
