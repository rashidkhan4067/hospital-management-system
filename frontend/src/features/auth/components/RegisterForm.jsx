import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerService } from '@/features/auth/api/authService';
import { useForm } from '@/core/hooks';
import { Input, Button } from '@/components/primitives';

/**
 * 📝 RegisterForm - Google 'Identity Enrollment' Port
 * Implements the Material 3 low-friction authentication experience.
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
      console.error('Registration error:', err);
      const errorData = err.response?.data;
      let errorMsg = 'Registration failed. Try again.';
      if (typeof errorData === 'object') {
        errorMsg = errorData.detail || Object.values(errorData)[0] || errorMsg;
      }
      handleLocalError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                  label="First name"
                  type="text" 
                  name="first_name" 
                  autoComplete="given-name"
                  value={formData.first_name} 
                  onChange={handleChange} 
                  required 
              />
              <Input 
                  label="Last name"
                  type="text" 
                  name="last_name" 
                  autoComplete="family-name"
                  value={formData.last_name} 
                  onChange={handleChange} 
                  required 
              />
          </div>

          <div className="space-y-1">
            <Input 
                label="Username or Email"
                type="email" 
                name="email" 
                autoComplete="email"
                value={formData.email} 
                onChange={handleChange} 
                required 
            />
            <p className="text-[12px] text-[#5F6368] leading-normal px-1">
              You'll use this email to sign in to your Al Shifa account
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                    label="Password"
                    type="password" 
                    name="password" 
                    autoComplete="new-password"
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
                <Input 
                    label="Confirm"
                    type="password" 
                    name="confirm_password" 
                    autoComplete="new-password"
                    value={formData.confirm_password} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <p className="text-[12px] text-[#5F6368] leading-normal px-1">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
          </div>
      </div>


      <div className="flex items-center justify-between mt-12 w-full">
          <Link 
            to="/login" 
            className="text-sm font-semibold text-[#1a73e8] hover:bg-blue-50/50 px-3 py-2 rounded transition-colors"
          >
            Sign in instead
          </Link>

          <Button 
            type="submit" 
            disabled={loading}
            className="px-8 h-10 rounded-full text-sm font-semibold bg-[#1a73e8] hover:bg-[#1557b0] shadow-none min-w-[100px]"
          >
            {loading ? "Creating..." : "Next"}
          </Button>
      </div>

    </form>
  );
}

