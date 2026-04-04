import React, { useState } from 'react';
import { Activity, Heart, Thermometer, Zap, User, Plus, Stethoscope, Briefcase, Users as UsersIcon } from 'lucide-react';
import { Button, Modal } from '@/shared/components/ui';

/**
 * 🛰 VitalsUpdateModal
 * Real-time telemetry recalibration portal with unified design parity.
 */
export default function VitalsUpdateModal({ isOpen, onClose, onRefresh, currentVitals = {} }) {
    const [vitals, setVitals] = useState({
        bpm: currentVitals.bpm || '72',
        bp: currentVitals.bp || '120/80',
        temp: currentVitals.temp || '36.6',
        weight: currentVitals.weight || '70',
        height: currentVitals.height || '175',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateVital = (key, val) => setVitals(prev => ({ ...prev, [key]: val }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
            if (onRefresh) onRefresh();
        }, 1000);
    };

    const sidebar = (
        <React.Fragment>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Clinical Telemetry</p>
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <Activity size={18} />
                </div>
                <div>
                    <p className="text-[14px] font-black text-slate-900 dark:text-white truncate">Vitals Matrix</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest leading-none italic">Recalibrating Telemetry</p>
                </div>
            </div>

            <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Process Node</span>
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">Vitals Sync</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-4">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Shard Status</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase italic">Active Logic</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 opacity-20 grayscale mt-auto pt-8">
                <Stethoscope size={16} />
                <Briefcase size={16} />
                <UsersIcon size={16} />
            </div>
        </React.Fragment>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Telemetry Calibration"
            subtitle="Real-time vital shard synchronization"
            icon={Activity}
            sidebar={sidebar}
            maxWidth="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-5">
                    <VitalInput label="Blood Pressure" icon={<Activity size={12}/>} placeholder="120/80" value={vitals.bp} onChange={(v) => updateVital('bp', v)} />
                    <VitalInput label="Pulse Rate (BPM)" icon={<Heart size={12}/>} placeholder="72" value={vitals.bpm} onChange={(v) => updateVital('bpm', v)} />
                </div>
                <div className="grid grid-cols-3 gap-5">
                   <VitalInput label="Temp (°C)" icon={<Thermometer size={12}/>} placeholder="36.6" value={vitals.temp} onChange={(v) => updateVital('temp', v)} />
                   <VitalInput label="Weight (KG)" icon={<Zap size={12}/>} placeholder="70" value={vitals.weight} onChange={(v) => updateVital('weight', v)} />
                   <VitalInput label="Height (CM)" icon={<User size={12}/>} placeholder="175" value={vitals.height} onChange={(v) => updateVital('height', v)} />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between opacity-60 italic">
                   <div className="flex items-center gap-3">
                      <Plus size={14} className="text-accent-primary" />
                      <span className="text-[10px] font-black uppercase text-slate-500">Live Calibration Pulse</span>
                   </div>
                   <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => <div key={i} className="h-1 w-4 rounded-full bg-accent-primary/20" />)}
                   </div>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-primary text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 border-none italic"
                >
                    {isSubmitting ? 'Synchronizing Telemetry...' : 'Commit Telemetry Matrix'}
                </Button>
            </form>
        </Modal>
    );
}

function VitalInput({ label, icon, ...props }) {
    return (
        <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">{label}</label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors">{icon}</div>
                <input 
                    {...props}
                    className="w-full bg-slate-50 dark:bg-[#0f1117] p-4 pl-11 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary focus:shadow-[0_0_15px_rgba(45,212,191,0.1)] transition-all text-slate-900 dark:text-white uppercase placeholder:text-slate-300 italic"
                    onChange={(e) => props.onChange(e.target.value)}
                />
            </div>
        </div>
    );
}
