import React from 'react';
import M3TextField from '@/components/primitives/M3TextField';

export default function ConsentStep({ formData, setFormData }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
        <div className="mb-6">
            <h1 className="text-[26px] font-semibold text-[#202124] mb-1 tracking-tight">Privacy & Consent</h1>
            <p className="text-[14px] text-[#5F6368] leading-relaxed opacity-80">Finalize your clinical identity by reviewing our institutional terms and data protocol.</p>
        </div>

        <M3TextField
            label="Residential Address"
            placeholder="Full physical address"
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
            fullWidth required
            helperText="Required for emergency services and medication dispatch."
        />

        <div className="p-5 bg-[#F8F9FA] rounded-[24px] border border-[#F1F3F4] space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-[#4285F4]">
                <div className="w-2 h-2 rounded-full bg-current" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Data Protection Protocol</span>
            </div>
            <p className="text-[12px] text-[#5F6368] leading-relaxed">
                By completing your registration, you acknowledge that your medical records will be managed under **HIPAA/GDPR-equivalent** standards. Your identity is verified through encrypted clinical shards to ensure total privacy.
            </p>
            
            <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-xl hover:bg-white transition-all border border-transparent hover:border-[#DADCE0]">
                    <div className="relative flex items-center pt-0.5">
                        <input 
                            type="checkbox" 
                            checked={formData.consented}
                            onChange={e => setFormData({...formData, consented: e.target.checked})}
                            className="w-5 h-5 rounded-[6px] border-[#DADCE0] text-[#4285F4] focus:ring-[#4285F4] transition-all cursor-pointer"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[#202124] group-hover:text-[#4285F4] transition-colors">I accept the Institutional Terms</span>
                        <span className="text-[11px] text-[#5F6368]">Consent is required to initialize your clinical file.</span>
                    </div>
                </label>
            </div>
        </div>
    </div>
  );
}
