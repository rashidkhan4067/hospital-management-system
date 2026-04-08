import React from 'react';
import { motion } from 'framer-motion';
import { User2, CalendarCheck } from 'lucide-react';
import { Card } from '@/components/primitives';

/**
 * Row 3 — RecentPatients
 * Last 5 registered patients — name, date, doctor.
 */
const RecentPatients = ({ onNavigate }) => {
  const patients = [
    { name: 'Tariq Mehmood',  date: '2 hours ago',  doctor: 'Dr. Ali Raza',   initials: 'TM' },
    { name: 'Nadia Bashir',   date: '4 hours ago',  doctor: 'Dr. Nida Shah',  initials: 'NB' },
    { name: 'Asif Chaudhry', date: 'Yesterday',     doctor: 'Dr. Usman Mir',  initials: 'AC' },
    { name: 'Hina Jabbar',    date: 'Yesterday',    doctor: 'Dr. Ali Raza',   initials: 'HJ' },
    { name: 'Omer Zaman',     date: '2 days ago',   doctor: 'Dr. Nida Shah',  initials: 'OZ' },
  ];

  return (
    <Card className="rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-white/70 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl h-full flex flex-col shadow-xl">
      {/* Header */}
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <h3 className="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-white leading-none">Recent Patients</h3>
        </div>
        <button onClick={onNavigate} className="text-[9px] font-black uppercase tracking-widest text-accent-primary hover:tracking-widest transition-all bg-transparent border-none">View All →</button>
      </div>

      <div className="flex-1 divide-y divide-slate-100 dark:divide-white/5">
        {patients.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer group"
            onClick={onNavigate}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 border border-accent-primary/20 flex items-center justify-center text-[11px] font-black text-accent-primary shrink-0 group-hover:scale-110 group-hover:border-accent-primary/40 transition-all">
              {p.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black uppercase italic tracking-tight text-slate-900 dark:text-white truncate leading-none">{p.name}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">{p.doctor}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 shrink-0">
              <CalendarCheck size={11} className="text-slate-300" /> {p.date}
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/5">
          <div className="flex items-center justify-between">
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Node: PATIENT-ENTRY-09</span>
              <span className="text-[8px] font-black uppercase tracking-widest text-accent-primary italic">Live Sync Active</span>
          </div>
      </div>
    </Card>
  );
};

export default RecentPatients;
