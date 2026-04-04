import React from 'react';
import { motion } from 'framer-motion';

const VoiceWaves = ({ isListening, isSpeaking }) => {
  const bars = Array.from({ length: 40 });

  return (
    <div className="flex items-center justify-center gap-1.5 h-32 w-full max-w-lg mx-auto">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          animate={{
            height: isListening || isSpeaking 
              ? [10, Math.random() * 80 + 20, 10] 
              : 8,
            opacity: isListening || isSpeaking ? 1 : 0.2
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`w-1.5 rounded-full ${
            isListening 
            ? 'bg-accent-primary shadow-[0_0_15px_rgba(var(--accent-primary-rgb),0.5)]' 
            : isSpeaking 
              ? 'bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]'
              : 'bg-slate-500'
          }`}
        />
      ))}
    </div>
  );
};

export default VoiceWaves;
