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
  const { formData, error, setError, loading, setLoading, handleChange } = useForm({
    first_name: '',
    last_name: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLocalError('');
    if (formData.password !== formData.confirm_password) {
      handleLocalError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await registerService(formData);
      navigate('/verify-email');
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Registration failed.';
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

      <div className="space-y-1">
        <M3TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          helperText="You'll use this email to sign in to your Shifaa account"
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

      <div className="flex items-center justify-between mt-10 w-full">
        <Link
          to="/login"
          className="text-[14px] font-semibold text-[#4285F4] hover:bg-blue-50/50 px-3 py-2 rounded-full transition-colors"
        >
          Sign in instead
        </Link>

        <Button
          type="submit"
          disabled={loading}
          className="px-8 h-[40px] rounded-full text-[14px] font-semibold bg-[#4285F4] hover:bg-[#3367D6] text-white shadow-none min-w-[100px]"
        >
          {loading ? "..." : "Next"}
        </Button>
      </div>
    </form>
  );
}

