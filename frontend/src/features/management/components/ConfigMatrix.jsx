import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ConfigMatrix({ label, options, value, onChange }) {
  return (
    <div className="space-y-3">
       <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">{label}</label>
       <div className="grid grid-cols-1 gap-2">
          {options.map(opt => (
            <button
               key={opt.id}
               type="button"
               onClick={() => onChange(opt.id)}
               className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all border-none ${
                 value === opt.id 
                 ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20 scale-[1.02]' 
                 : 'bg-slate-50 dark:bg-black/10 text-slate-400 hover:text-slate-600 dark:hover:text-white'
               }`}
            >
               <div className="flex items-center gap-3">
                  <div className={value === opt.id ? 'text-white' : 'text-slate-300'}>{opt.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{opt.label}</span>
               </div>
               {value === opt.id && <CheckCircle2 size={14} />}
            </button>
          ))}
       </div>
    </div>
  );
}
