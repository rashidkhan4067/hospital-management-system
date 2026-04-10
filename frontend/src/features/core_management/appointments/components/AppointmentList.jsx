import React from 'react';
import { Skeleton } from '@/components/primitives';
import AppointmentCard from './AppointmentCard';
import { CalendarX } from 'lucide-react';

/**
 * 🛰️ AppointmentList
 * Responsive grid for clinical records.
 * Handles loading sequences and empty telemetry states.
 */
export default function AppointmentList({ appointments, isLoading, onCancel, onEdit }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-[240px] bg-surface-bright border border-outline rounded-[24px] p-6 animate-pulse">
            <div className="flex justify-between mb-8">
                <div className="space-y-2">
                    <div className="w-12 h-3 bg-surface rounded" />
                    <div className="w-24 h-4 bg-surface rounded" />
                </div>
                <div className="w-16 h-6 bg-surface rounded-full" />
            </div>
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-surface rounded-full" />
                <div className="space-y-2">
                    <div className="w-32 h-4 bg-surface rounded" />
                    <div className="w-20 h-3 bg-surface rounded" />
                </div>
            </div>
            <div className="w-full h-10 bg-surface rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 border border-outline border-dashed rounded-[32px] bg-surface/30 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-surface-bright border border-outline flex items-center justify-center text-text-sub">
          <CalendarX size={32} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-text-main">No Clinical Slots Found</h3>
          <p className="text-[11px] font-medium text-text-sub mt-1">Adjust your filters to discover other scheduled telemetry.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {appointments.map((appt) => (
        <AppointmentCard 
          key={appt.id} 
          appointment={appt} 
          onCancel={onCancel}
          onShowDetails={() => onEdit(appt)}
        />
      ))}
    </div>
  );
}
