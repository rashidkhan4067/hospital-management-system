import { useState, useCallback } from 'react';
import { useUI } from '@/core/ui/UIContext';
import UserService from '@/features/identity/api/userService';

/**
 * 🧛 User Creation Logic
 * Handles adding new users (Patients, Doctors, Staff) to the system.
 */
export const useAddUserForm = (onSuccess, initialRole = 'patient') => {
  const { addNotification } = useUI();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    role: initialRole,
    password: '',
    confirm_password: ''
  });

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      email: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      role: initialRole,
      password: '',
      confirm_password: ''
    });
  }, [initialRole]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (formData.password !== formData.confirm_password) {
        addNotification('Error', 'Passwords do not match.', 'warning');
        return;
    }

    setIsSubmitting(true);
    try {
        await UserService.create(formData);
        addNotification('Success', `User ${formData.first_name} added successfully.`, 'success');
        resetForm();
        if (onSuccess) onSuccess();
    } catch (err) {
        const message = err.response?.data?.detail || "Could not save user.";
        addNotification('Error', message, 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  return {
    formData,
    updateField,
    handleSubmit,
    isSubmitting,
    resetForm
  };
};
