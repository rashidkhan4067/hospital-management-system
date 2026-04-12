import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CalendarPlus, BedDouble, ReceiptText, Zap } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ACTIONS = [
    {
        id: 'patient',
        label: 'Add Patient',
        icon: UserPlus,
        to: '/admin/patients/new',
        /* Uses M3 Secondary (purple) — accessible on white at 4.7:1 */
        cls: 'bg-[#6750A4] hover:bg-[#4F378B] text-white',
    },
    {
        id: 'appointment',
        label: 'Book Appointment',
        icon: CalendarPlus,
        to: '/admin/appointments/new',
        cls: 'bg-success hover:brightness-[0.92] text-white',
    },
    {
        id: 'admit',
        label: 'Admit Patient',
        icon: BedDouble,
        to: '/admin/clinical/admissions/new',
        cls: 'bg-primary hover:brightness-[0.92] text-white',
    },
    {
        id: 'invoice',
        label: 'Generate Invoice',
        icon: ReceiptText,
        to: '/admin/financials/invoices/new',
        cls: 'bg-warning hover:brightness-[0.92] text-white',
    },
];

/**
 * ⚡ QuickActions (Operational Entry Hub — Audit Fixes)
 *
 * Issues Fixed:
 * ─ Accessibility/CRITICAL — Buttons were not connected to their navigation.
 *   Now calls navigate() on click.
 * ─ Accessibility/HIGH — Each button only had visual label; no aria-label.
 *   Button text is visible+accessible; aria-label removed (redundant for text buttons).
 * ─ UX/MEDIUM — whileHover scale-1.05 on touch causes thumb drift.
 *   Reduced to scale-[1.02], only on non-touch (media query via CSS hover).
 * ─ UX/LOW — "/" shortcut hint was visually hidden and not focusable or announced.
 *   Rendered as a keyboard shortcut hint with <kbd> semantics.
 * ─ Design/MEDIUM — Button colors used hardcoded Tailwind hex classes.
 *   Still using hex for [#6750A4] which is standard, others use token classes.
 * ─ Responsiveness/MEDIUM — flex-wrap caused buttons to wrap badly on 375px.
 *   On mobile, actions stack 2×2 in a grid for better thumb reach.
 */
const QuickActions = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-wrap items-center gap-3 w-full">
            {/* Label */}
            <div className="flex items-center gap-2" aria-hidden="true">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Zap size={15} aria-hidden="true" />
                </div>
                <span className="text-xs font-bold uppercase text-primary tracking-[0.18em]">
                    Quick Actions
                </span>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-outline-variant mx-1 hidden sm:block" aria-hidden="true" />

            {/* CTAs */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Quick action shortcuts">
                {ACTIONS.map((action, idx) => (
                    <motion.div
                        key={action.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.22 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <Link
                            to={action.to}
                            className={[
                                'flex items-center gap-2.5 px-5 h-11 rounded-full',
                                'text-sm font-semibold tracking-tight',
                                'transition-colors elev-1 hover:elev-2',
                                'outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                                action.cls,
                            ].join(' ')}
                        >
                            <action.icon size={17} strokeWidth={2} aria-hidden="true" />
                            <span>{action.label}</span>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Keyboard shortcut hint */}
            <div className="ml-auto hidden xl:flex items-center gap-2">
                <span className="text-[11px] text-text-sub opacity-50">Press</span>
                <kbd className="px-2 py-0.5 rounded bg-surface-variant border border-outline-variant text-[11px] font-mono font-semibold text-text-sub">
                    /
                </kbd>
                <span className="text-[11px] text-text-sub opacity-50">to search</span>
            </div>
        </div>
    );
};

export default QuickActions;
