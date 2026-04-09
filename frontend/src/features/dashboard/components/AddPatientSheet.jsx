import React, { useState, useEffect } from 'react';
import MaterialSideSheet from '@/components/primitives/MaterialSideSheet';
import FullScreenDialog from '@/components/primitives/FullScreenDialog';
import M3TextField from '@/components/primitives/M3TextField';

export default function AddPatientSheet({ isOpen, onClose, title = "Register New Patient" }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDirty, setIsDirty] = useState(false);
  const [activeTriage, setActiveTriage] = useState('Standard');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const FormContent = (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-6">
        <span className="text-[10px] font-bold text-[#1a73e8] uppercase tracking-[0.2em]">Personal Information</span>
        <div className="flex flex-col gap-6" onChange={() => setIsDirty(true)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <M3TextField label="First Name" placeholder="John" />
            <M3TextField label="Last Name" placeholder="Doe" />
          </div>
          <M3TextField label="Contact Phone" type="tel" placeholder="+1 (555) 000-0000" />
          <M3TextField label="Email Address" type="email" placeholder="john.doe@hospital.com" />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <span className="text-[10px] font-bold text-[#1a73e8] uppercase tracking-[0.2em]">Clinical Admission</span>
        <div className="flex flex-col gap-6">
          <M3TextField label="Department / Wing" placeholder="Search departments..." />
          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-medium text-[#79747E] ml-1">Triage Priority</label>
            <div className="flex flex-col md:flex-row gap-2">
              {['Standard', 'Urgent', 'Life Threat'].map((p) => (
                <button 
                  key={p} 
                  onClick={() => {
                      setActiveTriage(p);
                      setIsDirty(true);
                  }}
                  className={`flex-1 min-h-[48px] px-4 text-[11px] font-bold uppercase border rounded-xl transition-all
                    ${activeTriage === p 
                        ? 'bg-[#E8F0FE] border-[#1a73e8] text-[#1967D2]' 
                        : 'border-[#79747E] text-[#5F6368] hover:bg-slate-50'}
                  `}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  if (isMobile) {
    return (
      <FullScreenDialog 
        isOpen={isOpen} 
        onClose={onClose} 
        title={title} 
        onSave={() => onClose()} 
        isDirty={isDirty}
      >
        {FormContent}
      </FullScreenDialog>
    );
  }

  return (
    <MaterialSideSheet 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      onSave={() => onClose()}
    >
      {FormContent}
    </MaterialSideSheet>
  );
}
