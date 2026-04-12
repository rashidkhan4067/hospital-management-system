import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/primitives';
import M3TextField from '@/components/primitives/M3TextField';
import api from '@/core/api/services/apiClient';

/**
 * 🔑 ForgotPasswordPage - Google-Style Account Recovery (M3)
 */
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setError(err.response?.data?.detail || err.response?.data?.error || 'Account recovery failed.');
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
      {/* 🏛️ Brand Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center mb-3 h-10">
          <span className="text-2xl font-semibold tracking-tight text-[#202124] flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#4285F4] flex items-center justify-center text-white font-bold text-xl">S</span>
            <span className="text-[#5f6368]">Shifaa HMS</span>
          </span>
        </div>

        <h1 className="text-2xl font-normal text-[#202124] tracking-normal text-center mb-1">
          Account recovery
        </h1>
        <p className="text-base text-[#202124] font-normal text-center">
          Confirm your recovery email
        </p>
      </div>

      {/* 📟 Form Port */}
      <div className="w-full mt-4">
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[10px] text-white">!</div>
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}

        {isSent ? (
          <div className="space-y-6 text-center py-4">
            <p className="text-[14px] text-[#3C4043] leading-relaxed">
              A recovery link has been dispatched to <br />
              <span className="font-semibold text-[#202124]">{email}</span>
            </p>
            <div className="flex justify-center mt-12">
              <Button
                onClick={() => setIsSent(false)}
                className="px-8 h-[40px] rounded-full text-[14px] font-semibold bg-[#4285F4] hover:bg-[#3367D6] text-white shadow-none"
              >
                Try another email
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <M3TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoFocus
              helperText="Shifaa will send a verification link to this email."
            />

            <div className="flex items-center justify-between mt-10 w-full">
              <Link to="/login" className="text-[14px] font-semibold text-[#4285F4] hover:bg-blue-50/50 px-3 py-2 rounded-full transition-colors">
                Sign in
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
        )}
      </div>
    </motion.div>
  );
}


