import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Mail, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/core/store/useAuthStore';
import { login as loginService, googleLogin as googleLoginService, sendMagicLink } from '@/features/auth/api/authService';

import { useForm } from '@/core/hooks';
import { Input, Button } from '@/components/primitives';

/**
 * 🔓 LoginForm - Google 'Account Identity' Port (V7.0 - Federated)
 * Implements standard login, Google Auth, and Magic Link discovery.
 */
export default function LoginForm({ setError: setParentError }) {
  const { formData, error, setError, loading, setLoading, handleChange } = useForm({ email: '', password: '' });
  const [isMagicLinkMode, setIsMagicLinkMode] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  
  const setUser = useAuthStore(state => state.setUser);
  const setToken = useAuthStore(state => state.setToken);
  const navigate = useNavigate();


  const handleLocalError = (err) => {
    setError(err);
    if (setParentError) setParentError(err);
  };

  // 🛰️ Google OAuth Handler
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const data = await googleLoginService(tokenResponse.access_token);
        setToken(data.access);
        setUser(data.user);
        navigate(data.user?.role === 'admin' ? '/admin' : '/dashboard');
      } catch (err) {
        handleLocalError('Google Security Verification Failed');
      } finally {
        setLoading(false);
      }
    },
    onError: () => handleLocalError('Google Authentication Aborted')
  });

  // 🗝️ Standard Credentials / Magic Link Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    handleLocalError('');
    
    if (isMagicLinkMode) {
      if (!formData.email) return handleLocalError('Email address required');
      setLoading(true);
      try {
        await sendMagicLink(formData.email);
        setMagicLinkSent(true);
      } catch (err) {
        handleLocalError('Failed to dispatch magic link');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!formData.email || !formData.password) {
      handleLocalError('Enter an email and password');
      return;
    }
    
    setLoading(true);
    try {
      const data = await loginService(formData);
      setToken(data.access);
      setUser(data.user);
      navigate(data.user?.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      handleLocalError('Wrong email or password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (magicLinkSent) {
    return (
      <div className="text-center py-4 animate-in fade-in zoom-in-95">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles size={32} />
        </div>
        <h3 className="text-xl font-semibold text-[#202124] mb-2">Check your inbox</h3>
        <p className="text-sm text-[#5F6368] mb-8">
          We've sent a magic link to <span className="font-medium text-[#202124]">{formData.email}</span>. 
          Follow the link to sign in instantly.
        </p>
        <Button 
          variant="outline" 
          onClick={() => setMagicLinkSent(false)}
          className="w-full border-[#dadce0] text-[#1a73e8] font-semibold"
        >
          Back to login
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 🚀 Federated Identity Providers */}
      {!isMagicLinkMode && (
        <button
          onClick={() => handleGoogleLogin()}
          disabled={loading}
          className="w-full h-11 border border-[#dadce0] rounded-lg flex items-center justify-center gap-3 bg-white hover:bg-[#F8F9FA] transition-colors text-sm font-semibold text-[#3c4043]"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.12-.84 2.07-1.79 2.7l2.85 2.2c1.67-1.53 2.63-3.79 2.63-6.54z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.85-2.2c-.79.53-1.8.84-3.11.84-2.39 0-4.41-1.61-5.13-3.78H.95v2.3C2.43 15.84 5.49 18 9 18z" fill="#34A853"/>
            <path d="M3.87 10.68c-.18-.53-.28-1.1-.28-1.68s.1-1.15.28-1.68V5.02H.95C.34 6.22 0 7.57 0 9s.34 2.78.95 3.98l2.92-2.3z" fill="#FBBC05"/>
            <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.89 11.43 0 9 0 5.49 0 2.43 2.16.95 5.02l2.92 2.3c.72-2.17 2.74-3.78 5.13-3.78z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>
      )}

      {/* 🏛️ Divider */}
      {!isMagicLinkMode && (
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-[#dadce0]"></div>
          <span className="flex-shrink mx-4 text-sm text-[#5F6368]">or</span>
          <div className="flex-grow border-t border-[#dadce0]"></div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-6">
            <Input 
                id="login-email"
                label={isMagicLinkMode ? "Email address" : "Email or phone"}
                type="email" 
                name="email" 
                placeholder=""
                value={formData.email}
                onChange={handleChange}
                fullWidth
                autoFocus
                required
            />
            
            {!isMagicLinkMode && (
              <div className="space-y-2">
                  <Input 
                      id="login-password"
                      label="Enter your password"
                      type="password" 
                      name="password" 
                      placeholder=""
                      value={formData.password}
                      onChange={handleChange}
                      fullWidth
                      required
                  />
                  <div className="flex justify-start">
                      <Link to="/forgot-password" size="xs" className="text-sm font-semibold text-[#1a73e8] hover:bg-blue-50/50 px-2 py-1 -ml-2 rounded transition-colors">
                        Forgot password?
                      </Link>
                  </div>
              </div>
            )}
        </div>

        <div className="flex flex-col gap-4 mt-2">
           <p className="text-[14px] text-[#202124] leading-normal">
              {isMagicLinkMode 
                ? "We'll send a link to your email that will sign you in instantly without a password."
                : "Not your computer? Use Guest mode to sign in privately."}
              <button 
                type="button" 
                onClick={() => {
                  setIsMagicLinkMode(!isMagicLinkMode);
                  handleLocalError('');
                }}
                className="text-[#1a73e8] font-semibold ml-2 hover:underline"
              >
                {isMagicLinkMode ? "Sign in with password instead" : "Sign in with Magic Link"}
              </button>
           </p>

           <div className="flex items-center justify-between mt-12 w-full">
              <Link 
                to="/register" 
                className="text-sm font-semibold text-[#1a73e8] hover:bg-blue-50/50 px-3 py-2 rounded transition-colors"
              >
                Create account
              </Link>

              <Button 
                type="submit" 
                disabled={loading}
                className="px-8 h-10 rounded-full text-sm font-semibold bg-[#1a73e8] hover:bg-[#1557b0] shadow-none flex items-center justify-center min-w-[100px]"
              >
                {loading ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  isMagicLinkMode ? "Send Link" : "Next"
                )}
              </Button>
           </div>


        </div>
      </form>
    </div>
  );
}


