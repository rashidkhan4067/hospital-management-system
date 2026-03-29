import { useState } from 'react';

/**
 * Custom hook for handling generic form logic
 */
export const useForm = (initialValues = {}) => {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setFormData(initialValues);

  return {
    formData,
    setFormData,
    error,
    setError,
    loading,
    setLoading,
    handleChange,
    resetForm
  };
};

export default useForm;
