import React from 'react';
import { Mic } from 'lucide-react';

export default function SanaButton({ active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`sana-core-btn relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out group outline-none overflow-hidden ${active 
        ? 'bg-red-600 shadow-2xl shadow-red-600/50 scale-110 active:scale-95' 
        : 'bg-blue-600 shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95'}`}
    >
      <div className={`absolute inset-0 bg-white/20 transition-transform duration-1000 origin-bottom ${active ? 'translate-y-0' : 'translate-y-20'}`} />
      
      {active ? (
        <div className="flex flex-col items-center gap-0.5 animate-pulse relative z-10">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      ) : (
        <Mic 
          size={32} 
          className="text-white relative z-10 transition-transform group-hover:rotate-12"
        />
      )}
      
      <div className={`absolute -inset-2 border-2 rounded-full transition-all duration-700 pointer-events-none ${active 
        ? 'border-red-600 animate-va-ping opacity-30 shadow-2xl h-24 w-24 left-[-8px] top-[-8px]' 
        : 'border-white/10 group-hover:border-white/20'}`} />
    </button>
  );
}
