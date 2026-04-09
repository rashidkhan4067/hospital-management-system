import React from 'react';
import MaterialDialog from '@/components/primitives/MaterialDialog';
import M3TextField from '@/components/primitives/M3TextField';

export default function AddAppointmentModal({ isOpen, onClose }) {
  return (
    <MaterialDialog 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Quick Appointment"
    >
      <div className="flex flex-col gap-8 py-4">
        <M3TextField 
          label="Patient Name" 
          placeholder="e.g. Michael Chen" 
          helperText="Search by name or MRN" 
        />
        
        <div className="grid grid-cols-2 gap-6">
          <M3TextField label="Date" type="date" />
          <M3TextField label="Time Slot" type="time" />
        </div>

        <M3TextField 
          label="Clinical Reason" 
          placeholder="Consultation, Follow-up, etc." 
        />
      </div>
    </MaterialDialog>
  );
}
