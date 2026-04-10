import React, { useEffect, useRef } from 'react';
import { Search, User, Filter, MoreVertical, HeartPulse } from 'lucide-react';
import { usePatientState } from '../context/PatientContext';

/**
 * 📋 PatientMasterList (Google Professional Standard)
 * High-density vertical registry with integrated clinical search.
 * Features Cmd+K focal synchronization for rapid administrative entry.
 */
export default function PatientMasterList({ patients, isLoading, query, setQuery }) {
  const { activePatientId, setActivePatientId } = usePatientState();
  const searchInputRef = useRef(null);

  // 🏥 Keyboard Shortcut Logic (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-full bg-surface-bright border-r border-outline/30">
      {/* 🔍 Clinical Command Bar */}
      <div className="p-4 border-b border-outline/30 bg-surface/30">
        <div className="relative group">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-sub group-focus-within:text-primary transition-colors" />
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Search Registry (Cmd+K)" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-surface border border-outline rounded-xl text-xs font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
          />
        </div>
      </div>

      {/* 📈 Scalable Registry Pool */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="p-8 flex flex-col items-center justify-center gap-4 opacity-50">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] font-black text-text-sub uppercase tracking-widest">Hydrating Registry...</span>
          </div>
        ) : (
          <div className="flex flex-col">
            {patients.map(patient => (
              <button 
                key={patient.id}
                onClick={() => setActivePatientId(patient.id)}
                className={`p-5 flex items-start gap-4 transition-all border-b border-outline/10 text-left group ${activePatientId === patient.id ? 'bg-primary/5 ring-1 ring-inset ring-primary/20' : 'hover:bg-surface'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-transform group-hover:scale-105 ${activePatientId === patient.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface border border-outline text-text-sub'}`}>
                  {patient.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[13px] font-black truncate transition-colors ${activePatientId === patient.id ? 'text-primary' : 'text-text-main group-hover:text-primary'}`}>{patient.name}</span>
                    <span className="text-[9px] font-bold text-text-sub uppercase tracking-tighter opacity-50">{patient.id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-text-sub">
                    <span className={patient.status === 'In-Patient' ? 'text-primary' : ''}>{patient.status}</span>
                    <span className="opacity-30">|</span>
                    <span>BP {patient.vitals.bp}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
