import React from 'react';
import { 
    UserPlus, Search, BedIcon, Activity, Heart, Save, 
    User, Hospital, ClipboardList, Zap, Calendar, MapPin
} from 'lucide-react';
import { Button, Modal } from '@/components/primitives';

/**
 * 🏥 ADMISSION MODAL
 * Follows the high-fidelity Appointment Modal style.
 */
export default function AdmissionModal({ isOpen, onClose, onAdmit, wards = [], patients = [] }) {
    const [selectedPatientId, setSelectedPatientId] = React.useState('');
    const [selectedWardId, setSelectedWardId] = React.useState('');
    const [selectedBedId, setSelectedBedId] = React.useState('');
    const [diagnosis, setDiagnosis] = React.useState('');
    
    // Derived state
    const selectedWard = wards.find(w => w.id === parseInt(selectedWardId));
    const availableBeds = selectedWard?.beds?.filter(b => b.status === 'AVAILABLE') || [];
    const selectedPatient = patients.find(p => p.id === parseInt(selectedPatientId));

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdmit({ patient_id: selectedPatientId, bed_id: selectedBedId, diagnosis });
        onClose();
    };

    const sidebar = (
        <React.Fragment>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Spatial Allocation</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <BedIcon size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-slate-900 dark:text-white truncate">
                        {selectedPatient ? selectedPatient.full_name : 'Admission Pending'}
                    </p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest italic">
                        {selectedWard ? `${selectedWard.name} Unit` : 'Select Destination Ward'}
                    </p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Protocol</span>
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">Inpatient Registry</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Bed Node</span>
                    <span className="text-[10px] font-black text-accent-primary uppercase italic">
                        {selectedBedId ? `Bed ${availableBeds.find(b => b.id === parseInt(selectedBedId))?.bed_number}` : 'Unassigned'}
                    </span>
                </div>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-2 text-slate-400/40">
                <Zap size={14} className="text-amber-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-widest italic">Al Shifaa Spatial Sync</span>
            </div>
        </React.Fragment>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Admit Patient"
            subtitle="Patient Spatial Allocation Registry"
            icon={UserPlus}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Patient Selection */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Target Patient</label>
                    <div className="relative group">
                        <select
                            required
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-[54px] shadow-sm"
                            value={selectedPatientId}
                            onChange={(e) => setSelectedPatientId(e.target.value)}
                        >
                            <option value="">Select Patient Shard...</option>
                            {patients.map(p => (
                                <option key={p.id} value={p.id}>{p.full_name} ({p.patient_id})</option>
                            ))}
                        </select>
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-accent-primary" />
                    </div>
                </div>

                {/* 2. Ward & Bed Duo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Destination Ward</label>
                        <div className="relative group">
                            <select
                                required
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-[54px] shadow-sm"
                                value={selectedWardId}
                                onChange={(e) => { setSelectedWardId(e.target.value); setSelectedBedId(''); }}
                            >
                                <option value="">Select Ward Node...</option>
                                {wards.map(w => (
                                    <option key={w.id} value={w.id}>{w.name} ({w.code})</option>
                                ))}
                            </select>
                            <Hospital size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-accent-primary" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Available Bed</label>
                        <div className="relative group">
                            <select
                                required
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-[54px] shadow-sm disabled:opacity-50"
                                value={selectedBedId}
                                onChange={(e) => setSelectedBedId(e.target.value)}
                                disabled={!selectedWardId}
                            >
                                <option value="">{selectedWardId ? 'Select Bed Shard...' : 'Select Ward First'}</option>
                                {availableBeds.map(b => (
                                    <option key={b.id} value={b.id}>Bed {b.bed_number} ({b.bed_type})</option>
                                ))}
                            </select>
                            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-accent-primary" />
                        </div>
                    </div>
                </div>

                {/* 3. Clinical Context */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Clinical Diagnosis & Intake Notes</label>
                    <div className="relative group">
                        <textarea
                            rows="3"
                            required
                            placeholder="Enter clinical context..."
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white resize-none shadow-sm h-32 italic"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                        />
                        <ClipboardList size={16} className="absolute left-4 top-4 text-slate-400 opacity-40 group-focus-within:text-accent-primary" />
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-accent-primary/5 p-4 rounded-2xl border border-accent-primary/10">
                    <Heart size={20} className="text-accent-primary fill-accent-primary/20" />
                    <p className="text-[9px] font-black uppercase italic text-accent-primary tracking-widest leading-relaxed">
                        Admission sync will prioritize spatial allocation according to unit readiness protocols.
                    </p>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-accent-primary text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all mt-6 border-none italic"
                >
                    <UserPlus size={16} strokeWidth={3} className="mr-2 inline" /> Admit Patient Shard
                </Button>
            </form>
        </Modal>
    );
}
