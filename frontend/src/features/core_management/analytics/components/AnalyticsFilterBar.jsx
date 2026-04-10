import React from 'react';
import { Calendar, Building2, User, ChevronDown } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

/**
 * 🛰️ AnalyticsFilterBar (M3 Standard)
 * Consolidated horizontal surface for clinical triage.
 * Follows the strict Google 8px rule and unified vertical baseline.
 */
export default function AnalyticsFilterBar() {
  const { filters, setFilter } = useAnalytics();

  const FILTER_REGISTRY = [
    { 
      id: 'period', 
      label: 'Period', 
      icon: Calendar, 
      current: filters.period || 'Today',
      options: ['Today', '7 Days', '30 Days', '90 Days'] 
    },
    { 
      id: 'unit', 
      label: 'Clinical Unit', 
      icon: Building2, 
      current: filters.unit || 'All Departments',
      options: ['All Departments', 'Maternity', 'Surgery', 'Pediatrics', 'Neurology', 'Cardiology'] 
    },
    { 
      id: 'practitioner', 
      label: 'Practitioner', 
      icon: User, 
      current: filters.practitioner || 'All Doctors',
      options: ['All Doctors', 'Dr. Sarah Ahmed', 'Dr. John Carter', 'Dr. Elena Vance'] 
    }
  ];

  return (
    <div className="bg-surface-bright border border-outline rounded-2xl flex flex-col md:flex-row items-stretch md:items-center p-4 md:p-3 gap-4 md:gap-6 shadow-sm shadow-slate-900/5 transition-colors duration-300">
      {FILTER_REGISTRY.map((filter) => (
        <div key={filter.id} className="flex flex-col gap-1.5 flex-1 min-w-0 md:min-w-[140px]">
          <span className="text-[10px] font-bold text-text-sub uppercase tracking-widest leading-none transition-colors">
            {filter.label}
          </span>
          <div className="relative group">
            <select
              value={filter.current}
              onChange={(e) => setFilter(filter.id, e.target.value)}
              className="w-full h-10 pl-10 pr-10 bg-surface border border-outline rounded-lg text-[13px] font-medium text-text-main appearance-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer outline-none"
            >
              {filter.options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-sub group-hover:text-primary transition-colors pointer-events-none">
              <filter.icon size={14} />
            </div>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-sub opacity-50 pointer-events-none transition-colors">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
