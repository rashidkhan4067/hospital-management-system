import React from 'react';
import { Search, Filter, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const PatientSearchBar = ({ searchQuery, setSearchQuery, activeFilter, setActiveFilter, specializations }) => {
  return (
    <div className="flex flex-col gap-6 w-full mb-12">
      {/* 🏔️ Layer 1: Title + Context */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
         <div className="space-y-1">
            <div className="flex items-center gap-3">
               <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">Find Elite Specialists</h1>
               <div className="px-3 py-1 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase italic shadow-sm flex items-center gap-2">
                  <Activity size={12} className="animate-pulse" /> Verified Network
               </div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-0.5 italic">Clinical Node synchronized • <span className="text-accent-primary italic">Pakistan's Top Practitioners</span></p>
         </div>
      </div>

      {/* 🧭 Layer 2: Search + Filter Command Center */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-4 bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl p-4 md:p-5 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2als">
         {/* Search Node */}
         <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by doctor name or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-5 md:py-6 bg-[#fcfdfe] dark:bg-slate-950/40 border-none rounded-[20px] md:rounded-[28px] text-sm font-black text-slate-900 dark:text-white outline-none shadow-inner"
            />
         </div>

         {/* Filter Shard */}
         <div className="flex items-center gap-2 px-4 overflow-x-auto scrollbar-hide py-2 max-w-full">
            <Filter size={14} className="text-accent-primary mr-2 flex-shrink-0" />
            {specializations.map((spec) => (
              <button
                key={spec.value}
                onClick={() => setActiveFilter(spec.value)}
                className={`px-8 py-4 rounded-xl lg:rounded-2xl text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all flex items-center gap-3 ${
                    activeFilter === spec.value 
                    ? 'bg-slate-900 dark:bg-accent-primary text-white shadow-xl shadow-accent-primary/25' 
                    : 'bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-white/5 hover:border-accent-primary/30 transition-all'
                }`}
              >
                {spec.label}
              </button>
            ))}
         </div>
      </div>
    </div>
  );
};

export default PatientSearchBar;
