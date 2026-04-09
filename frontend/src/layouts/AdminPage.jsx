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
      className={`matrix-container ${fullHeight ? 'h-[calc(100vh-100px)] flex flex-col p-0 overflow-hidden' : 'py-8'} ${className}`}
      {...props}
    >
      <div className={`flex flex-col ${fullHeight ? 'h-full gap-0' : 'gap-8 sm:gap-10'}`}>
        {children}
      </div>
    </div>
  );
};

export default AdminPage;
