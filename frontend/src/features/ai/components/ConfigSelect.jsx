import React from 'react';

export default function ConfigSelect({ label, icon, options, value, onChange }) {
  return (
    <div className="space-y-2">
       <label className="text-[9px] font-black uppercase tracking-widest ml-1 text-slate-400">{label}</label>
       <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors">
            {icon}
          </div>
          <select 
            className="w-full bg-slate-50 dark:bg-black/10 border-none rounded-2xl py-4 pl-12 pr-6 text-[12px] font-bold focus:ring-4 focus:ring-accent-primary/10 transition-all dark:text-white"
            value={value}
            onChange={e => onChange(e.target.value)}
          >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
       </div>
    </div>
  );
}
