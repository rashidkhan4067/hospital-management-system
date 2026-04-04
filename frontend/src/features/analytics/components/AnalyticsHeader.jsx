import React from 'react';
import { Calendar, Download, ChevronDown, Filter, Search, Activity } from 'lucide-react';
import { Button } from '@/shared/components/ui';

const AnalyticsHeader = ({ range, onRangeChange, filters, onFilterChange }) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col gap-6 w-full mb-8 mt-4">
      {/* 🛸 Top Tier: Page Anchor & Primary Telemetry */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-none">
              Analytics Intelligence
            </h1>
            <div className="px-3 py-1 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase italic shadow-sm flex items-center gap-2">
              <Activity size={12} className="animate-pulse" /> Clinical Hub
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1 italic">
            {today} • <span className="text-accent-primary italic">Live Telemetry Synchronized</span>
          </p>
        </div>

        {/* 🛠 Tactical Range Matrix */}
        <div className="flex flex-wrap items-center gap-3 bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl p-2 rounded-[1.5rem] border border-slate-200 dark:border-white/10 shadow-2als">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950/60 rounded-xl border border-white/5 p-1">
            {['Today', '7d', '30d'].map((r) => (
              <button
                key={r}
                onClick={() => onRangeChange(r)}
                className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase transition-all duration-300 ${range === r ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20 scale-105' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 mx-1" />
          <Button className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg border-none">
            <Download size={14} strokeWidth={3} /> Export CSV
          </Button>
        </div>
      </div>

      {/* 📡 Secondary Tier: Drill-down Controls */}
      <div className="flex flex-wrap items-center gap-3 bg-white/50 dark:bg-slate-900/20 backdrop-blur-xl p-3 rounded-3xl border border-white/5">
        <div className="relative flex-1 min-w-[240px] group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-accent-primary transition-colors" size={14} />
          <input
            type="text"
            placeholder="Filter Intelligence Matrix..."
            className="w-full pl-11 pr-5 py-3 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 rounded-2xl text-[11px] font-black text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-accent-primary/50 transition-all shadow-inner"
          />
        </div>

        <div className="hidden md:flex items-center gap-2">
          {['Cardiology', 'Neurology', 'Radiology'].map((dept) => (
            <button
              key={dept}
              className="px-5 py-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase text-slate-500 hover:text-accent-primary hover:border-accent-primary/30 transition-all italic"
            >
              {dept}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all shadow-md italic">
          <Filter size={14} /> Advanced Filters
        </button>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
