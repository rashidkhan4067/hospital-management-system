import React from 'react';

/**
 * 🛸 EMRTabs
 * Master Tab Navigator for EMR sections.
 * Tabs: Overview | Appointments | Medical History | Prescriptions | Notes | Documents.
 */
export default function EMRTabs({ sections, activeSection, onSectionChange }) {
  return (
    <div className="flex border-b border-slate-200 dark:border-white/10 w-full mb-8 overflow-x-auto no-scrollbar">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => onSectionChange(s.id)}
          className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
            activeSection === s.id
              ? 'text-accent-primary'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          {s.label}
          {activeSection === s.id && (
            <div className="absolute bottom-0 left-4 right-4 h-1 bg-accent-primary rounded-full shadow-[0_-4px_10px_rgba(45,212,191,0.4)]" />
          )}
        </button>
      ))}
    </div>
  );
}
