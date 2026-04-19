import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 📱 SidebarDrawer (MD3 Mobile Infrastructure)
 * Implementation of Google Material 3 Modal Drawer for small viewports.
 */
const SidebarDrawer = ({ 
  isOpen, 
  onClose, 
  children 
}) => {
  return (
    <>
      {/* 🌑 Modal Backdrop (Surface Overlay) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[200]"
        aria-hidden="true"
      />

      {/* 📤 Drawer Membrane */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-screen w-[280px] bg-[#FEF7FF] flex flex-col border-r border-[#CAC4D0]/40 z-[201] shadow-2xl"
        aria-label="Mobile Navigation Sidebar"
      >
        {children}
      </motion.aside>
    </>
  );
};

export default SidebarDrawer;
