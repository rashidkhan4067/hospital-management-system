import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🛰️ AdminPage Interface
 * The "Base File" for all administrative module layouts.
 * Enforces strict consistency for spacing, typography, and glassmorphic depth.
 */
const AdminPage = ({ children, className = '', fullHeight = false, ...props }) => {
  return (
    <div 
      className={`matrix-container ${fullHeight ? 'h-[calc(100vh-100px)] flex flex-col p-0 overflow-hidden' : 'py-5 px-3 sm:px-6'} ${className}`}
      {...props}
    >
      <div className={`flex flex-col ${fullHeight ? 'h-full gap-0' : 'gap-6 sm:gap-8'}`}>
        {children}
      </div>
    </div>
  );
};

export default AdminPage;
