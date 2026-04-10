import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Input, Button } from '@/components/primitives';
import api from '@/core/api/services/apiClient';

/**
 * 🔑 ForgotPasswordPage - Google 'Account Recovery' Archetype (M3 Content Node)
 */
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const brandColors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC05",
    green: "#34A853"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Enter an email address');
      return;
    }
    setLoading(true);
    setError(null);
    
    try {
      await api.post('auth/password/reset/', { email });
      setIsSent(true);
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.error || 'Account recovery failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center w-full"
    >
      {/* 🏛️ Google-Style Brand Header */}
      <div className="flex flex-col items-center mb-8">
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
        
        <h1 className="text-2xl font-normal text-[#202124] tracking-normal text-center mb-2">
          Account recovery
        </h1>
        <p className="text-base text-[#202124] font-normal text-center mb-10">
          Confirm the email associated with your account
        </p>
      </div>

      {/* 📟 Form Port */}
      <div className="w-full">
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[10px] text-white">!</div>
              <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}

        {isSent ? (
          <div className="space-y-6 text-center">
            <p className="text-sm text-[#3C4043] leading-relaxed">
              A password reset link has been dispatched to <br />
              <span className="font-semibold text-[#202124]">{email}</span>
            </p>
            <div className="flex justify-center mt-12">
                <Button 
                  onClick={() => setIsSent(false)} 
                  className="px-8 h-10 rounded-full text-sm font-semibold bg-[#1a73e8] hover:bg-[#1557b0] shadow-none"
                >
                  Try another email
                </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-6">
              <Input 
                label="Email or phone"
                type="email" 
                placeholder="unit@clinical.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                autoFocus
              />
              <p className="text-sm text-[#5F6368] leading-relaxed">
                Shifaa will send a verification link to your email for security.
              </p>
            </div>

            <div className="flex items-center justify-between mt-12 w-full">
              <Link to="/login" className="text-sm font-semibold text-[#1a73e8] hover:bg-blue-50/50 px-3 py-2 rounded transition-colors">
                Sign in
              </Link>
              <Button 
                type="submit" 
                disabled={loading}
                className="px-8 h-10 rounded-full text-sm font-semibold bg-[#1a73e8] hover:bg-[#1557b0] shadow-none min-w-[100px]"
              >
                {loading ? "Processing..." : "Next"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}

