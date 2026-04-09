import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ChevronRight } from 'lucide-react';
import { useAuth } from '@/core/auth/AuthContext';
import { login as loginService } from '@/features/auth/api/authService';
import { useForm } from '@/hooks';
import { Input, Button } from '@/components/primitives';

/**
 * 🔓 LoginForm - Google 'Account Identity' Port
 * Implements the Material 3 low-friction authentication experience.
 */
export default function LoginForm({ setError: setParentError }) {
  const { formData, error, setError, loading, setLoading, handleChange } = useForm({ email: '', password: '' });
  const { login: contextLogin } = useAuth();
  const navigate = useNavigate();

  const handleLocalError = (err) => {
    setError(err);
    if (setParentError) setParentError(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    handleLocalError('');
    if (!formData.email || !formData.password) {
      handleLocalError('Mandatory Credentials Missing');
      return;
    }
    
    setLoading(true);
    try {
      const data = await loginService(formData);
      contextLogin(data.access, data.refresh, data.user);
      const nextPath = data.user?.role === 'admin' ? '/admin' : '/dashboard';
      navigate(nextPath);
    } catch (err) {
      console.error('Login error:', err);
      const errorData = err.response?.data;
      let errorMsg = 'Identity Verification Failed';
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
          <Input 
              id="login-email"
              label="Email or phone"
              type="email" 
              name="email" 
              placeholder="Enter your clinical ID"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              autoFocus
              required
          />
          
          <div className="space-y-4">
              <Input 
                  id="login-password"
                  label="Enter your password"
                  type="password" 
                  name="password" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
              />
              <div className="flex justify-start px-1">
                  <Link to="/forgot-password" size="xs" className="text-sm font-bold text-[#1a73e8] hover:underline">
                    Forgot password?
                  </Link>
              </div>
          </div>
      </div>

      <div className="flex flex-col gap-4">
         <p className="text-[13px] text-[#5F6368] leading-relaxed">
            Not your computer? Use Guest mode to sign in privately.
            <button type="button" className="text-[#1a73e8] font-bold ml-1 hover:underline">Learn more</button>
         </p>

         <div className="flex items-center justify-end mt-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="px-8 h-10 rounded-lg text-sm font-bold bg-[#1a73e8] hover:bg-[#1557b0] shadow-none"
            >
              {loading ? (
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    <span>Verifying...</span>
                 </div>
              ) : (
                "Next"
              )}
            </Button>
         </div>
      </div>
    </form>
  );
}
