import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/primitives';
import M3TextField from '@/components/primitives/M3TextField';
import api from '@/core/api/services/apiClient';

/**
 * 🔐 ResetPasswordPage - Google-Style Security Update (M3)
 */
export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uid || !token) {
        setError('Missing security token');
        return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError(null);
    
    try {
      await api.post('auth/password/reset/confirm/', { 
        uid, 
        token, 
        new_password1: password,
        new_password2: confirmPassword
      });
      setIsSuccess(true);
    } catch (err) {
      setError('Reset link expired or invalid');
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
          {isSuccess ? 'Success' : 'Reset your password'}
        </h1>
        <p className="text-base text-[#202124] font-normal text-center">
          {isSuccess 
            ? 'Your password has been changed successfully' 
            : 'Create a new, strong password'}
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

        {isSuccess ? (
          <div className="flex flex-col items-center mt-8 py-4 gap-6">
              <p className="text-[14px] text-[#3C4043] text-center">
                  Secure access restored. You can now sign in with your new credentials.
              </p>
              <Link to="/login" className="w-full">
                  <Button className="w-full h-[40px] rounded-full text-[14px] font-semibold bg-[#4285F4] hover:bg-[#3367D6] text-white shadow-none">
                    Sign in
                  </Button>
              </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <M3TextField 
                label="New password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                autoFocus
            />
            
            <M3TextField 
                label="Confirm password"
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                fullWidth
            />

            <div className="flex items-center justify-end mt-10 w-full">
              <Button 
                type="submit" 
                disabled={loading}
                className="px-8 h-[40px] rounded-full text-[14px] font-semibold bg-[#4285F4] hover:bg-[#3367D6] text-white shadow-none min-w-[100px]"
              >
                {loading ? "..." : "Reset password"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}


