import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/primitives';

/**
 * 📧 VerifyEmailPage - Google 'Security Gate' Archetype (M3 Content Node)
 */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/primitives';
import { CheckCircle2, AlertCircle, Loader2, Mail } from 'lucide-react';
import api from '@/core/api/services/apiClient';

/**
 * 📧 VerifyEmailPage - Clinical Identity Activation Gateway (M3)
 * Handles both the "Check Email" instruction and the "Activation" process.
 */
export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const key = searchParams.get('key');
  
  const [status, setStatus] = useState(key ? 'verifying' : 'instruction'); // 'verifying' | 'success' | 'error' | 'instruction'
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (key) {
      handleVerification(key);
    }
  }, [key]);

  const handleVerification = async (activationKey) => {
    try {
      setStatus('verifying');
      const response = await api.post('/api/v1/auth/verify-email/', { key: activationKey });
      setStatus('success');
      setMessage(response.data.message || 'Account activated successfully.');
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.error || 'Verification failed. The link may be expired.');
    }
  };

  const brandColors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC05",
    green: "#34A853"
  };

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="flex flex-col items-center py-10 space-y-6">
            <Loader2 size={48} className="text-primary animate-spin" />
            <p className="text-lg font-medium text-text-main">Activating your clinical identity...</p>
          </div>
        );
      
      case 'success':
        return (
          <div className="flex flex-col items-center py-6 space-y-6 text-center animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-green-700">Identity Verified</h2>
              <p className="text-text-sub max-w-sm mx-auto">{message}</p>
            </div>
            <Link to="/login" className="w-full">
              <Button className="w-full h-12 rounded-full bg-primary hover:bg-primary-dark shadow-md font-bold">
                Sign in to Portal
              </Button>
            </Link>
          </div>
        );

      case 'error':
        return (
          <div className="flex flex-col items-center py-6 space-y-6 text-center animate-in shake-in">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
              <AlertCircle size={48} className="text-error" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-error">Verification Failed</h2>
              <p className="text-text-sub max-w-sm mx-auto">{message}</p>
            </div>
            <Button 
              onClick={() => setStatus('instruction')}
              variant="outline"
              className="w-full h-12 rounded-full border-outline text-text-main hover:bg-surface font-semibold"
            >
              Get new link
            </Button>
          </div>
        );

      default: // instruction
        return (
          <>
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <Mail size={32} className="text-blue-600" />
              </div>
              <h1 className="text-2xl font-normal text-[#202124] tracking-normal mb-2">
                Verify your email
              </h1>
              <p className="text-base text-[#202124] font-normal mt-2 leading-relaxed">
                We've sent a verification link to your email. Click the link to complete your Shifaa account setup.
              </p>
            </div>

            <div className="w-full space-y-8">
              <div className="p-5 bg-surface rounded-2xl text-left text-sm text-[#5F6368] space-y-3 border border-outline-variant">
                <p className="font-medium text-[#202124]">Didn't receive the email?</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Check your spam folder</li>
                  <li>Wait a few minutes</li>
                  <li>Ensure the email address is correct</li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  variant="outline"
                  className="w-full h-12 rounded-full text-sm font-semibold border-outline text-primary hover:bg-blue-50/50"
                  onClick={() => {/* logic to resend could be added here */}}
                >
                  Resend email
                </Button>
                
                <Link to="/login" className="w-full">
                  <Button variant="ghost" className="w-full h-12 rounded-full text-sm font-semibold text-text-sub hover:bg-surface-variant">
                    Back to Sign in
                  </Button>
                </Link>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center w-full"
    >
      {renderContent()}
    </motion.div>
  );
}
