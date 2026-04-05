import React from 'react';
import { Button, Modal } from '@/shared/components/ui';
import { BedIcon, Save, X, Plus, ShieldCheck, Zap, Hospital, AlertCircle, Info } from 'lucide-react';

/**
 * 🛰 BED MODAL
 * Deployment center for individual accommodation shards.
 * Follows the high-fidelity Appointment Modal design system.
 */
export default function BedModal({ isOpen, onClose, onSave, bed = null, wards = [] }) {
    const [formData, setFormData] = React.useState(bed || {
        bed_number: '',
        bed_type: 'NORMAL',
        ward_id: wards[0]?.id || '',
        status: 'AVAILABLE'
    });

    const isEdit = !!bed;
    const selectedWard = wards.find(w => w.id === parseInt(formData.ward_id));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const sidebar = (
        <React.Fragment>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Accommodation Shard</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <BedIcon size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-slate-900 dark:text-white truncate uppercase italic tracking-tighter">
                        {formData.bed_number || 'New Bed Shard'}
                    </p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest italic">
                        {selectedWard ? `${selectedWard.name}` : 'Unassigned Ward'}
                    </p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Type</span>
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase italic">{formData.bed_type} Grade</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                    <span className={`text-[10px] font-black uppercase italic ${formData.status === 'AVAILABLE' ? 'text-emerald-500' : 'text-orange-500'}`}>
                        {formData.status}
                    </span>
                </div>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-2 text-slate-400/40">
                <Zap size={14} className="text-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-widest italic tracking-tighter">Bed Node Readiness v1.2</span>
            </div>
        </React.Fragment>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? "Configure Bed Node" : "Deploy Bed Shard"}
            subtitle="Individual Accommodation Configuration Registry"
            icon={BedIcon}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Node Number */}
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Node Number</label>
                        <div className="relative group">
                            <input
                                required
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white shadow-sm"
                                value={formData.bed_number}
                                onChange={(e) => setFormData({...formData, bed_number: e.target.value})}
                                placeholder="e.g., B-101"
                            />
                            <BedIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-emerald-500" />
                        </div>
                    </div>

                    {/* Parent Ward */}
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Parent Ward</label>
                        <div className="relative group">
                            <select
                                required
                                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white appearance-none h-[54px] shadow-sm"
                                value={formData.ward_id}
                                onChange={(e) => setFormData({...formData, ward_id: e.target.value})}
                            >
                                <option value="">Select Ward Node...</option>
                                {wards.map(w => (
                                    <option key={w.id} value={w.id}>{w.name} ({w.code})</option>
                                ))}
                            </select>
                            <Hospital size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-emerald-500" />
                        </div>
                    </div>
                </div>

                {/* Accommodation Category */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Accommodation Grade</label>
                    <div className="relative group">
                        <select
                            className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white appearance-none h-[54px] shadow-sm"
                            value={formData.bed_type}
                            onChange={(e) => setFormData({...formData, bed_type: e.target.value})}
                        >
                            <option value="NORMAL">Normal / Standard Grade</option>
                            <option value="ELECTRIC">Semi-Fowler Electric</option>
                            <option value="FOWLER">Full Fowler Clinical Node</option>
                            <option value="ICU">Clinical / ICU Diagnostic Grade</option>
                            <option value="PEDIATRIC">Pediatric Specialized Shard</option>
                        </select>
                        <Info size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-emerald-500" />
                    </div>
                </div>

                {/* Status Nodes */}
                <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Initial Node State</label>
                    <div className="grid grid-cols-2 gap-4">
                        {['AVAILABLE', 'MAINTENANCE'].map(s => (
                            <div 
                                key={s}
                                onClick={() => setFormData({...formData, status: s})}
                                className={`cursor-pointer h-16 rounded-2xl border-2 flex items-center justify-center gap-4 transition-all ${
                                    formData.status === s 
                                    ? 'bg-emerald-500/5 border-emerald-500 text-emerald-500 shadow-lg shadow-emerald-500/5' 
                                    : 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/10 text-slate-400'
                                }`}
                            >
                                <div className={`w-3 h-3 rounded-full ${s === 'AVAILABLE' ? 'bg-emerald-500' : 'bg-orange-500'} shadow-sm`} />
                                <span className="text-[10px] font-black uppercase tracking-widest italic">{s}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    <p className="text-[9px] font-black uppercase italic text-emerald-900/60 dark:text-emerald-200/60 tracking-widest leading-relaxed">
                        Configuring new bed shards will update the clinical spatial matrix and enable immediate patient propagation.
                    </p>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-emerald-600 text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-emerald-600/20 hover:brightness-110 active:scale-95 transition-all mt-6 border-none italic"
                >
                    <Plus size={16} strokeWidth={3} className="mr-2 inline" /> {isEdit ? "Update Configuration" : "Deploy Bed Shard Node"}
                </Button>
            </form>
        </Modal>
    );
}
