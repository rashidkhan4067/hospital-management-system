import React from 'react';
import M3TextField from '@/components/primitives/M3TextField';

export default function EmergencyStep({ formData, setFormData }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
        <div className="mb-6">
            <h1 className="text-[26px] font-semibold text-[#202124] mb-1 tracking-tight">Emergency Contact</h1>
            <p className="text-[14px] text-[#5F6368] leading-relaxed opacity-80">Designate an emergency proxy to manage clinical decisions if you are unavailable.</p>
        </div>

        <M3TextField
            label="Contact Full Name"
            placeholder="Authorized representative name"
            value={formData.emergencyName}
            onChange={e => setFormData({...formData, emergencyName: e.target.value})}
            fullWidth required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <M3TextField
                label="Relationship"
                placeholder="e.g. Spouse, Parent"
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
        
        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-3 items-start">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] shrink-0 mt-0.5">!</div>
            <p className="text-[12px] text-blue-700 leading-tight">
                This individual will be prioritized during critical triage events. Ensure the contact number is always active.
            </p>
        </div>
    </div>
  );
}
