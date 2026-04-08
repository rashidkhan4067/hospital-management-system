import React, { useState } from 'react';
import { 
    Activity, Heart, Thermometer, Droplets, Info, 
    Save, X, Check 
} from 'lucide-react';
import { Button, Modal } from '@/components/primitives';

/**
 * ⚡ VITAL CHECK-IN MODAL
 * High-fidelity vital signs propagation before the patient is assigned to a doctor node.
 */
export default function VitalCheckInModal({ isOpen, onClose, appointment, onCommit }) {
    const [vitals, setVitals] = useState({
        blood_pressure: '',
        temperature: '',
        heart_rate: '',
        respiratory_rate: '',
        oxygen_level: '98%',
        clinical_notes: ''
    });

    const [isSaving, setIsSaving] = useState(false);

    if (!appointment) return null;

    const patient = appointment.patient || {};
    const doctor = appointment.doctor || {};

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setIsSaving(true);
        try {
            // In a real app, this would call medicalRecordService.create()
            // For now, we simulate the commit node.
            await new Promise(resolve => setTimeout(resolve, 800));
            onCommit(vitals);
            onClose();
        } catch (err) {
            console.error('Vital propagation failure:', err);
        } finally {
            setIsSaving(false);
        }
    };

    const sidebar = (
        <div className="flex flex-col gap-6">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary">Patient Overview</p>
            
            <div className="p-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary font-black italic">
                        {patient.full_name?.charAt(0) || 'P'}
                    </div>
                    <div>
                        <p className="text-[13px] font-black text-slate-900 dark:text-white uppercase italic leading-none">{patient.full_name}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">ID-{patient.id}</p>
                    </div>
                </div>
                <div className="pt-3 border-t border-slate-50 dark:border-white/5 space-y-2">
                    <div className="flex justify-between text-[8px] font-black uppercase text-slate-400 tracking-widest">
                        <span>Age/Gender</span>
                        <span className="text-slate-900 dark:text-white">28Y / Female</span>
                    </div>
                </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-3">
                <div className="flex items-center gap-2 text-amber-500">
                    <Info size={12} />
                    <span className="text-[8px] font-black uppercase tracking-widest italic">Allergy Alert</span>
                </div>
                <p className="text-[9px] font-bold text-amber-600 dark:text-amber-500 italic leading-relaxed uppercase">No known drug allergies reported at current timestamp.</p>
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Vital Synchronization"
            subtitle="Record Pre-session Clinical Vitals"
            icon={Activity}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* BP Node */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Blood Pressure</label>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="120/80 mmHg"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black uppercase italic outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                            value={vitals.blood_pressure}
                            onChange={(e) => setVitals({...vitals, blood_pressure: e.target.value})}
                        />
                        <Activity size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary opacity-40 transition-colors" />
                    </div>
                </div>

                {/* Heart Rate Node */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Heart Rate</label>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="72 BPM"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black uppercase italic outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                            value={vitals.heart_rate}
                            onChange={(e) => setVitals({...vitals, heart_rate: e.target.value})}
                        />
                        <Heart size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500 opacity-40 group-focus-within:opacity-100 transition-all" />
                    </div>
                </div>

                {/* Temp Node */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Temperature</label>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="37.2 °C"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black uppercase italic outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                            value={vitals.temperature}
                            onChange={(e) => setVitals({...vitals, temperature: e.target.value})}
                        />
                        <Thermometer size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 opacity-40 group-focus-within:opacity-100 transition-all" />
                    </div>
                </div>

                {/* Oxygen Node */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Oxygen Saturation</label>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="98% SpO2"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black uppercase italic outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                            value={vitals.oxygen_level}
                            onChange={(e) => setVitals({...vitals, oxygen_level: e.target.value})}
                        />
                        <Droplets size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 opacity-40 group-focus-within:opacity-100 transition-all" />
                    </div>
                </div>

                {/* Notes Node */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Clinical Observations</label>
                    <textarea
                        rows="3"
                        placeholder="Patient appears stable. Normal respiratory rhythm noted..."
                        className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white resize-none"
                        value={vitals.clinical_notes}
                        onChange={(e) => setVitals({...vitals, clinical_notes: e.target.value})}
                    />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-6">
                    <Button 
                        type="button" 
                        onClick={onClose}
                        className="px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[9px] font-black uppercase tracking-widest border-none hover:bg-slate-200 dark:hover:bg-white/10 transition-all italic"
                    >
                        <X size={14} className="mr-2" /> Abort Node
                    </Button>
                    <Button 
                        type="submit"
                        disabled={isSaving}
                        className="px-8 py-3.5 rounded-2xl bg-accent-primary text-white text-[9px] font-black uppercase tracking-widest border-none shadow-xl shadow-accent-primary/25 hover:brightness-110 active:scale-95 transition-all italic"
                    >
                        {isSaving ? 'Syncing...' : <><Save size={14} className="mr-2" /> Commit Vitals</>}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
