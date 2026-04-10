import React, { useState, useEffect } from 'react';
import { M3TextField, Button } from '@/components/primitives';
import { Calendar, Clock, User, Stethoscope, Building2, Tag } from 'lucide-react';

/**
 * 🛰️ AppointmentForm (M3 Architecture)
 * Handles both Creation and Modification and Clinical Records.
 */
export default function AppointmentForm({ initialData = null, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    department: 'General Ward',
    type: 'Consultation',
    ...initialData
  });

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const DEPARTMENTS = ['General Ward', 'Cardiology', 'Pediatrics', 'Radiology', 'Surgery', 'Maternity'];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 py-4">
      <div className="flex flex-col gap-6">
        <M3TextField 
          label="Patient Identity" 
          placeholder="Enter full name or MRN" 
          value={formData.patient}
          onChange={(e) => handleChange('patient', e.target.value)}
          required
          fullWidth
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <M3TextField 
              label="Practitioner" 
              placeholder="e.g. Dr. Sarah Ahmed"
              value={formData.doctor}
              onChange={(e) => handleChange('doctor', e.target.value)}
              required
            />
            <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold text-text-sub ml-4 uppercase tracking-wider">Clinical Unit</span>
                <select 
                    value={formData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    className="h-14 px-5 bg-surface-bright border border-outline rounded-xl text-sm font-bold text-text-main outline-none focus:border-primary transition-colors cursor-pointer"
                >
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
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
          <M3TextField 
            label="Start Time" 
            type="time"
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
          />
        </div>

        <M3TextField 
          label="Case Type" 
          placeholder="Consultation, Emergency, Follow-up"
          value={formData.type}
          onChange={(e) => handleChange('type', e.target.value)}
          required
        />
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-outline/20">
        <Button 
          type="button" 
          variant="text" 
          onClick={onCancel}
          className="flex-1"
          disabled={isSubmitting}
        >
          Discard
        </Button>
        <Button 
          type="submit" 
          variant="filled" 
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : initialData ? 'Update Record' : 'Finalize Slot'}
        </Button>
      </div>
    </form>
  );
}
