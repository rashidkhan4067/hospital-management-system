import React from 'react';
import { Card, Badge, Button } from '@/components/primitives';
import { Calendar, Clock, User, Stethoscope, MoreVertical, XCircle, CheckCircle } from 'lucide-react';

/**
 * 📅 AppointmentCard (M3 Shard)
 * High-fidelity clinical record preview.
 */
export default function AppointmentCard({ appointment, onCancel, onShowDetails }) {
  const { id, patient, doctor, time, date, department, status, type } = appointment;

  const getStatusVariant = (s) => {
    if (s === 'Confirmed') return 'tonal';
    if (s === 'Completed') return 'tonal';
    if (s === 'Pending') return 'outlined';
    if (s === 'Waiting') return 'tonal';
    return 'tonal';
  };

  const statusColors = {
    Confirmed: 'bg-primary/10 text-primary border-primary/20',
    Completed: 'bg-success/10 text-success border-success/20',
    Waiting: 'bg-warning/10 text-warning border-warning/20',
    'In-Transit': 'bg-primary/10 text-primary border-primary/20 animate-pulse',
    Pending: 'bg-surface text-text-sub border-outline'
  };

  return (
    <Card className="p-6 flex flex-col gap-4 hover:border-primary/40 transition-all duration-300 group bg-surface-bright border border-outline rounded-[24px]">
      {/* 🔝 Header: ID & Status */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-text-sub uppercase tracking-widest">{id}</span>
          <span className="text-[11px] font-bold text-primary transition-colors">{type}</span>
        </div>
        <Badge variant={getStatusVariant(status)} className={statusColors[status]}>
          {status}
        </Badge>
      </div>

      <div className="h-px bg-outline/20 w-full" />

      {/* 📟 Patient Details */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-surface border border-outline flex items-center justify-center text-text-sub transition-colors group-hover:bg-primary/5 group-hover:text-primary">
          <User size={20} />
        </div>
        <div className="flex flex-col">
          <h4 className="text-sm font-bold text-text-main transition-colors">{patient}</h4>
          <div className="flex items-center gap-2 text-[11px] text-text-sub">
            <Stethoscope size={10} />
            <span className="font-medium">{doctor}</span>
          </div>
        </div>
      </div>

      {/* 🕒 Schedule Node */}
      <div className="bg-surface/50 rounded-2xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Calendar size={14} className="text-text-sub" />
            <span className="text-xs font-bold text-text-main">{date}</span>
        </div>
        <div className="flex items-center gap-3 border-l border-outline/30 pl-3">
            <Clock size={14} className="text-text-sub" />
            <span className="text-xs font-bold text-text-main">{time}</span>
        </div>
      </div>

      {/* 🔘 Dynamic Actions */}
      <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
         <Button 
            variant="tonal" 
            size="sm" 
            className="flex-1 rounded-xl"
            onClick={onShowDetails}
          >
            Edit Slot
          </Button>
         <button 
           onClick={() => onCancel(id)}
           className="p-2.5 rounded-xl border border-outline text-text-sub hover:bg-error/5 hover:text-error hover:border-error/20 transition-all active:scale-95"
         >
           <XCircle size={18} />
         </button>
      </div>
    </Card>
  );
}
