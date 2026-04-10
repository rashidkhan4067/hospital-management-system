import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/primitives';
import api from '@/core/api/services/apiClient';

/**
 * 🪄 VerifyMagicLinkPage - Google 'Security Gate' Archetype (M3 Content Node)
 */
export default function VerifyMagicLinkPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [errorMessage, setErrorMessage] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const verifyAttempted = useRef(false);

  const brandColors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC05",
    green: "#34A853"
  };

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMessage('Verification token is missing.');
      return;
    }

    if (verifyAttempted.current) return;
    verifyAttempted.current = true;

    const verifyToken = async () => {
      try {
        const response = await api.post('auth/magic-link/verify/', { token });
        const { access, refresh, user } = response.data;
        login(user, access, refresh);
        setStatus('success');
        setTimeout(() => navigate('/dashboard'), 2000);
      } catch (err) {
        setStatus('error');
        setErrorMessage(err.response?.data?.detail || 'This link has expired or is invalid.');
      }
    };

    verifyToken();
  }, [token, login, navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center w-full"
    >
      {/* 🏛️ Google-Style Brand Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center mb-4 h-10">
          <span className="text-3xl font-medium tracking-tight text-[#202124]">
            <span style={{ color: brandColors.blue }}>S</span>
            <span style={{ color: brandColors.red }}>h</span>
            <span style={{ color: brandColors.yellow }}>i</span>
            <span style={{ color: brandColors.blue }}>f</span>
            <span style={{ color: brandColors.green }}>a</span>
            <span style={{ color: brandColors.red }}>a</span>
          </span>
        </div>
        
        <h1 className="text-2xl font-normal text-[#202124] tracking-normal mb-2">
          {status === 'verifying' && 'Verifying link...'}
          {status === 'success' && 'Welcome back'}
          {status === 'error' && 'Something went wrong'}
        </h1>
        <p className="text-base text-[#202124] font-normal mt-2 leading-relaxed">
          {status === 'verifying' && 'Please wait while we secure your session.'}
          {status === 'success' && 'Taking you to your Shifaa dashboard.'}
          {status === 'error' && errorMessage}
        </p>
      </div>

      <div className="w-full flex flex-col items-center justify-center min-h-[100px]">
        {status === 'verifying' && (
          <div className="w-12 h-12 border-4 border-[#F8F9FA] border-t-[#1A73E8] rounded-full animate-spin mb-8"></div>
        )}

        {status === 'success' && (
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        )}

        {status === 'error' && (
           <Button 
            onClick={() => navigate('/login')}
            className="w-full h-12 rounded-full text-sm font-semibold bg-[#1a73e8] hover:bg-[#1557b0] shadow-none mt-8"
           >
             Return to Sign in
           </Button>
        )}
      </div>
    </motion.div>
  );
}

