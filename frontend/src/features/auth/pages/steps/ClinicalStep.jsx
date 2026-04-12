import React from 'react';
import M3TextField from '@/components/primitives/M3TextField';

export default function ClinicalStep({ formData, setFormData }) {
  return (
    <div className="space-y-5 animate-in slide-in-from-right-4 duration-500">
        <div className="mb-8">
            <h1 className="text-[24px] font-normal text-[#202124] mb-2 leading-tight">Clinical Baseline</h1>
            <p className="text-[14px] text-[#5f6368]">Help us understand your medical history for international standard care.</p>
        </div>

        <M3TextField
            label="Known Allergies"
            placeholder="e.g. Penicillin, Peanuts (N/A if none)"
            value={formData.allergies}
            onChange={e => setFormData({...formData, allergies: e.target.value})}
            fullWidth
        />

        <M3TextField
            label="Current Medications"
            placeholder="List any medicine you take regularly"
            value={formData.currentMedications}
            onChange={e => setFormData({...formData, currentMedications: e.target.value})}
            fullWidth
        />

        <div className="flex gap-4">
            <div className="flex-grow relative">
                <label className="absolute -top-2 left-2 px-1 text-[11px] font-medium text-[#4285F4] bg-white z-10">Blood Group</label>
                <select 
                    className="w-full h-[56px] border border-[#DADCE0] rounded-xl px-4 pt-1 bg-white focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] outline-none"
                    value={formData.bloodGroup}
                    onChange={e => setFormData({...formData, bloodGroup: e.target.value})}
                >
                    <option value="">Select</option>
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                    <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                </select>
            </div>
        </div>

        <M3TextField
            label="Chronic Conditions"
            placeholder="e.g. Diabetes, Hypertension"
            value={formData.chronicConditions}
            onChange={e => setFormData({...formData, chronicConditions: e.target.value})}
            fullWidth
        />
    </div>
  );
}
