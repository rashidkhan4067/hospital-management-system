import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const M3_EASING = [0.2, 0, 0, 1];

export default function MaterialSideSheet({ isOpen, onClose, title, children, onSave }) {
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
        <div className="fixed inset-0 z-[1000] flex justify-end">
          {/* Scrim (Backdrop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: M3_EASING }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] dark:bg-black/60"
          />

          {/* Side Sheet Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: M3_EASING }}
            className="relative w-full md:w-[400px] h-screen bg-surface-bright md:rounded-l-[28px] shadow-2xl flex flex-col overflow-hidden transition-colors duration-300"
          >
            {/* Header Bar */}
            <header className="px-5 py-4 flex items-center justify-between border-b border-outline/30 flex-shrink-0 transition-colors">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="p-2 -ml-2 text-text-sub hover:bg-surface rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
                <h2 className="text-[18px] md:text-[20px] font-medium text-text-main truncate max-w-[200px] md:max-w-none transition-colors">
                  {title}
                </h2>
              </div>
              <button
                onClick={onSave}
                className="px-5 md:px-6 py-2 bg-primary text-white text-sm font-bold rounded-full hover:shadow-lg transition-all shadow-sm active:scale-95"
              >
                Save
              </button>
            </header>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto px-5 md:px-6 py-6 md:py-8 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
