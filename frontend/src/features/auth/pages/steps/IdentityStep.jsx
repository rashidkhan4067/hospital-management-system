import React from 'react';
import { Check } from 'lucide-react';
import M3TextField from '@/components/primitives/M3TextField';

export default function IdentityStep({ formData, setFormData, isGoogleUser }) {
  return (
    <div className="space-y-5 animate-in slide-in-from-right-4 duration-500">
        <div className="mb-8">
            <h1 className="text-[24px] font-normal text-[#202124] mb-2 leading-tight">Identity Details</h1>
            <p className="text-[14px] text-[#5f6368]">Confirm your basic information to initialize your health file.</p>
        </div>

        <M3TextField
            label="Full Name"
            value={formData.fullName}
            onChange={e => setFormData({...formData, fullName: e.target.value})}
            fullWidth
            required
        />

        <div className="relative">
            <M3TextField
                label="Email Address"
                value={formData.email}
                disabled
                fullWidth
                className="bg-[#f8f9fa] border-[#e8eaed]"
            />
            <Check size={16} className="absolute right-4 top-[60%] -translate-y-1/2 text-[#4285F4]" />
        </div>

        <div className="flex gap-3">
            <div className="w-[100px] relative">
                <label className="absolute -top-2 left-2 px-1 text-[11px] font-medium text-[#4285F4] bg-white z-10">Code</label>
                <select 
                    className="w-full h-[56px] border border-[#DADCE0] rounded-xl px-4 pt-1 bg-white focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] outline-none"
                    value={formData.countryCode}
                    onChange={e => setFormData({...formData, countryCode: e.target.value})}
                >
                    <option>+1</option><option>+92</option><option>+44</option><option>+971</option>
                </select>
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

        <div className="flex gap-4">
            <M3TextField
                label="Birth Date"
                type="date"
                value={formData.dob}
                onChange={e => setFormData({...formData, dob: e.target.value})}
                fullWidth required
            />
            <div className="flex-grow relative">
                <label className="absolute -top-2 left-2 px-1 text-[11px] font-medium text-[#4285F4] bg-white z-10">Gender</label>
                <select 
                    className="w-full h-[56px] border border-[#DADCE0] rounded-xl px-4 pt-1 bg-white focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] outline-none"
                    value={formData.gender}
                    onChange={e => setFormData({...formData, gender: e.target.value})}
                    required
                >
                    <option value="">Select</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                </select>
            </div>
        </div>
    </div>
  );
}
