import { useState, useCallback, useMemo } from 'react';
import { useAdminDoctors } from '@/features/doctors/hooks/useDoctors';
import { useAdminUsers } from '@/features/identity/hooks/useUsers';
import AppointmentService from '@/features/appointments/api/appointmentService';
import { useUI } from '@/core/ui/UIContext';

/**
 * 🏥 Logic for Appointment Booking
 * Handles state, validation, and saving appointments.
 */
export const useAppointmentForm = (onSuccess, initialData = {}) => {
  const { addNotification } = useUI();
  const { doctors, loading: doctorsLoading } = useAdminDoctors();
  const { users, loading: usersLoading } = useAdminUsers();

  // Filter for patients
  const patients = useMemo(() => 
    users.filter(u => u.role === 'patient'), 
    [users]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: initialData.patient_id || '',
    doctor_id: initialData.doctor_id || '',
    appointment_date: initialData.appointment_date || new Date().toISOString().split('T')[0],
    start_time: initialData.start_time || '09:00',
    notes: initialData.notes || '',
    ...initialData
  });

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      patient_id: '',
      doctor_id: '',
      appointment_date: new Date().toISOString().split('T')[0],
      start_time: '09:00',
      notes: ''
    });
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.patient_id || !formData.doctor_id) {
      addNotification('Error', 'Please select both a patient and a doctor.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      await AppointmentService.create(formData);
      addNotification('Success', 'Appointment booked successfully.', 'success');
      resetForm();
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Could not save appointment.';
      addNotification('Error', errorMsg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPatient = useMemo(() => 
    patients.find(p => p.id == formData.patient_id), 
    [patients, formData.patient_id]
  );
  
  const selectedDoctor = useMemo(() => 
    doctors.find(d => d.id == formData.doctor_id), 
    [doctors, formData.doctor_id]
  );

  return {
    formData,
    updateField,
    handleSubmit,
    isSubmitting,
    patients,
    doctors,
    isLoading: doctorsLoading || usersLoading,
    selectedPatient,
    selectedDoctor
  };
};
