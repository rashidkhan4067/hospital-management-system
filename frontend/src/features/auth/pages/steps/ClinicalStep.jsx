import React from 'react';
import M3TextField from '@/components/primitives/M3TextField';

export default function ClinicalStep({ formData, setFormData }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
        <div className="mb-6">
            <h1 className="text-[26px] font-semibold text-[#202124] mb-1 tracking-tight">Clinical Baseline</h1>
            <p className="text-[14px] text-[#5F6368] leading-relaxed opacity-80">This data is mandatory to ensure patient safety and prevent medication errors.</p>
        </div>

        <M3TextField
            label="Known Allergies"
            placeholder="e.g. Penicillin, Peanuts"
            value={formData.allergies}
            onChange={e => setFormData({...formData, allergies: e.target.value})}
            fullWidth required
            helperText="Write 'None' if you have no known allergies."
        />

        <M3TextField
            label="Current Medications"
            placeholder="List drugs or supplements"
            value={formData.currentMedications}
            onChange={e => setFormData({...formData, currentMedications: e.target.value})}
            fullWidth required
            helperText="Write 'None' if not taking any medication."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="relative">
                <label className="absolute -top-2.5 left-3 px-1.5 text-[11px] font-bold text-[#4285F4] bg-white z-20">Blood Group</label>
                <select 
                    className="w-full h-[56px] border border-[#DADCE0] rounded-xl px-4 bg-white focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] outline-none text-[14px] font-medium appearance-none cursor-pointer"
                    value={formData.bloodGroup}
                    onChange={e => setFormData({...formData, bloodGroup: e.target.value})}
                    required
                >
                    <option value="">Select Blood Group</option>
                    <option>A (Positive)</option><option>A (Negative)</option>
                    <option>B (Positive)</option><option>B (Negative)</option>
                    <option>O (Positive)</option><option>O (Negative)</option>
                    <option>AB (Positive)</option><option>AB (Negative)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">▼</div>
            </div>
            <M3TextField
                label="Chronic Conditions"
                placeholder="e.g. Diabetes, Asthma"
                value={formData.chronicConditions}
                onChange={e => setFormData({...formData, chronicConditions: e.target.value})}
                fullWidth required
                helperText="Write 'None' if not applicable."
            />
        </div>
    </div>
  );
}
