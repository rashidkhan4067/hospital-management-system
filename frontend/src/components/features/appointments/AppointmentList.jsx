import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card } from '../../ui';

export default function AppointmentList({ appointments, loading }) {
  if (loading) {
    return (
      <div className="loading-state py-12 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
        <p>Fetching your schedule...</p>
      </div>
    );
  }

  if (!Array.isArray(appointments) || appointments.length === 0) {
    return (
      <div className="empty-state py-12 text-center text-gray-400">
        <Calendar size={48} className="mx-auto mb-4 opacity-20" />
        <h3 className="text-xl font-bold text-white mb-2">No Appointments</h3>
        <p>Your medical schedule is currently clear.</p>
      </div>
    );
  }

  return (
    <Card className="p-0 overflow-hidden bg-white border border-bg-offset shadow-soft rounded-3xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-bg-offset/50 text-[10px] uppercase tracking-[0.2em] font-black text-text-secondary border-b border-bg-offset">
            <th className="px-8 py-5">Scheduled Date</th>
            <th className="px-8 py-5">Time Slot</th>
            <th className="px-8 py-5">Status</th>
            <th className="px-8 py-5 text-right">Method</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-bg-offset/40">
          {appointments.map((apt) => (
            <tr key={apt.id} className="hover:bg-bg-offset/30 transition-all group cursor-pointer">
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Calendar size={16} />
                  </div>
                  <span className="font-bold text-sm text-text-primary">{apt.appointment_date}</span>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Clock size={16} />
                  </div>
                  <span className="font-bold text-sm text-text-primary tracking-tight">
                    {apt.start_time.substring(0, 5)} - {apt.end_time.substring(0, 5)}
                  </span>
                </div>
              </td>
              <td className="px-8 py-6">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest status-${apt.status} shadow-sm`}>
                  {apt.status}
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-3 py-1 bg-bg-offset rounded-lg group-hover:bg-white transition-colors">
                  {apt.booked_via_voice ? '🎙️ Sana AI' : '💻 Web Portal'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
