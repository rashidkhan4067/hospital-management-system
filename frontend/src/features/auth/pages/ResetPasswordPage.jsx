import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Input, Button } from '@/components/primitives';
import api from '@/core/api/services/apiClient';

/**
 * 🔐 ResetPasswordPage - Google 'Confirm Security' Archetype (M3 Content Node)
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

  const brandColors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC05",
    green: "#34A853"
  };

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
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
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
          {isSuccess ? 'Success' : 'Create a strong password'}
        </h1>
        <p className="text-base text-[#202124] font-normal text-center mb-10">
          {isSuccess 
            ? 'Your password has been changed successfully' 
            : 'Create a new, strong password that you don\'t use for other services'}
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

        {isSuccess ? (
          <div className="flex justify-center mt-12 w-full">
              <Link to="/login" className="w-full">
                  <Button className="w-full px-6 h-10 rounded-full text-sm font-semibold bg-[#1a73e8] hover:bg-[#1557b0] shadow-none">
                    Sign in
                  </Button>
              </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <Input 
                label="Create password"
                type="password" 
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                autoFocus
            />
            
            <Input 
                label="Confirm"
                type="password" 
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                fullWidth
            />

            <div className="flex items-center justify-end mt-12 w-full">
              <Button 
                type="submit" 
                disabled={loading}
                className="px-8 h-10 rounded-full text-sm font-semibold bg-[#1a73e8] hover:bg-[#1557b0] shadow-none min-w-[100px]"
              >
                {loading ? "Changing..." : "Reset password"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}

