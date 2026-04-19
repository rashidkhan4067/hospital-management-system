import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerService } from '@/features/auth/api/authService';
import { useForm } from '@/core/hooks';
import { Button } from '@/components/primitives';
import M3TextField from '@/components/primitives/M3TextField';

/**
 * 📝 RegisterForm - Google-Style Enrollment Port (M3)
 */
export default function RegisterForm({ setError: setParentError }) {
  const { formData, setFormData, error, setError, loading, setLoading, handleChange } = useForm({
    first_name: '',
    last_name: '',
    cnic: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'patient'
  });
  const navigate = useNavigate();

  const handleLocalError = (err) => {
    setError(err);
    if (setParentError) setParentError(err);
  };

  /**
   * 🛡️ CNIC Input Masking Logic
   * Formats raw digits into the official XXXXX-XXXXXXX-X standard.
   */
  const handleCNICChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '').slice(0, 13);
    let formatted = rawValue;
    
    if (rawValue.length > 5) {
      formatted = `${rawValue.slice(0, 5)}-${rawValue.slice(5, 12)}`;
      if (rawValue.length > 12) {
        formatted += `-${rawValue.slice(12, 13)}`;
      }
    }
    
    setFormData(prev => ({ ...prev, cnic: formatted }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLocalError('');
    
    // 🧪 Frontend Guard Shards
    if (formData.cnic.replace(/\D/g, '').length !== 13) {
      handleLocalError('CNIC must be exactly 13 digits');
      return;
    }
    
    if (formData.password !== formData.confirm_password) {
      handleLocalError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await registerService(formData);
      // 🚀 UX Enhancement: Redirect to login with pre-filled Identity
      navigate('/login', { 
        state: { 
          fromRegistration: true,
          cnic: formData.cnic,
          email: formData.email
        } 
      });
    } catch (err) {
      const errorMsg = err.response?.data?.detail 
        || Object.values(err.response?.data || {})[0] 
        || 'Registration failed.';
      handleLocalError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <M3TextField
          label="First name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <M3TextField
          label="Last name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-4">
        {/* 🛡️ Identity Shard: CNIC */}
        <M3TextField
          label="National ID (CNIC)"
          name="cnic"
          value={formData.cnic}
          onChange={handleCNICChange}
          placeholder="XXXXX-XXXXXXX-X"
          required
          fullWidth
          helperText="13-digit identity card number"
        />

        <M3TextField
          label="Email address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          helperText="Used for clinical notifications"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <M3TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <M3TextField
          label="Confirm"
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />
      </div>
      
      <p className="text-[12px] text-[#5F6368] px-1 -mt-2">
        Use 8 or more characters with a mix of letters, numbers & symbols
      </p>

      <div className="flex items-center justify-between mt-10 w-full px-1">
        <Link
          to="/login"
          className="text-[14px] font-semibold text-[#4285F4] hover:bg-blue-50/50 px-3 py-1.5 rounded-full transition-colors"
        >
          Sign in instead
        </Link>

        <Button
          type="submit"
          disabled={loading}
          className="px-8 h-[40px] rounded-full text-[14px] font-semibold bg-[#4285F4] hover:bg-[#3367D6] text-white shadow-sm min-w-[120px]"
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
}

