import React from 'react';
import { Search } from 'lucide-react';

export default function FilterBar({ placeholder = "Filter results...", value, onChange }) {
  return (
    <div className="relative w-full md:w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1a73e8]/20 focus:border-[#1a73e8] transition-all"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
