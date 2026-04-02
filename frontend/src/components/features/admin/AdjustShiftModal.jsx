import React, { useState, useEffect } from 'react';
import {
  Clock,
  Stethoscope,
  Zap,
  ShieldCheck,
  ToggleRight
} from 'lucide-react';
import { Button, Modal } from '../../ui';
import { useAdminDoctors } from '../../../hooks/admin/useAdminDoctors';

/**
 * 🧛 Physician Protocol Adjustment Modal
 * High-fidelity interface for modifying clinical shift shards and availability.
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

  // Support pre-selected doctor from table action
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
      // Reset or close logic handled by parent
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
    <>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary">Protocol Summary</p>
        
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                <Stethoscope size={18} />
            </div>
            <div>
                <p className="text-[14px] font-black text-text-primary dark:text-white truncate">
                    {currentDoctor ? `Dr. ${currentDoctor.user_full_name}` : 'Select Resident'}
                </p>
                <p className="text-[8px] font-bold text-text-secondary uppercase mt-1 tracking-widest">
                    {formData.is_available ? 'Active duty' : 'Off duty'}
                </p>
            </div>
        </div>

        <div className="space-y-4 px-2">
            <div className="flex justify-between items-center">
                <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Window</span>
                <span className="text-[10px] font-black text-text-primary dark:text-white uppercase">{formData.consultation_start_time} - {formData.consultation_end_time}</span>
            </div>
            <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Days</span>
                <span className="text-[10px] font-black text-accent-primary uppercase">{formData.available_days.length} Active</span>
            </div>
        </div>

        <div className="mt-auto pt-8 flex items-center gap-2 text-text-secondary/40">
            <Zap size={14} className="text-amber-500 animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest">Matrix Sync Active</span>
        </div>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adjust Shift Protocol"
      subtitle="Physician Availability Alignment"
      icon={ShieldCheck}
      sidebar={sidebar}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Specialized Resident Selection */}
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Clinical Resident</label>
          <div className="relative group">
            <select
              required
              disabled={!!selectedDoctor}
              className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[11px] font-bold uppercase outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white appearance-none h-[54px] disabled:opacity-50"
              value={formData.doctor_id}
              onChange={(e) => setFormData({ ...formData, doctor_id: e.target.value })}
            >
              <option value="">Select Resident...</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>Dr. {d.user_full_name} ({d.specialization})</option>
              ))}
            </select>
            <Stethoscope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Shift Start</label>
            <div className="relative group">
              <input
                type="time"
                required
                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                value={formData.consultation_start_time}
                onChange={(e) => setFormData({ ...formData, consultation_start_time: e.target.value })}
              />
              <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Shift End</label>
            <div className="relative group">
              <input
                type="time"
                required
                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                value={formData.consultation_end_time}
                onChange={(e) => setFormData({ ...formData, consultation_end_time: e.target.value })}
              />
              <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary" />
            </div>
          </div>
        </div>

        {/* Weekly Cadence Selector */}
        <div className="space-y-3">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Weekly Operational Cadence</label>
          <div className="flex flex-wrap gap-2">
            {days.map(day => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-3 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all border ${formData.available_days.includes(day)
                    ? 'bg-accent-primary/20 border-accent-primary text-accent-primary'
                    : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-text-secondary'
                  }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Slot Duration (Min)</label>
            <div className="relative group">
              <input
                type="number"
                min="5"
                max="120"
                className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 pl-12 rounded-2xl border border-slate-200 dark:border-white/5 text-[12px] font-extrabold outline-none focus:border-accent-primary transition-all text-slate-900 dark:text-white"
                value={formData.slot_duration_minutes}
                onChange={(e) => setFormData({ ...formData, slot_duration_minutes: parseInt(e.target.value) })}
              />
              <Zap size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary opacity-40 group-focus-within:text-accent-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/20 ml-1">Faculty Status</label>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, is_available: !formData.is_available })}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${formData.is_available
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
          className="w-full bg-accent-primary text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 mt-6 border-none"
        >
          {isSubmitting ? 'Syncing Shards...' : 'Commit Protocol Update'}
        </Button>
      </form>
    </Modal>
  );
}
