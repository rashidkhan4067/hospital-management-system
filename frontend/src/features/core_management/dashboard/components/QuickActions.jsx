import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CalendarPlus, BedDouble, ReceiptText, FlaskConical, Zap } from 'lucide-react';
import { useModalStore } from '@/core/store/useModalStore';

const ACTIONS = [
    {
        id:    'ADD_PATIENT',
        label: 'Add Patient',
        icon:  UserPlus,
        color: 'bg-[#6750A4] hover:bg-[#4F378B] text-white',
        shadow: 'shadow-[0_4px_16px_rgba(103,80,164,0.35)]',
    },
    {
        id:    'BOOK_APPOINTMENT',
        label: 'Book Appt.',
        icon:  CalendarPlus,
        color: 'bg-success hover:brightness-[0.92] text-white',
        shadow: 'shadow-[0_4px_16px_rgba(26,107,58,0.3)]',
    },
    {
        id:    'ADMIT_PATIENT',
        label: 'Admit Patient',
        icon:  BedDouble,
        color: 'bg-primary hover:brightness-[0.92] text-white',
        shadow: 'shadow-[0_4px_16px_rgba(21,88,214,0.3)]',
    },
    {
        id:    'NEW_INVOICE',
        label: 'New Invoice',
        icon:  ReceiptText,
        color: 'bg-warning hover:brightness-[0.92] text-white',
        shadow: 'shadow-[0_4px_16px_rgba(122,79,0,0.25)]',
    },
    {
        id:    'LAB_ORDER',
        label: 'Lab Order',
        icon:  FlaskConical,
        color: 'bg-[#006874] hover:brightness-[0.92] text-white',
        shadow: 'shadow-[0_4px_16px_rgba(0,104,116,0.3)]',
    },
];

const QuickActions = () => {
    const openModal = useModalStore((state) => state.openModal);

    return (
        <div className="flex flex-wrap items-center gap-3 w-full">
            {/* Section label */}
            <div className="flex items-center gap-2 shrink-0" aria-hidden="true">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Zap size={15} />
                </div>
                <span className="text-[11px] font-black uppercase text-primary tracking-[0.18em]">
                    Quick Actions
                </span>
            </div>

            <div className="hidden sm:block h-6 w-px bg-outline-variant mx-1" aria-hidden="true" />

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Quick action shortcuts">
                {ACTIONS.map((action, idx) => (
                    <motion.div
                        key={action.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.24 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <button
                            onClick={() => openModal(action.id)}
                            className={[
                                'flex items-center gap-2.5 px-4 h-10 rounded-full',
                                'text-[13px] font-semibold tracking-tight',
                                'transition-all duration-150 border-none cursor-pointer',
                                'outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                                action.color,
                                action.shadow,
                            ].join(' ')}
                            aria-label={action.label}
                        >
                            <action.icon size={17} strokeWidth={2.2} aria-hidden="true" />
                            <span>{action.label}</span>
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Keyboard shortcut hint */}
            <div className="ml-auto hidden xl:flex items-center gap-1.5">
                <span className="text-[11px] text-text-sub opacity-40">Search:</span>
                <kbd className="px-2 py-0.5 rounded-lg bg-surface-variant border border-outline-variant
                    text-[11px] font-mono font-bold text-text-sub tracking-wide">
                    /
                </kbd>
            </div>
        </div>
    );
};

export default QuickActions;
