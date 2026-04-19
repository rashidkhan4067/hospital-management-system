import React, { useState, useEffect } from 'react';
import M3TextField from '@/components/primitives/M3TextField';
import api from '@/core/api/apiClient';
import { 
  ShieldCheck, Phone, User, Fingerprint, Heart, 
  MapPin, Stethoscope, Users, Languages, Lock, 
  UserPlus2, UserCheck2, ChevronRight, Briefcase, CreditCard, SearchX, UserPlus
} from 'lucide-react';

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const RELATIONSHIPS = ["Spouse", "Parent", "Sibling", "Child", "Guardian", "Friend", "Other"];

export default function AddPatientForm({ onChange, formData, setFormData, formErrors = {} }) {
  // 🏗️ Hydraulic Step Management
  // Synchronize local step with global form shard to prevent re-render resets
  const [step, setStep] = useState(formData.registration_step || 0);
  
  // 🔗 Sink step-state into global form context for high-tier UI orchestration
  useEffect(() => {
    if (formData.registration_step !== step) {
      setFormData(prev => ({ ...prev, registration_step: step }));
    }
  }, [step, setFormData, formData.registration_step]);

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedExisting, setSelectedExisting] = useState(null);

  // 🧪 Professional Verification Protocol (CNIC-First)
  const handleDobChange = (e) => {
      const dob = e.target.value;
      onChange(e); // Propagate to global state

      if (dob) {
          const birthDate = new Date(dob);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              age--;
          }
          
          // Auto-sink the calculated age into global state
          setFormData(prev => ({ ...prev, age: Math.max(0, age) }));
      }
  };

  const handleIdentityVerify = async () => {
    const query = formData.cnic || '';
    if (query.length < 5) return;
    
    setIsSearching(true);
    setHasSearched(false);
    try {
      const { data } = await api.get(`patients/profiles/?search=${query}`);
      const results = data.results || [];
      setSearchResults(results);
      setHasSearched(true);
      if (results.length === 0) {
          setSelectedExisting(null);
      }
    } catch (err) { 
      console.error("Identity verification failure", err); 
    } finally { 
      setIsSearching(false); 
    }
  };

  const handleSelectExisting = (patient) => {
    setSelectedExisting(patient);
  };

  const noResults = hasSearched && searchResults.length === 0;

  if (step === 0) {
    return (
      <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-400 font-sans">
        <div className="text-center space-y-1">
          <div className="w-16 h-16 bg-primary/10 rounded-[24px] flex items-center justify-center text-primary mx-auto mb-4 border border-primary/10">
            <ShieldCheck size={32} strokeWidth={2.5} />
          </div>
          <h3 className="text-[20px] font-black tracking-tight text-text-main italic">Identity Verification</h3>
          <p className="text-[11px] font-bold text-text-sub uppercase tracking-wider">National Identifier Check Required</p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <M3TextField 
                label="National ID / CNIC" 
                placeholder="XXXXX-XXXXXXX-X"
                name="cnic"
                value={formData.cnic || ''}
                onChange={onChange}
                onKeyDown={(e) => e.key === 'Enter' && handleIdentityVerify()}
                validation={formErrors.cnic ? 'error' : null}
                errorText={formErrors.cnic?.[0]}
                fullWidth
                required
              />
            </div>
            <button 
                onClick={handleIdentityVerify}
                disabled={isSearching || (formData.cnic?.length || 0) < 5}
                className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary hover:bg-primary/20 transition-all border border-primary/20 disabled:opacity-30"
            >
                {isSearching ? <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <ChevronRight size={24} />}
            </button>
          </div>

          <div className="min-h-[120px] bg-surface-variant/20 rounded-2xl border border-dashed border-outline-variant p-4 flex flex-col items-center justify-center gap-3">
             {isSearching ? (
               <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                 <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                 Querying Cloud Clusters...
               </div>
             ) : noResults ? (
               <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in">
                  <div className="p-2 bg-success/10 rounded-full text-success"><UserPlus size={20} /></div>
                  <div className="text-center">
                    <p className="text-text-main font-bold text-xs italic">No matching identity discovered.</p>
                    <p className="text-text-sub text-[10px]">Safe to proceed with new clinical node creation.</p>
                  </div>
                  <button onClick={() => setStep(1)} className="mt-2 px-6 py-2 bg-primary text-white rounded-xl text-[11px] font-black hover:shadow-lg transition-all active:scale-95">
                    Initiate Formal Registration
                  </button>
               </div>
             ) : searchResults.length > 0 ? (
                <div className="w-full space-y-2">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest text-center mb-2">Partial ID Collisions Found</p>
                  {searchResults.map(p => (
                    <div key={p.id} onClick={() => handleSelectExisting(p)} className="p-3 bg-surface-bright rounded-xl border border-outline-variant hover:border-primary cursor-pointer transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-bold text-xs italic">{p.full_name?.substring(0,2)}</div>
                        <div>
                          <p className="text-[12px] font-bold text-text-main leading-tight">{p.full_name}</p>
                          <p className="text-[10px] text-text-sub font-medium">{p.mrn} • {p.email || 'No Email'}</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-text-sub group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
             ) : (
               <span className="text-text-sub text-[11px] font-bold opacity-40">Waiting for Institutional ID...</span>
             )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500 font-sans max-h-[65vh] overflow-y-auto custom-scrollbar px-1">
        {/* SECTION 1: Identity */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-1.5 h-4 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
             <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-sub">Core Clinical Node</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <M3TextField label="Full Legal Name" placeholder="First + Last Name" required fullWidth name="fullName" onChange={onChange} value={formData.fullName || ''} validation={formErrors.fullName ? 'error' : null} errorText={formErrors.fullName?.[0]} />
            <M3TextField label="National ID / CNIC" placeholder="XXXXX-XXXXXXX-X" required fullWidth name="cnic" onChange={onChange} value={formData.cnic || ''} validation={formErrors.cnic ? 'error' : null} errorText={formErrors.cnic?.[0]} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <M3TextField label="Date of Birth" type="date" required fullWidth name="date_of_birth" onChange={handleDobChange} value={formData.date_of_birth || ''} validation={formErrors.date_of_birth ? 'error' : null} errorText={formErrors.date_of_birth?.[0]} />
            <M3TextField label="Current Age" type="number" placeholder="Auto-calculated" required fullWidth name="age" value={formData.age || ''} helperText="Calculated from DOB" disabled />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="relative">
               <label className="absolute left-3 -top-2 text-[10px] bg-surface-bright px-1 font-black text-text-sub z-20 uppercase tracking-tighter">Gender <span className="text-error">*</span></label>
               <select name="gender" onChange={onChange} value={formData.gender || ''} required className={`w-full h-[48px] px-4 bg-surface-bright border ${formErrors.gender ? 'border-error' : 'border-outline'} rounded-xl text-text-main outline-none focus:border-2 focus:border-primary text-[14px] font-bold appearance-none transition-all`}>
                 <option value="">Select Gender</option>
                 <option value="male">Male</option>
                 <option value="female">Female</option>
                 <option value="other">Other</option>
               </select>
               {formErrors.gender && <p className="text-[10px] text-error mt-1 ml-3 font-bold">{formErrors.gender[0]}</p>}
            </div>
            <div className="relative">
               <label className="absolute left-3 -top-2 text-[10px] bg-surface-bright px-1 font-black text-text-sub z-20 uppercase tracking-tighter">Blood Group</label>
               <select name="blood_group" onChange={onChange} value={formData.blood_group || ''} className="w-full h-[48px] px-4 bg-surface-bright border border-outline rounded-xl text-text-main outline-none focus:border-2 focus:border-primary text-[14px] font-bold appearance-none transition-all">
                 <option value="">Unknown</option>
                 {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
               </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: Security */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-1.5 h-4 bg-error rounded-full" />
             <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-sub">Communication & Access</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <M3TextField label="Institutional Email" type="email" placeholder="patient@cloud.com" required fullWidth name="email" onChange={onChange} value={formData.email || ''} validation={formErrors.email ? 'error' : null} errorText={formErrors.email?.[0]} />
            <M3TextField label="Cellular Identity" type="tel" placeholder="+92-XXX-XXXXXXX" required fullWidth name="phone_number" onChange={onChange} value={formData.phone_number || ''} validation={formErrors.phone_number ? 'error' : null} errorText={formErrors.phone_number?.[0]} />
          </div>
          <M3TextField label="Security Credential (Password)" type="password" placeholder="Min 8 characters recommended" required fullWidth name="password" onChange={onChange} value={formData.password || ''} validation={formErrors.password ? 'error' : null} errorText={formErrors.password?.[0]} />
        </div>

        {/* SECTION 3: Residential */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-1.5 h-4 bg-secondary rounded-full" />
             <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-sub">Institutional Logistics</span>
          </div>
          <M3TextField label="Residential Destination" placeholder="Full street address for emergency dispatch" required fullWidth name="address" onChange={onChange} value={formData.address || ''} validation={formErrors.address ? 'error' : null} errorText={formErrors.address?.[0]} />
        </div>

        {/* SECTION 4: Consent */}
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between gap-4">
           <div className="flex items-center gap-3">
              <Lock className="text-primary opacity-60" size={18} />
              <div className="flex flex-col">
                 <span className="text-[11px] font-bold text-text-main">Institutional Privacy Protocol</span>
                 <span className="text-[9px] text-text-sub italic font-medium leading-tight">Agreement to clinical HIPAA/GDPR data protection standards.</span>
              </div>
           </div>
           <input type="checkbox" name="privacy_consent" onChange={(e) => setFormData(p => ({ ...p, privacy_consent: e.target.checked }))} className="w-5 h-5 accent-primary rounded-lg cursor-pointer" required />
        </div>
    </div>
  );
}
