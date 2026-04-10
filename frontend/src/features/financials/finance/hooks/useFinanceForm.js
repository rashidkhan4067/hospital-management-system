import { useState, useCallback } from 'react';
import { useUI } from '@/core/ui/UIContext';
import { useAdminFinance } from '@/features/financials/finance/hooks/useFinance';

/**
 * 💹 Finance & Payment Logic
 * Manages saving transactions and updating records.
 */
export const useFinanceForm = (onSuccess) => {
  const { addNotification } = useUI();
  const { postTransaction, refresh } = useAdminFinance();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    patient: '', 
    amount: '', 
    method: 'CARD', 
    type: 'INCOME', 
    description: '' 
  });

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({ patient: '', amount: '', method: 'CARD', type: 'INCOME', description: '' });
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.patient || !formData.amount) {
      addNotification('Warning', 'Please select a patient and enter an amount.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      await postTransaction(formData);
      addNotification('Success', 'Transaction saved successfully.', 'success');
      resetForm();
      refresh();
      if (onSuccess) onSuccess();
    } catch (err) {
      addNotification('Error', 'Could not save transaction.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    updateField,
    handleSubmit,
    isSubmitting,
    resetForm
  };
};

