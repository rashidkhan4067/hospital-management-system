import React from 'react';
import { Calendar, User, Clock } from 'lucide-react';
import { Card } from '@/components/primitives';

const PatientWelcome = ({ user, stats }) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Card className="relative overflow-hidden p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/5 shadow-2als group/cta mb-6">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none group-hover/cta:bg-accent-primary/20 transition-all duration-1000" />
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-accent-primary/20 flex items-center justify-center text-accent-primary shadow-inner border border-accent-primary/30">
                <Calendar size={20} />
             </div>
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent-primary/80 italic">{today}</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-none italic uppercase">
              Welcome Back,<br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 truncate">{user?.displayName || 'Patient'}</span>
            </h2>
            <p className="text-[11px] sm:text-[13px] font-bold text-slate-500 uppercase tracking-widest max-w-xl leading-relaxed">
              Your health journey is synchronized. You have <span className="text-accent-primary italic">{stats.upcomingCount} upcoming visits</span> and <span className="text-white">{stats.totalAppointments} total records</span> in our clinical matrix.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 shrink-0">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center space-y-1">
             <p className="text-2xl font-black text-white">{stats.totalAppointments}</p>
             <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Total Visits</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center space-y-1">
             <p className="text-2xl font-black text-accent-primary">{stats.upcomingCount}</p>
             <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Upcoming</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientWelcome;
