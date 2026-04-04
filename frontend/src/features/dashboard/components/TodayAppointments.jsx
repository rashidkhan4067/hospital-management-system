import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import { Card, Badge } from '@/shared/components/ui';

/**
 * Row 3 Left — TodayAppointments
 * List with patient name, doctor, time, status badge, cancel/confirm actions.
 */
const TodayAppointments = ({ appointments = [], onViewPatient, onViewAll }) => {
  const statusConfig = {
    confirmed:  { label: 'Confirmed',  cls: 'bg-emerald-500/10 text-emerald-500' },
    waiting:    { label: 'Waiting',    cls: 'bg-amber-500/10  text-amber-500'  },
    cancelled:  { label: 'Cancelled',  cls: 'bg-red-500/10    text-red-400'    },
    'in-session':{ label: 'In Session', cls: 'bg-sky-500/10   text-sky-500'    },
    scheduled:  { label: 'Scheduled',  cls: 'bg-accent-primary/10 text-accent-primary' },
  };

  // Show only today's 6 or fallback sample rows
  const rows = appointments.length > 0
    ? appointments.slice(0, 6)
    : [
        { name: 'Ahmed Siddiqui',  type: 'Cardiology',    time: '09:00', status: 'confirmed',   doctor: 'Dr. Ali Raza' },
        { name: 'Sara Khan',       type: 'Dermatology',   time: '09:30', status: 'waiting',     doctor: 'Dr. Nida Shah' },
        { name: 'Bilal Akhtar',    type: 'Orthopedics',   time: '10:00', status: 'in-session',  doctor: 'Dr. Usman Mir' },
        { name: 'Fatima Malik',    type: 'Neurology',     time: '10:30', status: 'scheduled',   doctor: 'Dr. Ali Raza' },
        { name: 'Usman Butt',      type: 'Pediatrics',    time: '11:00', status: 'cancelled',   doctor: 'Dr. Nida Shah' },
      ];

  return (
    <Card className="rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-white/70 dark:bg-slate-900/10 border border-slate-100 dark:border-white/5 backdrop-blur-xl shadow-xl flex flex-col">
      {/* Header */}
      <div className="px-5 sm:px-7 pt-5 sm:pt-7 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
          <h3 className="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-white leading-none">Today's Appointments</h3>
        </div>
        <button onClick={onViewAll} className="text-[9px] font-black uppercase tracking-widest text-accent-primary hover:underline">View All →</button>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-100 dark:divide-white/5">
        {rows.map((row, i) => {
          const s = statusConfig[row.status?.toLowerCase()] || statusConfig.scheduled;
          return (
            <div
              key={i}
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-7 py-3.5 sm:py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group cursor-pointer"
              onClick={() => onViewPatient?.(row.id || i)}
            >
              {/* Avatar */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary text-[10px] sm:text-[11px] font-black shrink-0 group-hover:scale-105 transition-transform">
                {(row.name || row.patient_name || 'P').charAt(0)}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-[11px] font-black uppercase italic tracking-tight text-slate-900 dark:text-white truncate leading-none">{row.name || row.patient_name}</p>
                <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider truncate mt-0.5 sm:mt-1">{row.doctor || row.doctor_name} · {row.type || row.specialization}</p>
              </div>
              {/* Time */}
              <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-black text-accent-primary tabular-nums shrink-0">
                <Clock size={10} className="sm:w-3 sm:h-3" /> {row.time || row.scheduled_time?.slice(11, 16) || '--:--'}
              </div>
              {/* Status */}
              <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[7px] sm:text-[8px] font-black uppercase tracking-widest ${s.cls} shrink-0`}>{s.label}</span>
              {/* Action */}
              <button className="hidden sm:flex w-7 h-7 rounded-lg items-center justify-center text-slate-300 hover:text-accent-primary hover:bg-accent-primary/10 transition-all ml-1 opacity-0 group-hover:opacity-100 border-none bg-transparent">
                <MoreHorizontal size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TodayAppointments;
