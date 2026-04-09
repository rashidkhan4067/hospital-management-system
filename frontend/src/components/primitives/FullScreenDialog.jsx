import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/primitives';
import { X } from 'lucide-react';

const M3_DECEL = [0, 0, 0.2, 1];

export default function FullScreenDialog({ isOpen, onClose, title, children, onSave, isDirty = false }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    if (isDirty) {
      setShowConfirm(true);
    } else {
      onClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: M3_DECEL }}
            className="fixed inset-0 z-[2000] bg-white flex flex-col w-full h-full safe-area-inset"
          >
            {/* Top App Bar (64px) */}
            <header className="h-[64px] flex items-center justify-between px-4 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleClose}
                  className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
                <h2 className="text-lg font-medium text-slate-900">{title}</h2>
              </div>
              <Button onClick={onSave} size="md">Save</Button>
            </header>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <div className="max-w-xl mx-auto flex flex-col gap-8 pb-32">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discard Confirmation Dialog */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[2100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px]"
              onClick={() => setShowConfirm(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-[28px] p-6 shadow-2xl"
            >
              <h3 className="text-xl font-medium text-slate-900 mb-2">Discard changes?</h3>
              <p className="text-slate-500 mb-6 text-sm">Any unsaved information will be lost permanently.</p>
              <div className="flex justify-end gap-2">
                <Button variant="text" onClick={() => setShowConfirm(false)}>
                  Keep editing
                </Button>
                <Button variant="danger" size="sm" onClick={() => {
                  setShowConfirm(false);
                  onClose();
                }}>
                  Discard
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
