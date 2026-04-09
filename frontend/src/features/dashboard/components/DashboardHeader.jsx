import React from 'react';
import { useAuth } from '@/core/auth/AuthContext';
import { Button } from '@/components/primitives';
import { Calendar, UserPlus, UserCheck } from 'lucide-react';

export default function DashboardHeader({ onNewAppointment, onAddPatient, onAddDoctor }) {
  const { user } = useAuth();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* ✋ Personalized Greeting & System Pulse */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#202124] animate-in fade-in slide-in-from-left-4 duration-500">
          {getGreeting()}, <br className="md:hidden" />
          <span className="text-[#1a73e8]">{user?.first_name || user?.name || 'Director'}</span>
        </h1>
        <div className="flex flex-col gap-2 mt-1">
          <p className="text-[10px] font-bold text-[#5F6368] tracking-[0.15em] uppercase">
            {formattedDate}
          </p>
          <div className="text-[13px] md:text-sm font-medium text-[#3c4043] flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <span>System Nominal</span>
            </div>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="text-[#5F6368]">4 patients awaiting triage in Emergency</span>
          </div>
        </div>
      </div>

      {/* ⚡ Quick Action Rail (Button Primitive) */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible">
        <Button 
          variant="filled"
          icon={Calendar}
          onClick={onNewAppointment}
          className="shadow-sm shrink-0"
        >
          New Appointment
        </Button>

        <Button 
          variant="outlined"
          icon={UserPlus}
          onClick={onAddPatient}
          className="shrink-0"
        >
          Add Patient
        </Button>

        <Button 
          variant="outlined"
          icon={UserCheck}
          onClick={onAddDoctor}
          className="shrink-0"
        >
          Add Doctor
        </Button>
      </div>
    </div>
  );
}

