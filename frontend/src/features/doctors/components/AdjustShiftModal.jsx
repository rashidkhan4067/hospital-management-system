import React, { useState, useEffect } from 'react';
import {
  Clock,
  Stethoscope,
  Zap,
  ShieldCheck,
  ToggleRight,
  Briefcase,
  Users as UsersIcon
} from 'lucide-react';
import { Button, Modal } from '@/shared/components/ui';
import { useAdminDoctors } from '@/features/doctors/hooks/useDoctors';

/**
 * 🧛 Physician Protocol Adjustment Modal
 * High-fidelity interface for modifying clinical shift shards and availability.
 * Re-mapped to the Global Clinical Modal Registry with design parity.
 */
export default function AdjustShiftModal({ isOpen, onClose, onAction, isSubmitting, selectedDoctor = null }) {
  const { doctors } = useAdminDoctors();

  const [formData, setFormData] = useState({
    doctor_id: '',
    consultation_start_time: '09:00',
    consultation_end_time: '17:00',
    slot_duration_minutes: 30,
    is_available: true,
    available_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  });

  useEffect(() => {
    if (selectedDoctor) {
      setFormData({
        doctor_id: selectedDoctor.id,
        consultation_start_time: selectedDoctor.consultation_start_time || '09:00',
        consultation_end_time: selectedDoctor.consultation_end_time || '17:00',
        slot_duration_minutes: selectedDoctor.slot_duration_minutes || 30,
        is_available: selectedDoctor.is_available ?? true,
        available_days: selectedDoctor.available_days || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      });
    } else {
      setFormData({
        doctor_id: '',
        consultation_start_time: '09:00',
        consultation_end_time: '17:00',
        slot_duration_minutes: 30,
        is_available: true,
        available_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      });
    }
  }, [selectedDoctor, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.doctor_id) return;
    onAction(formData.doctor_id, formData, () => {
      // Reset logic
    });
  };

  const toggleDay = (day) => {
    const updated = formData.available_days.includes(day)
      ? formData.available_days.filter(d => d !== day)
      : [...formData.available_days, day];
    setFormData({ ...formData, available_days: updated });
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const currentDoctor = doctors.find(d => d.id == formData.doctor_id);

  const sidebar = (
    <React.Fragment>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Protocol Summary</p>
        
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                <Stethoscope size={18} />
            </div>
            <div>
                <p className="text-[14px] font-black text-slate-900 dark:text-white truncate leading-tight">
                    {currentDoctor ? `Dr. ${currentDoctor.user_full_name || currentDoctor.full_name}` : 'Resident Shard'}
                </p>
                <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest leading-none italic">
                    {formData.is_available ? 'Active duty synchronized' : 'Off duty hub'}
                </p>
            </div>
        </div>

        <div className="space-y-4 px-2 pt-4">
            <div className="flex justify-between items-center">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Window Node</span>
                <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">{formData.consultation_start_time} - {formData.consultation_end_time}</span>
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-4">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Clinical Days</span>
                <span className="text-[10px] font-black text-accent-primary uppercase italic">{formData.available_days.length} Shards Active</span>
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
      title="Adjust Protocol"
      subtitle="Physician Availability Alignment"
      icon={ShieldCheck}
      sidebar={sidebar}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 animate-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Clinical Resident Shard</label>
          <div className="relative group">
            <select
              required
              disabled={!!selectedDoctor}
              className="w-full bg-slate-50 dark:bg-[#0f1117] p-4 pl-11 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-black uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white h-[53px] appearance-none italic disabled:opacity-50"
              value={formData.doctor_id}
              onChange={(e) => setFormData({ ...formData, doctor_id: e.target.value })}
            >
              <option value="">Select Resident...</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>Dr. {d.user_full_name || d.full_name} ({d.specialization_display || d.specialization})</option>
              ))}
            </select>
            <Stethoscope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-40 group-focus-within:text-accent-primary transition-colors z-10 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
            <InputField label="Shift Commencement" type="time" icon={<Clock size={12}/>} value={formData.consultation_start_time} onChange={(v) => setFormData({...formData, consultation_start_time: v})} />
            <InputField label="Shift Termination" type="time" icon={<Clock size={12}/>} value={formData.consultation_end_time} onChange={(v) => setFormData({...formData, consultation_end_time: v})} />
        </div>

        <div className="space-y-3">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Weekly Operational Cadence</label>
          <div className="flex flex-wrap gap-2">
            {days.map(day => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-4 py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all border ${formData.available_days.includes(day)
                    ? 'bg-accent-primary/10 border-accent-primary/40 text-accent-primary shadow-sm shadow-accent-primary/10'
                    : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-400'
                  }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
           <InputField label="Slot Matrix (Min)" type="number" icon={<Zap size={12}/>} value={formData.slot_duration_minutes} onChange={(v) => setFormData({...formData, slot_duration_minutes: parseInt(v)})} />
           <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">Faculty Status</label>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, is_available: !formData.is_available })}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all h-[53px] ${formData.is_available
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                }`}
            >
              <span className="text-[9px] font-black uppercase tracking-widest">{formData.is_available ? 'In-Session' : 'Off-Duty'}</span>
              <ToggleRight className={`transition-all ${formData.is_available ? 'rotate-0' : 'rotate-180 opacity-40'}`} />
            </button>
           </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !formData.doctor_id}
          className="w-full bg-accent-primary text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-4 border-none italic"
        >
          {isSubmitting ? 'Syncing Shards...' : 'Commit Protocol Update'}
        </Button>
      </form>
    </Modal>
  );
}

function InputField({ label, icon, ...props }) {
    return (
      <div className="space-y-2">
        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">{label}</label>
        <div className="relative group">
          {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors">{icon}</div>}
          <input
            {...props}
            className={`w-full bg-slate-50 dark:bg-[#0f1117] p-4 ${icon ? 'pl-11' : ''} rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary focus:shadow-[0_0_15px_rgba(45,212,191,0.1)] transition-all text-slate-900 dark:text-white uppercase placeholder:text-slate-300 italic`}
            onChange={(e) => props.onChange(e.target.value)}
          />
        </div>
      </div>
    );
}
