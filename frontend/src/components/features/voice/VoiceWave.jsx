import React from 'react';

export default function VoiceWave({ active = false }) {
  const bars = Array.from({ length: 12 }, (_, i) => i);
  
  return (
    <div className={`voice-wave-container flex items-center justify-center gap-1.5 h-12 transition-all duration-700 ${active ? 'opacity-100 scale-110' : 'opacity-20 scale-90 blur-[1px]'}`}>
      {bars.map((i) => (
        <div 
          key={i}
          className={`wave-bar w-1.5 bg-blue-500 rounded-full transition-all duration-300 ${active ? 'animate-va-wave' : 'h-1.5 shadow-none'}`}
          style={{ 
            animationDelay: `${i * 0.1}s`,
            animationDuration: active ? `${0.5 + Math.random()}s` : '0s',
            height: active ? `${30 + Math.random() * 70}%` : '6px',
            boxShadow: active ? '0 0 15px rgba(59, 130, 246, 0.5)' : 'none'
          }}
        />
      ))}
    </div>
  );
}
