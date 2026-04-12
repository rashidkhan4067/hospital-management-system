import React from 'react';
import M3TextField from '@/components/primitives/M3TextField';

export default function EmergencyStep({ formData, setFormData }) {
  return (
    <div className="space-y-5 animate-in slide-in-from-right-4 duration-500">
        <div className="mb-8">
            <h1 className="text-[24px] font-normal text-[#202124] mb-2 leading-tight">Emergency Contact</h1>
            <p className="text-[14px] text-[#5f6368]">Who should we contact in case of an urgent clinical event?</p>
        </div>

        <M3TextField
            label="Contact Name"
            value={formData.emergencyName}
            onChange={e => setFormData({...formData, emergencyName: e.target.value})}
            fullWidth required
        />

        <M3TextField
            label="Relationship"
            placeholder="e.g. Spouse, Parent, Friend"
            value={formData.emergencyRelation}
            onChange={e => setFormData({...formData, emergencyRelation: e.target.value})}
            fullWidth required
        />

        <M3TextField
            label="Emergency Phone"
            type="tel"
            value={formData.emergencyPhone}
            onChange={e => setFormData({...formData, emergencyPhone: e.target.value})}
            fullWidth required
        />
    </div>
  );
}
