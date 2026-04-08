import React from 'react';
import {
    Calendar,
    Clock,
    User,
    Stethoscope,
    FileText,
    Zap
} from 'lucide-react';
import { Button, Modal } from '@/components/primitives';
import { useAppointmentForm } from '../hooks/useAppointmentForm';

/**
 * 📅 Appointment Booking Modal
 * Simple screen to schedule a patient visit.
 * Decoupled from business logic via useAppointmentForm.
 */
export default function BookVisitModal({ isOpen, onClose, onRefresh }) {
    const {
        formData,
        updateField,
        handleSubmit,
        isSubmitting,
        patients,
        doctors,
        isLoading,
        selectedPatient,
        selectedDoctor
    } = useAppointmentForm(() => {
        onClose();
        if (onRefresh) onRefresh();
    });

    const sidebar = (
        <React.Fragment>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary">Appointment Summary</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <Calendar size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-text-primary dark:text-white truncate">
                        {selectedPatient ? selectedPatient.full_name : 'New Visit'}
                    </p>
                    <p className="text-[8px] font-bold text-text-secondary uppercase mt-1 tracking-widest">
                        {selectedDoctor ? `Dr. ${selectedDoctor.user_full_name}` : 'Select Doctor'}
                    </p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Date</span>
                    <span className="text-[10px] font-black text-text-primary dark:text-white uppercase">{formData.appointment_date}</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Time</span>
                    <span className="text-[10px] font-black text-accent-primary uppercase">{formData.start_time}</span>
                </div>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-2 text-text-secondary/40">
                <Zap size={14} className="text-amber-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-widest">Al Shifaa Hospital System</span>
            </div>
        </React.Fragment>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Book Appointment"
            subtitle="Schedule a New Patient Visit"
            icon={Calendar}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Selection Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Patient Selection */}
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Patient</label>
                        <div className="relative group">
                            <select
                                required
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-[54px] shadow-sm disabled:opacity-50"
                                value={formData.patient_id}
                                disabled={isLoading}
                                onChange={(e) => updateField('patient_id', e.target.value)}
                            >
                                <option value="">Select Patient...</option>
                                {patients.map(p => (
                                    <option key={p.id} value={p.id}>{p.full_name} (ID-{p.id})</option>
                                ))}
                            </select>
                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary transition-colors" />
                        </div>
                    </div>

                    {/* Doctor Selection */}
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Doctor</label>
                        <div className="relative group">
                            <select
                                required
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-[54px] shadow-sm disabled:opacity-50"
                                value={formData.doctor_id}
                                disabled={isLoading}
                                onChange={(e) => updateField('doctor_id', e.target.value)}
                            >
                                <option value="">Select Doctor...</option>
                                {doctors.map(d => (
                                    <option key={d.id} value={d.id}>Dr. {d.user_full_name} ({d.specialization_display || d.specialization})</option>
                                ))}
                            </select>
                            <Stethoscope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Schedule Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Appointment Date</label>
                        <div className="relative group">
                            <input
                                type="date"
                                required
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-sm"
                                value={formData.appointment_date}
                                onChange={(e) => updateField('appointment_date', e.target.value)}
                            />
                            <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Start Time</label>
                        <div className="relative group">
                            <input
                                type="time"
                                required
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white shadow-sm"
                                value={formData.start_time}
                                onChange={(e) => updateField('start_time', e.target.value)}
                            />
                            <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Medical Notes</label>
                    <div className="relative group">
                        <textarea
                            rows="3"
                            placeholder="Enter appointment notes..."
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-bold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white resize-none shadow-sm"
                            value={formData.notes}
                            onChange={(e) => updateField('notes', e.target.value)}
                        />
                        <FileText size={16} className="absolute left-4 top-4 text-text-secondary opacity-40 group-focus-within:text-accent-primary" />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full bg-accent-primary text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-6 border-none"
                >
                    {isSubmitting ? 'Saving...' : 'Book Appointment'}
                </Button>
            </form>
        </Modal>
    );
}
