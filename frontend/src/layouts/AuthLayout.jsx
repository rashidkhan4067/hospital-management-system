import React from 'react';
import { Outlet, Link } from 'react-router-dom';

/**
 * 🔒 AuthLayout - Material 3 Adaptive Shell (Mobile-First)
 * Implementation of Google Identity Layout Standards.
 */
const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-white sm:bg-[#F8F9FA] flex flex-col items-center justify-center selection:bg-[#E8F0FE] font-['Inter',sans-serif]">
      {/* 
          🎯 Responsive Card Constraint
          Mobile: Full width, full height, no border
          Desktop (sm+): 448px, 28px radius, bordered card
      */}
      <main className="w-full h-full sm:h-auto sm:max-w-[448px] bg-white border-none sm:border-[#DADCE0] sm:border-[1px] rounded-none sm:rounded-[28px] p-6 sm:p-10 flex flex-col justify-center animate-in fade-in duration-500 overflow-hidden relative">
        <Outlet />
      </main>

      {/* 🗺️ Global Footer - Hidden on mobile if full viewport height, or scrollable */}
      <div className="w-full max-w-[448px] mt-6 hidden sm:flex flex-wrap items-center justify-between gap-4 px-2">
          <div className="flex items-center">
              <select className="bg-transparent text-[12px] text-[#5F6368] hover:bg-[#F1F3F4] px-2 py-1.5 rounded cursor-pointer outline-none font-normal">
                  <option>English (United Kingdom)</option>
                  <option>English (United States)</option>
                  <option>العربية</option>
              </select>
          </div>
          <div className="flex items-center gap-4">
              <Link className="text-[12px] text-[#5F6368] hover:bg-[#F1F3F4] px-2 py-1.5 rounded transition-colors font-normal">Help</Link>
              <Link className="text-[12px] text-[#5F6368] hover:bg-[#F1F3F4] px-2 py-1.5 rounded transition-colors font-normal">Privacy</Link>
              <Link className="text-[12px] text-[#5F6368] hover:bg-[#F1F3F4] px-2 py-1.5 rounded transition-colors font-normal">Terms</Link>
          </div>
      </div>
    </div>
  );
};

export default AuthLayout;
