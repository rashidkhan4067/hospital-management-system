import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BaseNavbar from './BaseNavbar';

/**
 * 🏢 Elite App Architecture Wrapper
 * Orchestrates the primary administrative portal topology.
 * Optimized for high-fidelity clinical skinning and -inspired transitions.
 */
const AppLayout = memo(() => {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-bg-base dark:bg-slate-910 transition-colors duration-700 selection:bg-accent-primary/10 selection:text-accent-primary font-sans">
      
      {/* 🚀 Tactical Nav Shard */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        <BaseNavbar />
        
        {/* 📉 Intelligence Propagation Lane */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth custom-scrollbar bg-transparent z-0">
          <div className="relative z-10 min-h-full">
            <Outlet />
          </div>

          {/* 🔘 Atmospheric Depth Shard - Sync'd with Theme Accent */}
          <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-accent-primary/5 blur-[140px] rounded-full -z-10 opacity-60 pointer-events-none animate-pulse duration-[10s]" />
          <div className="fixed -bottom-20 -left-20 w-[400px] h-[400px] bg-accent-primary/2 blur-[100px] rounded-full -z-10 opacity-40 pointer-events-none" />
        </main>
      </div>
      
    </div>
  );
});

export default AppLayout;
