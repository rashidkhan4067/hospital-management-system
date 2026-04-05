import React, { useEffect } from 'react';
import { 
    ArrowRightLeft, BedIcon, Activity, Heart, Save, AlertCircle, 
    Hospital, MapPin, ClipboardList, Zap, User
} from 'lucide-react';
import { Button, Modal } from '@/shared/components/ui';

/**
 * 🛰 TRANSFER MODAL
 * Node migration center for active clinical admissions.
 * Follows the high-fidelity Appointment Modal design system.
 */
export default function TransferModal({ isOpen, onClose, onTransfer, admission, wards = [] }) {
    const [selectedWardId, setSelectedWardId] = React.useState('');
    const [selectedBedId, setSelectedBedId] = React.useState('');
    const [reason, setReason] = React.useState('');
    
    // Derived state
    const selectedWard = wards.find(w => w.id === parseInt(selectedWardId));
    const availableBeds = selectedWard?.beds?.filter(b => b.status === 'AVAILABLE') || [];

    useEffect(() => {
        if (admission) {
            setSelectedWardId(admission.ward_id?.toString() || '');
            setReason(`Node Migration: Clinical Protocol Upgrade - ${new Date().toLocaleDateString()}`);
        }
    }, [admission]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onTransfer({ admission_id: admission.id, new_bed_id: selectedBedId, reason });
        onClose();
    };

    if (!admission) return null;

    const sidebar = (
        <React.Fragment>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Migration Summary</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-white/5 flex items-center justify-center text-indigo-600">
                    <ArrowRightLeft size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-slate-900 dark:text-white truncate">
                        {admission.patient_name}
                    </p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest italic">
                        {admission.ward_name} → {selectedWard ? `${selectedWard.name}` : '...'}
                    </p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Protocol</span>
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">Active Node</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Target Bed</span>
                    <span className="text-[10px] font-black text-indigo-600 uppercase italic">
                        {selectedBedId ? `Bed ${availableBeds.find(b => b.id === parseInt(selectedBedId))?.bed_number}` : 'Unassigned'}
                    </span>
                </div>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-2 text-slate-400/40">
                <Zap size={14} className="text-amber-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-widest italic tracking-tighter">Node Migration Log v1.0</span>
            </div>
        </React.Fragment>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Transfer Patient"
            subtitle="Patient Spatial Node Migration Hub"
            icon={ArrowRightLeft}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Origin Information (Read-only) */}
                <div className="bg-slate-50 dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-600/10">
                        <User size={20} />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Origin Point</span>
                        <h4 className="text-[12px] font-black text-slate-900 dark:text-white uppercase italic tracking-widest">{admission.ward_name} • {admission.bed_number}</h4>
                     </div>
                </div>

                {/* 2. Target Ward & Bed Duo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Destination Ward</label>
                        <div className="relative group">
                            <select
                                required
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-indigo-600 transition-all text-slate-900 dark:text-white appearance-none h-[54px] shadow-sm"
                                value={selectedWardId}
                                onChange={(e) => { setSelectedWardId(e.target.value); setSelectedBedId(''); }}
                            >
                                <option value="">Select Ward Node...</option>
                                {wards.map(w => (
                                    <option key={w.id} value={w.id}>{w.name} ({w.code})</option>
                                ))}
                            </select>
                            <Hospital size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-indigo-600" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Available Target Bed</label>
                        <div className="relative group">
                            <select
                                required
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-indigo-600 transition-all text-slate-900 dark:text-white appearance-none h-[54px] shadow-sm disabled:opacity-50"
                                value={selectedBedId}
                                onChange={(e) => setSelectedBedId(e.target.value)}
                                disabled={!selectedWardId}
                            >
                                <option value="">{selectedWardId ? 'Select Target Bed...' : 'Select Ward First'}</option>
                                {availableBeds.map(b => (
                                    <option key={b.id} value={b.id}>Bed {b.bed_number} ({b.bed_type})</option>
                                ))}
                            </select>
                            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-indigo-600" />
                        </div>
                    </div>
                </div>

                {/* 3. Reason Cluster */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Reason for Transfer / Clinical Justification</label>
                    <div className="relative group">
                        <textarea
                            rows="3"
                            required
                            placeholder="Enter clinical reason..."
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-indigo-600 transition-all text-slate-900 dark:text-white resize-none shadow-sm h-32 italic"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <ClipboardList size={16} className="absolute left-4 top-4 text-slate-400 opacity-40 group-focus-within:text-indigo-600" />
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-indigo-600/5 p-4 rounded-2xl border border-indigo-600/10">
                    <AlertCircle size={20} className="text-indigo-600" />
                    <p className="text-[9px] font-black uppercase italic text-indigo-900/60 dark:text-indigo-200/60 tracking-widest leading-relaxed">
                        Ward migration will update all clinical data shards and synchronize the spatial database in real-time.
                    </p>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-indigo-600 text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-indigo-600/20 hover:brightness-110 active:scale-95 transition-all mt-6 border-none italic"
                >
                    <ArrowRightLeft size={16} strokeWidth={3} className="mr-2 inline" /> Process Migration
                </Button>
            </form>
        </Modal>
    );
}
