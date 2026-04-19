import React, { useState } from 'react';
import M3TextField from '@/components/primitives/M3TextField';
import ClinicalLookup from '@/components/primitives/ClinicalLookup';
import { 
  Beaker, Activity, ShieldCheck, Microscope, 
  User, AlertCircle, Clock, ChevronRight, FileText, Search
} from 'lucide-react';

const DIAGNOSTIC_AREAS = [
    { value: 'hematology', label: 'Hematology Shard', icon: Activity },
    { value: 'biochemistry', label: 'Bio-Chem Cluster', icon: Beaker },
    { value: 'microbiology', label: 'Micro-Biology Node', icon: Microscope },
    { value: 'radiology', label: 'Radiology / Imaging', icon: Search }
];

const LAB_PRIORITIES = [
    { value: 'routine', label: 'Routine Analysis', color: 'bg-primary/10 text-primary' },
    { value: 'urgent', label: 'Urgent (STAT)', color: 'bg-secondary/10 text-secondary' },
    { value: 'critical', label: 'Critical / ALERT', color: 'bg-error/10 text-error' }
];

export default function LabOrderForm({ onChange, setFormData, formData }) {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handlePatientSelect = (p) => {
    setSelectedPatient(p);
    setFormData(prev => ({ ...prev, patient: p.id }));
  };

  return (
    <div className="flex flex-col gap-6 py-2 pb-4 font-sans max-h-[70vh] overflow-y-auto px-1 custom-scrollbar">
      
      {/* 🧪 SECTION 1: Specimen Subject Identity */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-l-4 border-primary pl-2 mb-1">
           <User className="text-primary" size={18} />
           <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-sub">Specimen Subject</span>
        </div>
        
        <ClinicalLookup 
          label="Identify Patient Shard" 
          endpoint="patients/profiles/" 
          onSelect={handlePatientSelect} 
          placeholder="Name, MRN or Identity Key" 
          required 
        />

        {selectedPatient && (
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between animate-in zoom-in-95">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-bright flex items-center justify-center border border-outline-variant text-[11px] font-black">
                   {selectedPatient.full_name?.substring(0,2).toUpperCase()}
                </div>
                <div>
                   <div className="text-[13px] font-bold text-text-main">{selectedPatient.full_name}</div>
                   <div className="text-[9px] text-text-sub font-black uppercase tracking-widest italic">
                      {selectedPatient.mrn} • Institutional Shard Verified
                   </div>
                </div>
             </div>
             <ShieldCheck size={18} className="text-primary opacity-40" />
          </div>
        )}
      </div>

      {/* 🧪 SECTION 2: Diagnostic Parameters */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-secondary pl-2 mb-1">
           <Microscope className="text-secondary" size={18} />
           <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-sub">Diagnostic Parameters</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div className="relative">
             <label className="absolute left-3 -top-2 text-[11px] bg-surface-bright px-1 font-bold text-text-sub z-20">Diagnostic Area</label>
             <select 
               name="category" 
               onChange={onChange} 
               required 
               className="w-full px-4 py-2 bg-surface-bright border border-outline rounded-xl text-[14px] font-medium text-text-main outline-none min-h-[48px] focus:border-secondary transition-all"
             >
               <option value="">Select Cluster</option>
               {DIAGNOSTIC_AREAS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
             </select>
          </div>
          <M3TextField 
            label="Specific Test Protocol" 
            placeholder="e.g. CBC, LFT, Urea" 
            required 
            fullWidth 
            name="test_name" 
            onChange={onChange} 
            value={formData.test_name || ''}
          />
        </div>
        
        <ClinicalLookup 
           label="Ordering Physician" 
           endpoint="doctors/" 
           onSelect={(d) => setFormData(prev => ({ ...prev, doctor: d.id }))} 
           placeholder="Search Consultant Identity" 
           required 
        />
      </div>

      {/* 🧪 SECTION 3: Priority & Temporal Matrix */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-error pl-2 mb-1">
           <AlertCircle className="text-error" size={18} />
           <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-sub">Priority & Temporal Shard</span>
        </div>

        <div className="flex flex-wrap gap-2 py-1">
           {LAB_PRIORITIES.map(p => (
             <button
               key={p.value}
               type="button"
               onClick={() => setFormData(prev => ({ ...prev, priority: p.value }))}
               className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.priority === p.value ? `${p.color} border-current shadow-lg` : 'bg-surface-bright border-outline-variant text-text-sub opacity-60'}`}
             >
                {p.label}
             </button>
           ))}
        </div>

        <M3TextField 
            label="Specimen Collection Window" 
            type="datetime-local" 
            fullWidth 
            name="collection_time" 
            onChange={onChange} 
        />
      </div>

      {/* 🧪 SECTION 4: Clinical Observations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-primary pl-2 mb-1">
           <FileText className="text-primary" size={18} />
           <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-sub">Clinical Indications</span>
        </div>
        <M3TextField 
            label="Subjective Observations" 
            placeholder="Reason for diagnostic request / clinical suspicion" 
            fullWidth 
            name="notes" 
            onChange={onChange} 
            value={formData.notes || ''}
        />
      </div>

      {/* 🧪 SECTION 5: Laboratory Protocol */}
      <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/10 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <Clock className="text-secondary opacity-60" size={18} />
            <div className="flex flex-col">
               <span className="text-[11px] font-bold text-text-main">TAT Fulfillment Policy</span>
               <span className="text-[9px] text-text-sub font-medium italic">Diagnostic turnaround time is contingent on priority shards.</span>
            </div>
         </div>
         <ChevronRight className="text-secondary opacity-30" size={18} />
      </div>

    </div>
  );
}
