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

  if (!appointments || appointments.length === 0) {
    return (
      <div className="empty-state py-12 text-center text-gray-400">
        <Calendar size={48} className="mx-auto mb-4 opacity-20" />
        <h3 className="text-xl font-bold text-white mb-2">No Appointments</h3>
        <p>Your medical schedule is currently clear.</p>
      </div>
    );
  }

  return (
    <Card className="p-0 overflow-hidden glass-panel border-white/5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 text-[10px] uppercase tracking-widest font-bold text-gray-400">
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Time</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Channel</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {appointments.map((apt) => (
            <tr key={apt.id} className="hover:bg-white/5 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                    <Calendar size={14} />
                  </div>
                  <span className="font-medium text-sm">{apt.appointment_date}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                    <Clock size={14} />
                  </div>
                  <span className="font-medium text-sm">
                    {apt.start_time.substring(0, 5)} - {apt.end_time.substring(0, 5)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider status-${apt.status}`}>
                  {apt.status}
                </span>
              </td>
              <td className="px-6 py-4 text-xs font-semibold text-gray-400">
                {apt.booked_via_voice ? '🎙️ Sana AI' : '💻 Web Portal'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
