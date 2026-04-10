import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/primitives';

/**
 * 📧 VerifyEmailPage - Google 'Security Gate' Archetype (M3 Content Node)
 */
export default function VerifyEmailPage() {
  const brandColors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC05",
    green: "#34A853"
  };

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
          Verify your email
        </h1>
        <p className="text-base text-[#202124] font-normal mt-2 leading-relaxed">
          We've sent a verification link to your email. Click the link to complete your Shifaa account setup.
        </p>
      </div>

      <div className="w-full space-y-8">
        <div className="p-5 bg-[#F8F9FA] rounded-2xl text-left text-sm text-[#5F6368] space-y-3">
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
            className="w-full h-12 rounded-full text-sm font-semibold border-[#dadce0] text-[#1a73e8] hover:bg-blue-50/50"
           >
             Resend email
           </Button>
           
           <Link to="/login" className="w-full">
              <Button className="w-full h-12 rounded-full text-sm font-semibold bg-[#1a73e8] hover:bg-[#1557b0] shadow-none">
                Back to Sign in
              </Button>
           </Link>
        </div>
      </div>
    </motion.div>
  );
}
