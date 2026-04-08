import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Standardized Modal Size Tokens ───────────────────────────────────────────
// These tokens exist as the single source of truth for modal sizing.
// All modals in the system should use these for visual consistency.
const SIZE_MAP = {
  sm:   'max-w-sm',     // ~384px  — Confirm dialogs
  md:   'max-w-md',     // ~448px  — Compact forms
  lg:   'max-w-lg',     // ~512px  — Standard forms
  xl:   'max-w-xl',     // ~576px  — Rich forms (AddPatient, AddUser)
  '2xl': 'max-w-2xl',  // ~672px  — With sidebar
  '3xl': 'max-w-3xl',  // ~768px  — Wide layouts
  full: 'max-w-full',
};

/**
 * 💎 Standardized Base Modal
 * Use the `size` prop for consistent sizing: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
 * The `maxWidth` prop is kept as a legacy escape-hatch for custom values.
 */
export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  icon: Icon,
  children, 
  sidebar,
  size,
  maxWidth,
}) {
  const sizeClass = size ? (SIZE_MAP[size] || SIZE_MAP.xl) : (maxWidth || 'max-w-xl');

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
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
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.96, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full ${sizeClass} bg-white dark:bg-[#0f1117] rounded-[28px] shadow-2xl border border-slate-200/80 dark:border-white/[0.06] overflow-hidden relative flex flex-col max-h-[90vh]`}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white transition-all z-20 flex items-center justify-center"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col md:flex-row flex-1 min-h-0">
            
            {/* Core Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              {(title || subtitle || Icon) && (
                <div className="flex items-center gap-4 mb-8">
                  {Icon && (
                    <div className="w-11 h-11 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0 border border-accent-primary/20">
                      <Icon size={20} />
                    </div>
                  )}
                  <div>
                    {title && <h2 className="text-[16px] font-black text-slate-900 dark:text-white uppercase tracking-tight font-display">{title}</h2>}
                    {subtitle && <p className="text-[9px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mt-1 font-display">{subtitle}</p>}
                  </div>
                </div>
              )}
              <div>{children}</div>
            </div>

            {/* Sidebar (Optional) */}
            {sidebar && (
              <div className="hidden md:flex w-[240px] shrink-0 bg-slate-50 dark:bg-white/[0.02] p-8 flex-col justify-between border-l border-slate-100 dark:border-white/[0.05]">
                <div className="space-y-5">{sidebar}</div>
                <div className="p-3 rounded-xl bg-accent-primary/5 text-accent-primary flex items-center gap-2 mt-6">
                  <ShieldCheck size={14} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Secured Audit Log</span>
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

