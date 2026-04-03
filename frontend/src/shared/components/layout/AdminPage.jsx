import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🛰️ AdminPage Interface
 * The "Base File" for all administrative module layouts.
 * Enforces strict consistency for spacing, typography, and glassmorphic depth.
 */
const AdminPage = ({ children, className = '', fullHeight = false, ...props }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`matrix-container ${fullHeight ? 'h-[calc(100vh-100px)] flex flex-col p-0 overflow-hidden' : 'py-6 px-4'} ${className}`}
      {...props}
    >
      <div className={`flex flex-col ${fullHeight ? 'h-full gap-0' : 'gap-8'}`}>
        {children}
      </div>
    </motion.div>
  );
};

export default AdminPage;
