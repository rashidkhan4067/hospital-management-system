import React from 'react';
import { Check } from 'lucide-react';
import M3TextField from '@/components/primitives/M3TextField';

export default function IdentityStep({ formData, setFormData, isGoogleUser }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
        <div className="mb-6">
            <h1 className="text-[26px] font-semibold text-[#202124] mb-1 tracking-tight">Identity Details</h1>
            <p className="text-[14px] text-[#5F6368] leading-relaxed opacity-80">Confirm your basic information to initialize your clinical records.</p>
        </div>

        <M3TextField
            label="Full Name"
            value={formData.fullName}
            onChange={e => setFormData({...formData, fullName: e.target.value})}
            fullWidth
            required
            helperText="As it appears on your national document"
        />

        <div className="relative">
            <M3TextField
                label="Email Address"
                value={formData.email}
                disabled
                fullWidth
                validation="success"
            />
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full sm:w-[120px] relative">
                <label className="absolute -top-2.5 left-3 px-1.5 text-[11px] font-bold text-[#4285F4] bg-white z-20">Code</label>
                <select 
                    className="w-full h-[56px] border border-[#DADCE0] rounded-xl px-4 bg-[#F8F9FA] focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] outline-none text-[14px] font-medium appearance-none cursor-pointer"
                    value={formData.countryCode}
                    onChange={e => setFormData({...formData, countryCode: e.target.value})}
                >
                    <option>+1</option><option>+92</option><option>+44</option><option>+971</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">▼</div>
            </div>
            <div className="flex-grow">
                <M3TextField
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    fullWidth required
                />
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <M3TextField
                label="Birth Date"
                type="date"
                value={formData.dob}
                onChange={e => setFormData({...formData, dob: e.target.value})}
                fullWidth required
            />
            <div className="relative">
                <label className="absolute -top-2.5 left-3 px-1.5 text-[11px] font-bold text-[#4285F4] bg-white z-20">Gender</label>
                <select 
                    className="w-full h-[56px] border border-[#DADCE0] rounded-xl px-4 bg-white focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] outline-none text-[14px] font-medium appearance-none cursor-pointer"
                    value={formData.gender}
                    onChange={e => setFormData({...formData, gender: e.target.value})}
                    required
                >
                    <option value="">Select Gender</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">▼</div>
            </div>
        </div>
    </div>
  );
}
