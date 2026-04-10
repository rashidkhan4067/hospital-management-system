import React from 'react';
import { Search, Filter, Building2, CheckCircle2, UserCheck, Calendar } from 'lucide-react';

/**
 * 🛰️ AppointmentFilters (The Operational Command Console)
 * A Google-standard filtering matrix optimized for clinical triage.
 * Features instant URL synchronization and cross-dimensional partitioning.
 */
export default function AppointmentFilters({ filters, setFilter }) {
  const DEPARTMENTS = ['All Departments', 'Cardiology', 'Pediatrics', 'Radiology', 'Surgery', 'Maternity'];
  const STATUSES = ['All', 'Confirmed', 'Pending', 'Waiting', 'Completed', 'Cancelled'];
  const DOCTORS = ['All Doctors', 'Dr. Ali Khan', 'Dr. Sarah Ahmed', 'Dr. Zainab Bibi', 'Dr. Usman Raza'];
  const RANGES = ['Today', 'Yesterday', 'This Week', 'This Month', 'Last 90 Days'];

  return (
    <div className="flex flex-col gap-6 bg-surface-bright border border-outline/30 rounded-[32px] p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-primary/5">
      
      {/* 🔍 Row 1: High-Priority Discovery */}
      <div className="relative group">
        <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-sub group-focus-within:text-primary transition-colors" />
        <input 
          type="text"
          placeholder="Search patient names, clinical IDs, or referral strings..."
          value={filters.query}
          onChange={(e) => setFilter('q', e.target.value)}
          className="w-full h-14 pl-14 pr-8 bg-surface border-transparent rounded-2xl text-[14px] font-medium transition-all outline-none text-text-main placeholder:text-text-sub focus:ring-1 focus:ring-primary/20"
        />
      </div>

      {/* 🕹️ Row 2: Dimensional Partitioning */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 📅 Range Shard */}
        <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-text-sub uppercase tracking-[0.25em] px-1">Temporal Range</span>
            <div className="relative h-12">
                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sub pointer-events-none" />
                <select 
                    value={filters.range}
                    onChange={(e) => setFilter('range', e.target.value)}
                    className="w-full h-full pl-11 pr-10 bg-surface border border-outline/40 rounded-xl text-xs font-bold text-text-main appearance-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none cursor-pointer"
                >
                    {RANGES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
            </div>
        </div>

        {/* 🏥 Unit Filter */}
        <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-text-sub uppercase tracking-[0.25em] px-1">Clinical Unit</span>
            <div className="relative h-12">
                <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sub pointer-events-none" />
                <select 
                    value={filters.unit}
                    onChange={(e) => setFilter('unit', e.target.value)}
                    className="w-full h-full pl-11 pr-10 bg-surface border border-outline/40 rounded-xl text-xs font-bold text-text-main appearance-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none cursor-pointer"
                >
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>
        </div>

        {/* 👨‍⚕️ Practitioner Shard */}
        <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-text-sub uppercase tracking-[0.25em] px-1">Lead Practitioner</span>
            <div className="relative h-12">
                <UserCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sub pointer-events-none" />
                <select 
                    value={filters.doctor}
                    onChange={(e) => setFilter('doctor', e.target.value)}
                    className="w-full h-full pl-11 pr-10 bg-surface border border-outline/40 rounded-xl text-xs font-bold text-text-main appearance-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none cursor-pointer"
                >
                    {DOCTORS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>
        </div>

        {/* 🚦 Status Partition */}
        <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-text-sub uppercase tracking-[0.25em] px-1">Triage Status</span>
            <div className="relative h-12">
                <CheckCircle2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sub pointer-events-none" />
                <select 
                    value={filters.status}
                    onChange={(e) => setFilter('status', e.target.value)}
                    className="w-full h-full pl-11 pr-10 bg-surface border border-outline/40 rounded-xl text-xs font-bold text-text-main appearance-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none cursor-pointer"
                >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
        </div>

      </div>
    </div>
  );
}
