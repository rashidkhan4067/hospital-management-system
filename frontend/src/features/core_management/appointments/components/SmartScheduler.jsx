import React, { useState, useEffect } from 'react';
import { M3TextField, Button } from '@/components/primitives';
import { useDoctorAvailability } from '../hooks/useAppointments';
import { User, Stethoscope, Clock, Calendar as CalendarIcon, Loader2 } from 'lucide-react';

/**
 * 🛰️ SmartScheduler (Google Identity Spec)
 * Logic-heavy clinical form with real-time availability triangulation.
 */
export default function SmartScheduler({ onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    patient: '',
    doctor: 'Dr. Sarah Ahmed',
    date: '2026-04-10',
    time: '',
    department: 'Cardiology',
    type: 'Consultation'
  });

  const { data: slots, isLoading: loadingSlots } = useDoctorAvailability(formData.doctor, formData.date);

  useEffect(() => {
    if (slots?.length > 0 && !formData.time) {
      setFormData(prev => ({ ...prev, time: slots[0] }));
    }
  }, [slots]);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.time) return;
    onSubmit(formData);
  };

  const DOCTORS = ['Dr. Sarah Ahmed', 'Dr. John Carter', 'Dr. Elena Vance'];
  const DEPARTMENTS = ['Cardiology', 'Surgery', 'Pediatrics', 'Radiology'];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 py-4">
      <div className="flex flex-col gap-6">
        <M3TextField 
          label="Patient Name" 
          placeholder="Michael Chen" 
          value={formData.patient}
          onChange={(e) => handleChange('patient', e.target.value)}
          required
          fullWidth
        />

        <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-text-sub uppercase tracking-[0.2em] px-4">Assigned Practitioner</span>
            <div className="relative">
                <Stethoscope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sub" />
                <select 
                    value={formData.doctor}
                    onChange={(e) => handleChange('doctor', e.target.value)}
                    className="w-full h-12 pl-12 pr-6 bg-surface-bright border border-outline rounded-xl text-xs font-bold text-text-main appearance-none focus:border-primary outline-none transition-all"
                >
                    {DOCTORS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <M3TextField 
            label="Schedule Date" 
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
          
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-text-sub uppercase tracking-[0.2em] px-4">Available Slots</span>
            <div className="relative">
                <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sub" />
                <select 
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    disabled={loadingSlots || !slots?.length}
                    className="w-full h-12 pl-12 pr-6 bg-surface-bright border border-outline rounded-xl text-xs font-bold text-text-main appearance-none focus:border-primary outline-none transition-all disabled:opacity-50"
                >
                    {loadingSlots ? <option>Calculating...</option> : 
                     slots?.length ? slots.map(s => <option key={s} value={s}>{s}</option>) :
                     <option>No slots available</option>}
                </select>
                {loadingSlots && <Loader2 size={12} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary animate-spin" />}
            </div>
          </div>
        </div>

        <M3TextField 
            label="Case Complexity / Type" 
            placeholder="e.g. Follow-up"
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            required
        />
      </div>

      <div className="flex items-center gap-4 pt-6 mt-4 border-t border-outline/10">
        <Button type="button" variant="text" onClick={onCancel} className="flex-1">Discard</Button>
        <Button type="submit" variant="filled" className="flex-1" disabled={isSubmitting || !formData.time}>
            {isSubmitting ? 'Finalizing Slot...' : 'Confirm Schedule'}
        </Button>
      </div>
    </form>
  );
}
