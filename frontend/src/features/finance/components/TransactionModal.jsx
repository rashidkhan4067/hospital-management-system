import React from 'react';
import { Activity, ShieldCheck, Stethoscope, Briefcase, Users as UsersIcon } from 'lucide-react';
import { Modal } from '@/components/primitives';

/**
 * 💎 High-Fidelity Transaction Modal (Global Shard)
 * Dispatched via Portal to ensure absolute top-layer visibility.
 * Now unified with the base Modal architecture while maintaining its premium feel.
 * Refactored to match standard clinical and administrative modal dimensions with design parity.
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
    <React.Fragment>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 italic">Fiscal Intelligence Hub</p>
        
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-white/5 space-y-4 mb-8 translate-y-[-10px] animate-in fade-in zoom-in-95 duration-500 shadow-accent-primary/5">
            <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
                <Icon size={18} />
            </div>
            <div>
                <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-tight font-display">Fiscal Node Shard</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest leading-none italic">Protocol Sync Active</p>
            </div>
        </div>

        {actions && (
            <div className="space-y-4 mt-4">
                {actions}
            </div>
        )}

        <div className="flex items-center justify-center gap-4 opacity-20 grayscale mt-auto pt-8">
            <Stethoscope size={16} />
            <Briefcase size={16} />
            <UsersIcon size={16} />
        </div>
        
        <div className="mt-8 p-3 rounded-xl bg-accent-primary/5 text-accent-primary flex items-center gap-2 opacity-80">
            <ShieldCheck size={14} className="animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest font-display">Secured Fiscal Ledger</span>
        </div>
    </React.Fragment>
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
