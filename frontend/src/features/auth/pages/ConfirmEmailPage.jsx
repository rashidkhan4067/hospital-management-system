import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/primitives';
import api from '@/core/api/services/apiClient';

/**
 * ✅ ConfirmEmailPage - Google 'Account Activation' Archetype (M3 Content Node)
 */
export default function ConfirmEmailPage() {
  const { uid, token } = useParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const navigate = useNavigate();
  const activationAttempted = useRef(false);

  const brandColors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC05",
    green: "#34A853"
  };

  useEffect(() => {
    if (activationAttempted.current) return;
    activationAttempted.current = true;

    const activateAccount = async () => {
      try {
        await api.post('auth/users/activation/', { uid, token });
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    };

    activateAccount();
  }, [uid, token]);

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
          {status === 'verifying' && 'Activating account...'}
          {status === 'success' && 'Account activated'}
          {status === 'error' && 'Activation failed'}
        </h1>
        <p className="text-base text-[#202124] font-normal mt-2 leading-relaxed">
          {status === 'verifying' && 'Please wait while we confirm your identity.'}
          {status === 'success' && 'Your Shifaa account is now active and ready to use.'}
          {status === 'error' && 'The activation link is invalid or has already been used.'}
        </p>
      </div>

      <div className="w-full flex flex-col gap-6 mt-4">
        {status === 'verifying' && (
          <div className="flex justify-center py-8">
            <div className="w-10 h-10 border-4 border-[#F8F9FA] border-t-[#1A73E8] rounded-full animate-spin"></div>
          </div>
        )}

        {status === 'success' && (
           <Button 
            onClick={() => navigate('/login')}
            className="w-full h-12 rounded-full text-sm font-semibold bg-[#1a73e8] hover:bg-[#1557b0] shadow-none"
           >
             Sign in to Shifaa
           </Button>
        )}

        {status === 'error' && (
           <div className="space-y-4 w-full">
              <Button 
                onClick={() => navigate('/register')}
                variant="outline"
                className="w-full h-12 rounded-full text-sm font-semibold border-[#dadce0] text-[#1a73e8]"
              >
                Create new account
              </Button>
              <Link to="/login" className="block text-center text-sm font-semibold text-[#1a73e8] hover:underline mt-4">
                Return to Sign in
              </Link>
           </div>
        )}
      </div>
    </motion.div>
  );
}

