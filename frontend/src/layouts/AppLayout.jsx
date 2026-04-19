import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { useUI } from '@/core/ui/UIContext';
import AdminTopBar from './AdminTopBar';
import AdminSidebar from './sidebar/AdminSidebar';
import GlobalModalContainer from '@/components/modals/GlobalModalContainer';
import AlertDetailDrawer from './drawers/AlertDetailDrawer';

/**
 * 🏢 Master App Shell (Material 3 Spec)
 * Orchestrates the clinical command center layout.
 */
const AppLayout = memo(() => {
  return (
    <div className="flex w-full h-screen shifaa-portal-bg font-sans overflow-hidden">
      
      {/* 🧭 Structural Navigation Layer (MD3 Rail/Drawer) */}
      <AdminSidebar />
      
      {/* 🛰️ Project-Wide Dialog Engine */}
      <GlobalModalContainer />
      
      {/* 🚨 Emergency Response Drawer */}
      <AlertDetailDrawer />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">


        {/* 🛰️ Horizontal Command Terminal (Fixed Flush) */}
        <AdminTopBar />

        
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
