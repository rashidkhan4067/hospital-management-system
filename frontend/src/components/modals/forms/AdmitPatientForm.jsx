import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Stethoscope, 
  ShieldCheck, 
  CheckCircle2,
  ChevronRight,
  Info,
  Building2,
  Bed,
  AlertCircle,
  CreditCard,
  Activity,
  UserCheck
} from 'lucide-react';
import api from '@/core/api/apiClient';
import M3TextField from '@/components/primitives/M3TextField';
import M3Select from '@/components/primitives/M3Select';
import ClinicalLookup from '@/components/primitives/ClinicalLookup';

const ADMISSION_TYPES = [
  { value: 'routine', label: 'Routine Admission' },
  { value: 'emergency', label: 'Emergency (ER) Intake' },
  { value: 'planned', label: 'Planned Surgery' },
  { value: 'transfer', label: 'Clinical Transfer' },
  { value: 'observation', label: 'Observation Unit' }
];

const SEVERITY_LEVELS = [
  { value: 'normal', label: 'Normal Priority' },
  { value: 'urgent', label: 'Urgent Priority' },
  { value: 'emergency', label: 'Emergency (Immediate)' }
];

const INSURANCE_MODES = [
  { value: 'self', label: 'Self-Funded (Cash)' },
  { value: 'insurance', label: 'Private Insurance' },
  { value: 'corporate', label: 'Corporate Panel' }
];

export default function AdmitPatientForm({ onFormStateChange, initialPatient, formErrors = {} }) {
  const [formData, setFormData] = useState({
    patient: initialPatient?.id || null,
    admission_date: new Date().toISOString().slice(0, 16),
    admission_type: 'routine',
    department: '',
    ward: '',
    room: '',
    bed: '',
    primary_diagnosis: '',
    admitted_by: '',
    severity: 'normal',
    insurance_mode: 'self'
  });

  const [selectedPatient, setSelectedPatient] = useState(initialPatient || null);
  const [departments, setDepartments] = useState([]);
  const [wards, setWards] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (initialPatient) {
      setSelectedPatient(initialPatient);
      setFormData(prev => ({ ...prev, patient: initialPatient.id }));
    }
    api.get('system/departments/').then(res => setDepartments(res.data.results || res.data || []));
    api.get('doctors/').then(res => setDoctors(res.data.results || res.data || []));
  }, [initialPatient]);

  useEffect(() => {
    if (formData.department) {
      api.get(`wards/?department=${formData.department}`).then(res => setWards(res.data.results || res.data || []));
    } else { setWards([]); updateField('ward', ''); updateField('room', ''); updateField('bed', ''); }
  }, [formData.department]);

  useEffect(() => {
    if (formData.ward) {
      api.get(`wards/rooms/?ward=${formData.ward}&available=true`).then(res => setRooms(res.data.results || res.data || []));
    } else { setRooms([]); updateField('room', ''); updateField('bed', ''); }
  }, [formData.ward]);

  useEffect(() => {
    if (formData.room) {
      api.get(`wards/beds/?room=${formData.room}&status=available`).then(res => setBeds(res.data.results || res.data || []));
    } else { setBeds([]); updateField('bed', ''); }
  }, [formData.room]);

  const onChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const updateField = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setFormData(prev => ({ ...prev, patient: patient.id }));
  };

  const isValid = formData.patient && formData.department && formData.ward && 
                  formData.room && formData.bed && formData.primary_diagnosis && formData.admitted_by;

  useEffect(() => {
    if (onFormStateChange) {
      onFormStateChange({
        data: formData,
        isValid,
        title: "Clinical Admission",
        subtitle: "Admit patient to hospital (IPD)",
        submitLabel: "Admit Patient",
        successMessage: "Patient admitted successfully"
      });
    }
  }, [formData, isValid]);

  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    return Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970);
  };

  return (
    <div className="flex flex-col gap-6 py-2 pb-20 font-sans max-h-[78vh] overflow-y-auto px-4 custom-scrollbar bg-white">
      
      {/* SECTOR 1: Patient Selection & Identity */}
      <div className="bg-[#F9FAFB] rounded-[28px] p-6 border border-gray-100/50 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-blue-600/5 flex items-center justify-center text-blue-600 border border-blue-600/10">
             <User size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[17px] font-black text-gray-900 tracking-tight">Patient Identity</h2>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Demographic Verification Hub</p>
          </div>
        </div>
        
        <ClinicalLookup 
          label="Identify Patient Profile" 
          icon={Search}
          endpoint="patients/profiles/" 
          onSelect={handlePatientSelect} 
          placeholder="Search by CNIC / MRN / Phone" 
          error={formErrors.patient}
          required 
        />

        {selectedPatient && (
          <div className="mt-6 p-6 rounded-[24px] bg-white border border-blue-100/30 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-500 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]">
             <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-[22px] bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-xl shadow-blue-100/50 ring-8 ring-blue-50/50">
                   {selectedPatient.full_name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col gap-1.5">
                   <h3 className="text-xl font-black text-gray-900 leading-none tracking-tight">{selectedPatient.full_name}</h3>
                   <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[9px] font-black rounded-full uppercase tracking-widest">{selectedPatient.mrn}</span>
                        <div className="flex items-center gap-1.5 text-[11px] text-blue-600 font-bold">
                           <ShieldCheck size={14} strokeWidth={2.5} />
                           <span>Registry Verified</span>
                        </div>
                   </div>
                </div>
             </div>
             
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-5 border-t border-gray-50">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-60">Bio Age / Gender</span>
                   <span className="text-[15px] font-bold text-gray-800">{calculateAge(selectedPatient.date_of_birth)}Y / {selectedPatient.gender}</span>
                </div>
                <div className="flex flex-col gap-1 pl-5 border-l border-gray-100">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-60">Clinical Status</span>
                   <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${selectedPatient.is_admitted ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)] animate-pulse'}`} />
                      <span className={`text-[11px] font-black uppercase ${selectedPatient.is_admitted ? 'text-red-500' : 'text-green-500'}`}>
                         {selectedPatient.is_admitted ? 'Patient Occupied' : 'Intake Ready'}
                      </span>
                   </div>
                </div>
                <div className="flex flex-col gap-1 pl-5 border-l border-gray-100">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-60">Identity Hub</span>
                   <span className="text-[14px] font-bold text-gray-600 truncate">{selectedPatient.cnic || 'NO_SHARD'}</span>
                </div>
                <div className="flex flex-col gap-1 pl-5 border-l border-gray-100">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-60">Communication</span>
                   <span className="text-[14px] font-bold text-gray-600">{selectedPatient.phone || 'N/A'}</span>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* SECTOR 2: Admission Logistics & Resource Allocation */}
      <div className="bg-[#F9FAFB] rounded-[28px] p-6 border border-gray-100/50 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600/5 flex items-center justify-center text-indigo-600 border border-indigo-600/10">
             <Building2 size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[17px] font-black text-gray-900 tracking-tight">Admission Matrix</h2>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Logistics & Physical Resource Host</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
           <M3TextField 
             label="Clinical Entry Timestamp" 
             type="datetime-local" 
             name="admission_date" 
             icon={Calendar}
             onChange={onChange} 
             value={formData.admission_date || ''} 
             validation={formErrors.admission_date ? 'error' : ''}
             errorText={formErrors.admission_date}
             required 
           />
           
           <M3Select 
             label="Intake Protocol"
             icon={Activity}
             options={ADMISSION_TYPES}
             value={formData.admission_type || ''}
             onChange={(e) => updateField('admission_type', e.target.value)}
             placeholder="Select Protocol"
             error={formErrors.admission_type}
             required
           />

           <M3Select 
              label="Hosting Department"
              icon={MapPin}
              options={departments.map(d => ({ value: d.id, label: d.name }))}
              value={formData.department || ''}
              onChange={(e) => updateField('department', e.target.value)}
              placeholder="Select Unit"
              error={formErrors.department}
              required
            />

            <M3Select 
              label="Assigned Ward Node"
              icon={Building2}
              options={wards.map(w => ({ value: w.id, label: `${w.name} (Floor ${w.floor})` }))}
              value={formData.ward || ''}
              onChange={(e) => updateField('ward', e.target.value)}
              placeholder={!formData.department ? "Select Dept to Unlock" : "Assign Ward"}
              disabled={!formData.department}
              error={formErrors.ward}
              required
           />
           
            <M3Select 
                label="Physical Room"
                icon={Bed}
                options={rooms.map(r => ({ value: r.id, label: `Room ${r.room_number} (${r.room_type})` }))}
                value={formData.room || ''}
                onChange={(e) => updateField('room', e.target.value)}
                placeholder={!formData.ward ? "Select Ward to Unlock" : "Assign Room"}
                disabled={!formData.ward}
                error={formErrors.room}
                required
            />
            
            <M3Select 
                label="Dedicated Bed"
                icon={CheckCircle2}
                options={beds.map(b => ({ value: b.id, label: `Bed ${b.bed_number} (${b.bed_type})` }))}
                value={formData.bed || ''}
                onChange={(e) => updateField('bed', e.target.value)}
                placeholder={!formData.room ? "Select Room to Unlock" : "Set Bed"}
                disabled={!formData.room}
                error={formErrors.bed}
                required
            />
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100 space-y-7">
            {/* 🩺 SECTION: Medical Information */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600/5 flex items-center justify-center text-emerald-600 border border-emerald-600/10">
                 <Activity size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-[17px] font-black text-gray-900 tracking-tight">Medical Information</h2>
            </div>

            <div className="flex flex-col gap-6">
                <M3TextField 
                  label="Reason for Admission" 
                  placeholder="Primary clinical driver for IPD intake..." 
                  name="primary_diagnosis" 
                  onChange={onChange} 
                  value={formData.primary_diagnosis || ''} 
                  validation={formErrors.primary_diagnosis ? 'error' : ''}
                  errorText={formErrors.primary_diagnosis}
                  required 
                  fullWidth 
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <M3TextField 
                      label="Provisional Diagnosis (Optional)" 
                      placeholder="Identified clinical code or state..." 
                      name="diagnosis_detail" 
                      onChange={onChange} 
                      value={formData.diagnosis_detail || ''} 
                      fullWidth 
                    />
                    <M3TextField 
                      label="Clinical Notes (Optional)" 
                      placeholder="Supplementary intake observations..." 
                      name="clinical_notes" 
                      onChange={onChange} 
                      value={formData.clinical_notes || ''} 
                      fullWidth 
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 pt-4 border-t border-gray-50/50">
                <M3Select 
                  label="Admitting Consultant"
                  icon={Stethoscope}
                  options={doctors.map(doc => ({ 
                      value: doc.id, 
                      label: `Dr. ${doc.full_name || doc.user?.full_name || 'Staff'}` 
                  }))}
                  value={formData.admitted_by || ''}
                  onChange={(e) => updateField('admitted_by', e.target.value)}
                  placeholder="Assign Physician"
                  error={formErrors.admitted_by}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <M3Select 
                      label="Financial Mode"
                      icon={CreditCard}
                      options={INSURANCE_MODES}
                      value={formData.insurance_mode || 'self'}
                      onChange={(e) => updateField('insurance_mode', e.target.value)}
                      placeholder="Select Mode"
                      error={formErrors.insurance_mode}
                      required
                  />
                  <M3Select 
                      label="Triage Priority"
                      icon={AlertCircle}
                      options={SEVERITY_LEVELS}
                      value={formData.severity || 'normal'}
                      onChange={(e) => updateField('severity', e.target.value)}
                      placeholder="Priority"
                      error={formErrors.severity}
                      required
                  />
                </div>
            </div>
        </div>

        {/* Dynamic Validation Guidance */}
        {!isValid && (
           <div className="mt-8 flex items-center justify-between gap-4 p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/10 text-amber-600 animate-in fade-in duration-500">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center"><AlertCircle size={16} /></div>
                 <div className="flex flex-col">
                    <span className="text-[12px] font-black uppercase tracking-tight">Incomplete Admission Node</span>
                    <span className="text-[10px] font-bold opacity-70">Mandatory clinical shards are missing. Please verify Dept, Ward, and Physician assignment.</span>
                 </div>
              </div>
              <Info size={20} className="hidden md:block opacity-20" />
           </div>
        )}
      </div>
    </div>
  );
}
