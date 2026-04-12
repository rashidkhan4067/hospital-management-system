import React from 'react';
import M3TextField from '@/components/primitives/M3TextField';

export default function ConsentStep({ formData, setFormData }) {
  return (
    <div className="space-y-5 animate-in slide-in-from-right-4 duration-500">
        <div className="mb-8">
            <h1 className="text-[24px] font-normal text-[#202124] mb-2 leading-tight">Privacy & Consent</h1>
            <p className="text-[14px] text-[#5f6368]">Finalize your registration by reviewing our institutional terms.</p>
        </div>

        <M3TextField
            label="Residential Address"
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
            fullWidth required
        />

        <div className="p-4 bg-[#f8f9fa] rounded-2xl border border-[#e8eaed] space-y-3">
            <p className="text-[12px] text-[#5f6368] leading-relaxed">
                By clicking 'Complete Registration', you agree to our <strong>Institutional Privacy Policy</strong> for patient data management under international clinical standards. Your medical records will be stored securely.
            </p>
            <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                    type="checkbox" 
                    checked={formData.consented}
                    onChange={e => setFormData({...formData, consented: e.target.checked})}
                    className="w-5 h-5 rounded border-[#dadce0] text-[#4285F4] focus:ring-[#4285F4] transition-all"
                    required
                />
                <span className="text-[13px] font-medium text-[#3c4043] group-hover:text-[#202124]">I understand and agree to the terms.</span>
            </label>
        </div>
    </div>
  );
}
