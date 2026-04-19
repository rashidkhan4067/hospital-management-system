import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '@/core/store/useAuthStore';
import { login as loginService, googleLogin as googleLoginService } from '@/features/auth/api/authService';
import { useForm } from '@/core/hooks';
import { Button } from '@/components/primitives';
import M3TextField from '@/components/primitives/M3TextField';

/**
 * 🔓 Google-Style LoginForm - Shifaa HMS Gateway (M3)
 */
export default function LoginForm({ setError: setParentError, setSuccess }) {
  const { formData, error, setError, loading, setLoading, handleChange, setFormData } = useForm({ 
    identity: '', 
    password: '' 
  });

  const setUser = useAuthStore(state => state.setUser);
  const setToken = useAuthStore(state => state.setToken);
  const navigate = useNavigate();
  const location = React.useRef(window.location); // Reference for static state check
  
  const handleLocalError = (err) => {
    setError(err);
    if (setSuccess) setSuccess(null); // Clear success if an error occurs
    if (setParentError) setParentError(err);
  };

  const handleLocalSuccess = (msg) => {
      if (setSuccess) setSuccess(msg);
      setError(null);
      if (setParentError) setParentError(null);
  };

  // 🛰️ Identity Pre-fill Shard
  React.useEffect(() => {
    const state = window.history.state?.usr; // Reach into history state
    if (state?.fromRegistration && state?.cnic) {
      setFormData(prev => ({ ...prev, identity: state.cnic }));
      handleLocalSuccess('Registration successful! Please verify your clinical email to proceed.');
    }
  }, [setFormData]);

  // 🧪 CNIC Masking Shard
  const applyCnicMask = (val) => {
      // If user is typing an email, do not apply mask
      if (val.includes('@')) return val;
      
      const raw = val.replace(/\D/g, '').substring(0, 13);
      let masked = raw;
      if (raw.length > 5) {
          masked = raw.substring(0, 5) + '-' + raw.substring(5);
      }
      if (raw.length > 12) {
          masked = masked.substring(0, 13) + '-' + raw.substring(12);
      }
      return masked;
  };

  const handleIdentityChange = (e) => {
      const { value } = e.target;
      const maskedValue = applyCnicMask(value);
      setFormData(prev => ({ ...prev, identity: maskedValue }));
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      handleLocalError('');
      try {
        const data = await googleLoginService(tokenResponse.access_token);
        setToken(data.access);
        setUser(data.user);
        navigate('/onboarding');
      } catch (err) {
        const errorMsg = err.response?.data?.detail || 'Authentication stream failed.';
        handleLocalError(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    onError: () => handleLocalError('Google Authentication Interrupted')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    handleLocalError('');

    const { identity, password } = formData;

    if (!identity || !password) {
      handleLocalError('Identity and password required');
      return;
    }

    // 🛡️ Pre-submission Validation Protocol
    const isEmail = identity.includes('@');
    if (!isEmail) {
        const rawDigits = identity.replace(/\D/g, '');
        if (rawDigits.length < 13) {
            handleLocalError('Incomplete Identity: CNIC must contain 13 digits.');
            return;
        }
    }

    setLoading(true);
    try {
      // 🚁 Triple-Mapped Identity Shard (Agnostic Handover)
      const data = await loginService({ 
        identity, 
        username: identity, 
        email: identity.includes('@') ? identity : undefined,
        cnic: !identity.includes('@') ? identity : undefined,
        password 
      });
      setToken(data.access);
      setUser(data.user);
      const redirectMap = { 'admin': '/admin/dashboard', 'doctor': '/doctor/dashboard', 'patient': '/onboarding' };
      navigate(redirectMap[data.user?.role] || '/dashboard');
    } catch (err) {
      // 🧠 Advanced Forensic Shard Extraction
      let errorMsg = 'Identity verification sequence failed.';
      const data = err.response?.data || err;
      
      if (typeof data === 'string') {
        errorMsg = data;
      } else if (data.detail) {
        errorMsg = data.detail;
      } else if (data.non_field_errors) {
        errorMsg = data.non_field_errors[0];
      } else if (typeof data === 'object') {
        // Collect ALL field errors for transparency
        const keys = Object.keys(data);
        if (keys.length > 0) {
          const firstKey = keys[0];
          const fieldLabel = firstKey === 'identity' ? 'National ID/Email' : (firstKey.charAt(0).toUpperCase() + firstKey.slice(1));
          errorMsg = Array.isArray(data[firstKey]) 
            ? `${fieldLabel}: ${data[firstKey][0]}` 
            : `${fieldLabel}: ${data[firstKey]}`;
        }
      }
      
      handleLocalError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-700">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <M3TextField
          id="login-identity"
          label="National ID / Email"
          placeholder="XXXXX-XXXXXXX-X or email"
          type="text"
          name="identity"
          value={formData.identity}
          onChange={handleIdentityChange}
          helperText="Enter 13-digit National ID or clinical email address"
          validation={error ? 'error' : null}
          fullWidth
        />

        <M3TextField
          id="login-password"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          validation={error ? 'error' : null}
          fullWidth
        />

        <div className="mt-2 text-left">
          <Link to="/forgot-password" size="xs" className="text-[14px] font-bold text-[#4285F4] hover:text-[#3367D6] transition-colors">
            Forgot password?
          </Link>
        </div>

        <div className="flex items-center justify-between mt-10 w-full">
            <Link
                to="/register"
                className="text-[14px] font-bold text-[#4285F4] hover:bg-blue-50/50 px-4 py-2 rounded-full transition-all"
            >
                Create account
            </Link>

            <Button
                type="submit"
                disabled={loading}
                className="px-8 h-[40px] rounded-full text-[14px] font-bold bg-[#4285F4] hover:bg-[#3367D6] text-white shadow-none transition-all active:scale-[0.98] min-w-[100px]"
            >
                {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                "Next"
                )}
            </Button>
        </div>
      </form>

      {/* 🏛️ Divider */}
      <div className="relative flex items-center my-6">
        <div className="flex-grow border-t border-[#DADCE0]"></div>
        <span className="flex-shrink mx-4 text-[14px] font-normal text-[#5F6368]">Or</span>
        <div className="flex-grow border-t border-[#DADCE0]"></div>
      </div>

      {/* 🛰️ Google Button */}
      <button
        type="button"
        onClick={() => handleGoogleLogin()}
        disabled={loading}
        className="w-full h-[44px] border border-[#DADCE0] rounded-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 transition-all text-sm font-medium text-[#3c4043] shadow-sm active:scale-[0.98]"
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.12-.84 2.07-1.79 2.7l2.85 2.2c1.67-1.53 2.63-3.79 2.63-6.54z" fill="#4285F4" />
          <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.85-2.2c-.79.53-1.8.84-3.11.84-2.39 0-4.41-1.61-5.13-3.78H.95v2.3C2.43 15.84 5.49 18 9 18z" fill="#34A853" />
          <path d="M3.87 10.68c-.18-.53-.28-1.1-.28-1.68s.1-1.15.28-1.68V5.02H.95C.34 6.22 0 7.57 0 9s.34 2.78.95 3.98l2.92-2.3z" fill="#FBBC05" />
          <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.89 11.43 0 9 0 5.49 0 2.43 2.16.95 5.02l2.92 2.3c.72-2.17 2.74-3.78 5.13-3.78z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

    </div>
  );
}
