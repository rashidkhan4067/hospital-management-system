import React from 'react';
import { 
    Calendar, 
    User, 
    Stethoscope, 
    Clock, 
    CreditCard, 
    Activity, 
    CheckCircle2, 
    XCircle,
    History,
    FileText,
    ChevronRight
} from 'lucide-react';
import { Button, Card, Badge, Avatar } from '@/components/primitives';

/**
 * 🏥 AppointmentDetailView (UI/UX Premium Spec)
 * A high-density clinical dispatch shard featuring temporal tracking and financial oversight.
 */
export default function AppointmentDetailView({ appointment, onStatusUpdate, onClose }) {
    if (!appointment) return null;

    const timeline = [
        { label: 'Booking Initiated', time: '10:15 AM', status: 'completed', desc: 'Secure slot allocated via Admin portal' },
        { label: 'Clinician Confirmed', time: '11:30 AM', status: 'completed', desc: 'Dr. Ali Khan approved the session' },
        { label: 'Patient Triage', time: '14:00 PM', status: 'active', desc: 'Awaiting arrival at Unit Reception' },
        { label: 'Clinical Session', time: '--:--', status: 'pending', desc: 'Execution planned for the allocated slot' },
    ];

    return (
        <div className="flex flex-col gap-10 py-6">
            
            {/* 🛡️ Primary Identity Shard */}
            <div className="flex items-center gap-5 p-2">
                <Avatar size="lg" name={appointment.patient} className="ring-4 ring-primary/10" />
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-black text-text-main tracking-tighter">{appointment.patient}</h2>
                    <div className="flex items-center gap-2">
                        <Badge variant="tonal" className="text-[9px] font-black uppercase tracking-widest px-3">Case ID: {appointment.id?.slice(0, 8)}</Badge>
                        <span className="text-[10px] font-bold text-text-sub flex items-center gap-1">
                            <Activity size={12} className="text-primary" /> Active Registry
                        </span>
                    </div>
                </div>
            </div>

            {/* 📊 Clinical Duo Matrix */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="p-5 bg-surface-bright border-outline/30 flex flex-col gap-3 rounded-[24px]">
                    <span className="text-[9px] font-black text-text-sub uppercase tracking-widest opacity-40">Assigned Clinician</span>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Stethoscope size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black text-text-main tracking-tight">{appointment.doctor}</span>
                            <span className="text-[10px] font-bold text-text-sub">{appointment.department}</span>
                        </div>
                    </div>
                </Card>
                <Card className="p-5 bg-surface-bright border-outline/30 flex flex-col gap-3 rounded-[24px]">
                    <span className="text-[9px] font-black text-text-sub uppercase tracking-widest opacity-40">Financial Shard</span>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
                            <CreditCard size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-sm font-black tracking-tight ${appointment.payment_status === 'fully_paid' ? 'text-success' : 'text-error'}`}>
                                {appointment.payment_status === 'fully_paid' ? 'Settled' : 'Pending Fee'}
                            </span>
                            <span className="text-[10px] font-bold text-text-sub">PKR 2,500.00</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* ⏳ Clinical Timeline (The Event Shard) */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <History size={16} className="text-primary" />
                    <span className="text-[11px] font-black text-text-sub uppercase tracking-[0.2em]">Operational Timeline</span>
                </div>
                <div className="relative pl-6 space-y-8">
                    <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-outline/20" />
                    {timeline.map((item, i) => (
                        <div key={i} className="relative group">
                            <div className={`absolute -left-[27px] top-1.5 w-2 h-2 rounded-full ring-4 ${
                                item.status === 'completed' ? 'bg-success ring-success/10' : 
                                item.status === 'active' ? 'bg-primary ring-primary/15 animate-ping' : 
                                'bg-outline/40 ring-transparent'
                            }`} />
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs font-black tracking-tight ${item.status === 'active' ? 'text-primary' : 'text-text-main opacity-80'}`}>{item.label}</span>
                                    <span className="text-[10px] font-bold text-text-sub opacity-40">{item.time}</span>
                                </div>
                                <p className="text-[11px] font-medium text-text-sub/60 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 📑 Clinical Notes */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <FileText size={16} className="text-text-sub" />
                    <span className="text-[11px] font-black text-text-sub uppercase tracking-widest">Initial Complaint</span>
                </div>
                <p className="p-5 bg-surface border border-outline/20 rounded-2xl text-[13px] font-medium text-text-main leading-relaxed italic">
                    "Patient reports persistent chest discomfort over the last 48 hours. No prior history of similar episodes in the current clinical quarter."
                </p>
            </div>

            {/* 🕹️ Operational Controls */}
            <div className="flex flex-col gap-3 pt-12 mt-auto border-t border-outline/10">
                <div className="grid grid-cols-2 gap-3">
                    <Button 
                        variant="tonal" 
                        onClick={() => onStatusUpdate('confirmed')}
                        className="h-14 rounded-2xl bg-success/10 text-success hover:bg-success hover:text-white transition-all font-black uppercase text-[10px] tracking-widest gap-2"
                    >
                        <CheckCircle2 size={16} /> Confirm
                    </Button>
                    <Button 
                        variant="tonal" 
                        onClick={() => onStatusUpdate('cancelled')}
                        className="h-14 rounded-2xl bg-error/10 text-error hover:bg-error hover:text-white transition-all font-black uppercase text-[10px] tracking-widest gap-2"
                    >
                        <XCircle size={16} /> Void Slot
                    </Button>
                </div>
                <Button 
                    variant="filled" 
                    className="h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest bg-primary flex items-center justify-between px-8"
                >
                    <span>Initiate Session</span>
                    <ChevronRight size={18} />
                </Button>
                <Button variant="outlined" className="h-14 rounded-2xl border-outline/20 text-text-sub" onClick={onClose}>Archive View</Button>
            </div>
        </div>
    );
}
