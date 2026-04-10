import React from 'react';
import { Badge } from '@/components/primitives';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * 🛰️ CalendarView (M3 Custom Grid)
 * High-fidelity clinical schedule grid with Drag-and-Drop rescheduling.
 * Mimics Google Calendar's minimalist density.
 */
export default function CalendarView({ appointments, onReschedule, onSelection }) {
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // 🏥 Generating 7-day window (Simulated current week)
  const currentWeek = [
    '2026-04-06', '2026-04-07', '2026-04-08', '2026-04-09', '2026-04-10', '2026-04-11', '2026-04-12'
  ];

  const handleDragStart = (e, appt) => {
    e.dataTransfer.setData('apptId', appt.id);
  };

  const handleDrop = (e, date) => {
    e.preventDefault();
    const apptId = e.dataTransfer.getData('apptId');
    if (apptId) {
        onReschedule(apptId, date, '09:00 AM'); // Defaulting time for sim
    }
  };

  const allowDrop = (e) => e.preventDefault();

  return (
    <div className="bg-surface-bright border border-outline rounded-[32px] overflow-hidden flex flex-col shadow-sm min-h-[600px]">
      {/* 📅 Grid Header */}
      <div className="grid grid-cols-7 border-b border-outline/30 bg-surface/30">
        {DAYS.map((day, i) => (
          <div key={day} className="py-4 border-r border-outline/20 last:border-r-0 flex flex-col items-center">
            <span className="text-[10px] font-black text-text-sub uppercase tracking-[0.2em]">{day}</span>
            <span className={`text-lg font-bold mt-1 ${currentWeek[i] === '2026-04-09' ? 'w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center' : 'text-text-main'}`}>
              {currentWeek[i].split('-')[2]}
            </span>
          </div>
        ))}
      </div>

      {/* 🧬 Grid Body */}
      <div className="grid grid-cols-7 flex-1">
        {currentWeek.map((date) => (
          <div 
            key={date} 
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, date)}
            className="border-r border-outline/10 last:border-r-0 min-h-[400px] p-2 flex flex-col gap-2 transition-colors hover:bg-surface/10"
          >
            {appointments
              .filter(a => a.date === date)
              .map(appt => (
                <div 
                  key={appt.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, appt)}
                  onClick={() => onSelection(appt)}
                  className="p-3 bg-primary/10 border border-primary/20 rounded-xl cursor-grab active:cursor-grabbing hover:bg-primary/15 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={10} className="text-primary" />
                    <span className="text-[9px] font-black text-primary">{appt.time}</span>
                  </div>
                  <p className="text-[11px] font-bold text-text-main truncate leading-tight">{appt.patient}</p>
                  <p className="text-[9px] font-medium text-text-sub truncate">{appt.doctor}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
