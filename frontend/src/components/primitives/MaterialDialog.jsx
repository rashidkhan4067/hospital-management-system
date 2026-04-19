import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const M3_EASING = [0.2, 0, 0, 1];

export default function MaterialDialog({ isOpen, onClose, title, children, footerActions, maxWidth, className }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
          {/* Scrim (Backdrop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: M3_EASING }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] dark:bg-black/60"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: M3_EASING }}
            className={`relative w-full ${maxWidth || 'sm:max-w-[500px]'} bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] transition-colors duration-300 border border-slate-200 ${className || ''}`}
          >
            {/* Header */}
            <header className="px-5 pt-5 pb-3">
              <h2 className="text-[20px] font-bold text-text-main leading-tight transition-colors">
                {title}
              </h2>
            </header>

            {/* Content Body */}
            <div className="px-5 py-2 overflow-y-auto max-h-[65vh] custom-scrollbar">
              {children}
            </div>

            {/* Footer Actions */}
            {footerActions && (
              <footer className="px-5 py-4 flex items-center justify-end gap-2 mt-2 bg-surface-container/30 border-t border-outline-variant/20">
                {footerActions}
              </footer>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
