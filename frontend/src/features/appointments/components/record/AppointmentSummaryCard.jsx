import React from 'react';
import { Card, Badge, Button } from '@/shared/components/ui';
import { 
    Calendar, Clock, User, Stethoscope, 
    Video, MapPin, Hash, CheckCircle2 
} from 'lucide-react';

/**
 * 🛰 Appointment Summary Shard
 * Professional detail overview of an appointment node.
 * Specialized for the record page sidebar check mapping mapping.
 */
export default function AppointmentSummaryCard({ appointment = {} }) {
    return (
        <Card className="p-8 rounded-[2.5rem] bg-white dark:bg-white/[0.03] space-y-8 border border-slate-200 dark:border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary shadow-inner transition-transform group-hover:scale-110">
                    <Calendar size={28} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-[14px] font-black text-slate-800 dark:text-white uppercase tracking-tight italic font-display leading-none">Schedule Node</h3>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 opacity-60 italic">Confirmed Synchronous Registry</p>
                </div>
            </div>

            <div className="space-y-5 pt-4 border-t border-slate-100 dark:border-white/5 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <Hash size={14} className="text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Registry Ref</span>
                    </div>
                    <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tabular-nums">#{appointment.id?.toString().padStart(6, '0')}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Duration Shard</span>
                    </div>
                    <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase italic">30 Minutes</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Node Mode</span>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase italic border-none px-3">In-Clinic Hub</Badge>
                </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex flex-col gap-5 relative z-10">
                <div className="flex flex-col gap-1.5">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Clinical Node Lead</span>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-primary/20 text-[10px] font-black flex items-center justify-center text-accent-primary italic">DR</div>
                        <span className="text-[12px] font-black text-slate-800 dark:text-white uppercase italic">{appointment.doctor_name || 'Assigned Lead'}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Relational Identity</span>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-[10px] font-black flex items-center justify-center text-indigo-400 italic">PA</div>
                        <span className="text-[12px] font-black text-slate-800 dark:text-white uppercase italic">{appointment.patient_name || 'Patient Registry'}</span>
                    </div>
                </div>
            </div>

            <Button className="w-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/30 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border-none hover:bg-slate-200 dark:hover:bg-white/10 transition-all font-display italic">
                <Video size={14} className="mr-2" /> Request Digital Shard
            </Button>
        </Card>
    );
}
