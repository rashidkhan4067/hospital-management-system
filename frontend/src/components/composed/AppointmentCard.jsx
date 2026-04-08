import React from 'react';
import { Calendar, Clock, User, XCircle } from 'lucide-react';
import { Card, Badge, Button } from '@/components/primitives';

export default function AppointmentCard({ appointment, onCancel, index }) {
  const statusClasses = {
    upcoming: 'bg-blue-500/10 text-blue-400',
    completed: 'bg-green-500/10 text-green-400',
    cancelled: 'bg-red-500/10 text-red-400'
  };

  return (
    <Card className={`appointment-item delay-${(index % 5)*100} flex flex-col md:flex-row items-center justify-between p-6 glass-panel border-white/5 mb-4`}>
      <div className="flex items-center gap-6 w-full md:w-auto">
        <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400">
          <User size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Dr. {appointment.doctor_name}</h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{appointment.specialization}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mt-6 md:mt-0 w-full md:w-auto">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-extrabold text-gray-500 tracking-wider">Date & Time</span>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <span className="flex items-center gap-1"><Calendar size={14} className="text-blue-400"/> {appointment.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} className="text-purple-400"/> {appointment.time}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <Badge className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusClasses[appointment.status?.toLowerCase()] || ''}`}>
            {appointment.status}
          </Badge>
          
          {appointment.status === 'upcoming' && (
            <Button 
              variant="social" 
              onClick={() => onCancel(appointment.id)} 
              icon={XCircle}
              className="p-2 min-w-0 bg-red-500/5 hover:bg-red-500/10 text-red-400 border-red-500/20"
            />
          )}
        </div>
      </div>
    </Card>
  );
}
