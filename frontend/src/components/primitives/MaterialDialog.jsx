import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const M3_EASING = [0.2, 0, 0, 1];

export default function MaterialDialog({ isOpen, onClose, title, children, footerActions }) {
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

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: M3_EASING }}
            className="relative w-full sm:max-w-[560px] bg-surface-bright rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-300"
          >
            {/* Header */}
            <header className="px-6 pt-6 pb-4">
              <h2 className="text-[24px] font-medium text-text-main leading-tight transition-colors">
                {title}
              </h2>
            </header>

            {/* Content Body */}
            <div className="px-6 py-2 overflow-y-auto max-h-[60vh] custom-scrollbar">
              {children}
            </div>

            {/* Footer Actions */}
            <footer className="px-6 py-6 flex items-center justify-end gap-2 mt-2">
              {footerActions || (
                <>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-full transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-primary/15 text-primary text-sm font-bold rounded-full hover:bg-primary/25 transition-colors"
                  >
                    Confirm
                  </button>
                </>
              )}
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
