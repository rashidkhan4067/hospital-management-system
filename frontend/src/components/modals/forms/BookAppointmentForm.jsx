import React, { useState, useEffect } from 'react';
import M3TextField from '@/components/primitives/M3TextField';
import ClinicalLookup from '@/components/primitives/ClinicalLookup';
import api from '@/core/api/apiClient';
import { useModalStore } from '@/core/store/useModalStore';
import { 
  Calendar, Clock, User, Stethoscope, AlertCircle, 
  Video, MapPin, Activity, ShieldCheck, ChevronRight,
  Search, UserCheck, UserPlus
} from 'lucide-react';

const APPOINTMENT_TYPES = [
    { value: 'in_person', label: 'In-Person', icon: MapPin },
    { value: 'telehealth', label: 'Virtual', icon: Video },
    { value: 'follow_up', label: 'Follow-up', icon: Calendar }
];

const PRIORITIES = [
    { value: 'routine', label: 'Routine', color: 'bg-primary/10 text-primary' },
    { value: 'urgent', label: 'Urgent', color: 'bg-secondary/10 text-secondary' },
    { value: 'emergency', label: 'Emergency', color: 'bg-error/10 text-error' }
];

export default function BookAppointmentForm({ onChange, setFormData, formData, formErrors = {} }) {
  const [step, setStep] = useState(0); 
  const [selectedPatient, setSelectedPatient] = useState(null);
  const openModal = useModalStore(state => state.openModal);

  // 🛰️ Restore Patient Summary from Global Shard on re-mount
  useEffect(() => {
    if (formData.patient_id && !selectedPatient) {
      const restorePatient = async () => {
        try {
          const { data } = await api.get(`patients/profiles/${formData.patient_id}/`);
          setSelectedPatient(data);
        } catch (err) {
          console.error("Clinical identity restoration failure", err);
        }
      };
      restorePatient();
    }
  }, [formData.patient_id, selectedPatient]);

  const handlePatientSelect = (p) => {
    setSelectedPatient(p);
    setFormData(prev => ({ ...prev, patient_id: p.id }));
  };

  const handleDoctorSelect = (d) => {
    setFormData(prev => ({ ...prev, doctor_id: d.id }));
  };

  if (step === 0) {
    return (
      <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-400 font-sans p-1">
        <div className="text-center space-y-1">
          <div className="w-16 h-16 bg-primary/10 rounded-[24px] flex items-center justify-center text-primary mx-auto mb-4 border border-primary/10">
            <Search size={32} strokeWidth={2.5} />
          </div>
          <h3 className="text-[20px] font-black tracking-tight text-text-main italic">Patient Search</h3>
          <p className="text-[11px] font-bold text-text-sub uppercase tracking-wider">Locate clinical subject identity</p>
        </div>

        <div className="space-y-4">
          <ClinicalLookup 
            label="Live Search (Name, CNIC, Phone)" 
            endpoint="patients/profiles/" 
            onSelect={handlePatientSelect} 
            placeholder="e.g., John Doe or 35202-..." 
            required 
            fullWidth
          />

          <div className="min-h-[140px] bg-surface-variant/20 rounded-2xl border border-dashed border-outline-variant p-4 flex flex-col items-center justify-center gap-3 transition-all relative">
            {selectedPatient ? (
              <div className="w-full animate-in zoom-in-95">
                <div className="p-4 rounded-2xl bg-surface-bright border border-primary/20 shadow-sm flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-black text-sm italic border border-primary/10">
                      {selectedPatient.full_name?.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-[15px] font-black text-text-main leading-tight">{selectedPatient.full_name}</div>
                      <div className="text-[10px] text-text-sub font-bold uppercase tracking-widest mt-0.5">
                        {selectedPatient.mrn || 'NEW_PATIENT'} • {selectedPatient.gender} • {selectedPatient.age || 'N/A'}y
                      </div>
                    </div>
                  </div>
                  <UserCheck className="text-success" size={20} />
                </div>
                
                <button 
                  onClick={() => setStep(1)}
                  className="w-full mt-4 h-12 bg-primary text-white rounded-xl text-[12px] font-black uppercase tracking-[0.1em] hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Proceed to Booking
                  <ChevronRight size={18} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <div className="flex flex-col items-center gap-2 opacity-40">
                  <AlertCircle size={28} />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-text-sub">Identify Clinical Subject</span>
                </div>
                
                <div className="w-full border-t border-outline-variant/30 my-2" />
                
                <div className="space-y-3">
                  <p className="text-[11px] text-text-sub italic">Patient not in our clusters?</p>
                  <button 
                    type="button"
                    onClick={() => openModal('ADD_PATIENT', {
                        onSuccess: (newPatient) => {
                            handlePatientSelect(newPatient);
                            setStep(1);
                        }
                    })}
                    className="flex items-center gap-2 mx-auto text-[12px] font-black text-primary hover:underline uppercase tracking-widest"
                  >
                    <UserPlus size={16} />
                    Open Patient Registration Portal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500 font-sans max-h-[60vh] overflow-y-auto pr-1">
        
        {/* SECTION 1: Selected Subject */}
        <div className="p-4 rounded-3xl bg-primary/5 border border-primary/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-primary border border-primary/10">
                <User size={20} />
             </div>
             <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 leading-none">Selected Patient</span>
                <h4 className="text-[15px] font-black text-text-main leading-tight">{selectedPatient?.full_name}</h4>
             </div>
          </div>
          <button onClick={() => setStep(0)} className="text-[11px] font-black text-primary uppercase tracking-tighter">Change</button>
        </div>

        {/* SECTION 2: Practitioner & Type */}
        <div className="space-y-4">
          <ClinicalLookup 
            label="Lead Practitioner" 
            endpoint="doctors/" 
            onSelect={handleDoctorSelect} 
            placeholder="Search by specialty or surname" 
            required 
            fullWidth
            validation={formErrors.doctor_id ? 'error' : null}
            errorText={formErrors.doctor_id?.[0]}
          />

          <div className="grid grid-cols-3 gap-2">
             {APPOINTMENT_TYPES.map(type => (
               <button
                 key={type.value}
                 type="button"
                 onClick={() => setFormData(p => ({ ...p, appointment_type: type.value }))}
                 className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${formData.appointment_type === type.value ? 'bg-primary/10 border-primary text-primary shadow-sm' : 'bg-surface-bright border-outline-variant text-text-sub hover:border-primary/40'}`}
               >
                  <type.icon size={18} strokeWidth={2.5} />
                  <span className="text-[8px] font-black uppercase tracking-widest text-center leading-tight">{type.label}</span>
               </button>
             ))}
          </div>
        </div>

        {/* SECTION 3: Time & Date */}
        <div className="grid grid-cols-2 gap-4">
          <M3TextField 
             label="Booking Date" 
             type="date" 
             required 
             fullWidth 
             name="appointment_date" 
             onChange={onChange} 
             value={formData.appointment_date || ''}
             validation={formErrors.appointment_date ? 'error' : null}
             errorText={formErrors.appointment_date?.[0]}
          />
          <M3TextField 
             label="Start Time" 
             type="time" 
             required 
             fullWidth 
             name="start_time" 
             onChange={onChange} 
             value={formData.start_time || ''}
             validation={formErrors.start_time ? 'error' : null}
             errorText={formErrors.start_time?.[0]}
          />
        </div>

        {/* SECTION 4: Triage */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
             {PRIORITIES.map(p => (
               <button
                 key={p.value}
                 type="button"
                 onClick={() => setFormData(prev => ({ ...prev, priority: p.value }))}
                 className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${formData.priority === p.value ? `${p.color} border-current ring-2 ring-current/10 shadow-sm` : 'bg-surface-bright border-outline-variant text-text-sub opacity-50'}`}
               >
                  {p.label}
               </button>
             ))}
          </div>

          <M3TextField 
              label="Chief Complaint" 
              placeholder="Clinical reason for visit..." 
              fullWidth 
              name="notes" 
              onChange={onChange} 
              value={formData.notes || ''}
          />
        </div>

        {/* SECTION 5: Protocols */}
        <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/10 flex items-center gap-3">
            <ShieldCheck className="text-secondary" size={20} />
            <div className="flex flex-col">
                <span className="text-[11px] font-extrabold text-text-main uppercase tracking-tight italic">Global Clinical Protocol</span>
                <span className="text-[9px] text-text-sub font-medium opacity-70">Appointment conflicts are synchronized in real-time.</span>
            </div>
        </div>
    </div>
  );
}
