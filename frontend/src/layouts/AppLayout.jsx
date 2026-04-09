import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { useUI } from '@/core/ui/UIContext';
import SideNavigation from './SideNavigation';
import TopHeader from './TopHeader';

/**
 * 🏢 Master App Shell (Material 3 Spec)
 * Orchestrates the clinical command center layout.
 */
const AppLayout = memo(() => {
  return (
    <div className="flex w-full h-screen bg-surface font-sans overflow-hidden">
      
      {/* 🧭 Structural Navigation Layer (Permanent Rail) */}
      <SideNavigation />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* 🛰️ Horizontal Command Terminal (Fixed Flush) */}
        <TopHeader />
        
        {/* 📉 Intelligence Propagation Lane */}
        <main className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
          <div className="min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
      
    </div>
  );
});




export default AppLayout;
