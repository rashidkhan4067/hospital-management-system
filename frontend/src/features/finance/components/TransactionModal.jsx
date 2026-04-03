import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';
import { Modal } from '@/shared/components/ui';

/**
 * 💎 High-Fidelity Transaction Modal (Global Shard)
 * Dispatched via Portal to ensure absolute top-layer visibility.
 * Now unified with the base Modal architecture while maintaining its premium feel.
 * Refactored to match standard clinical and administrative modal dimensions.
 */
export default function TransactionModal({ 
    isOpen, 
    onClose, 
    title, 
    subtitle, 
    icon: Icon = Activity,
    children, 
    actions,
    maxWidth = 'max-w-2xl' 
}) {
  const sidebar = (
    <div className="flex flex-col h-full">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary mb-6">Action Required</p>
        
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                <Icon size={18} />
            </div>
            <div>
                <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">Transactional Node</p>
                <p className="text-[8px] font-bold text-text-secondary uppercase mt-1 tracking-widest">Protocol validation</p>
            </div>
        </div>

        {actions && (
            <div className="space-y-4 mt-4">
                {actions}
            </div>
        )}

        <div className="mt-auto pt-8 flex items-center gap-2 text-text-secondary/40">
            <ShieldCheck size={14} className="text-accent-primary animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest">Al Shifaa Fiscal Hub</span>
        </div>
    </div>
  );

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        subtitle={subtitle}
        icon={Icon}
        sidebar={sidebar}
        maxWidth={maxWidth}
    >
        <div className="space-y-6">
            {children}
        </div>
    </Modal>
  );
}
