import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 💎 Standardized Base Modal (Derived from RegisterMedicationModal)
 * Compact, high-fidelity portal for consistent UI across the system.
 */
export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  icon: Icon,
  children, 
  sidebar,
  maxWidth = 'max-w-2xl'
}) {
  // Handle ESC key and Body lock
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[99999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full ${maxWidth} bg-white dark:bg-slate-950 rounded-[32px] shadow-2xl border border-white/10 overflow-hidden relative`}
        >
          {/* Close Trigger */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 dark:text-white/20 transition-all z-20"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col md:flex-row">
            
            {/* 📍 Core Form Shard */}
            <div className="flex-1 p-8 sm:p-10 border-r border-white/5">
              {(title || subtitle || Icon) && (
                <div className="flex items-center gap-4 mb-8">
                  {Icon && (
                    <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items_center justify-center text-accent-primary">
                      <Icon size={22} className="animate-pulse" />
                    </div>
                  )}
                  <div>
                    {title && <h2 className="text-xl font-black text-text-primary dark:text-white uppercase tracking-tight">{title}</h2>}
                    {subtitle && <p className="text-[9px] font-bold text-text-secondary dark:text-white/30 uppercase tracking-[0.2em] mt-1">{subtitle}</p>}
                  </div>
                </div>
              )}

              <div className="modal-content">
                {children}
              </div>
            </div>

            {/* 🔦 Sidebar / Meta Shard (Optional) */}
            {sidebar && (
              <div className="hidden md:flex w-[260px] bg-slate-50 dark:bg-white/[0.02] p-10 flex-col justify-between border-l border-white/5">
                <div className="space-y-6">
                  {sidebar}
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/5 text-blue-500 flex items-center gap-3">
                  <ShieldCheck size={16} />
                  <span className="text-[8px] font-black uppercase tracking-tight">Hardened Audit Node</span>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

