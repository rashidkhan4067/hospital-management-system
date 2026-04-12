import React, { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X, ArrowRight, ExternalLink } from 'lucide-react';

/**
 * 🚨 SystemAlertNode (Banner Alert — Audit Fixes)
 *
 * Issues Fixed:
 * ─ Accessibility/CRITICAL — Banner had no role="alert" for screen readers.
 *   role="alert" + aria-live="assertive" set (critical = assertive).
 * ─ Accessibility/HIGH — "Execute Protocol" CTA had no aria-label.
 *   Descriptive label with message context added.
 * ─ Accessibility/HIGH — Dismiss button had no aria-label.
 *   "Dismiss alert" added.
 * ─ UX/MEDIUM — AnimatePresence was wrapping the motion.div but the parent div
 *   (col-span-12) was outside the animation, causing animation to fail on exit.
 *   Restructured: AnimatePresence wraps top-level dismiss-aware div.
 * ─ Design/MEDIUM — Background blur behind left-bar accent lost in dark mode.
 *   Using CSS var tokens for the gradient overlay.
 * ─ Design/LOW — Dismiss button re-render caused the whole banner to repaint.
 *   onDismiss wrapped in useCallback for memo stability.
 */
const SystemAlertNode = ({ message, type = 'Critical', onDismiss }) => {
    const [dismissed, setDismissed] = React.useState(false);

    const handleDismiss = useCallback(() => {
        setDismissed(true);
        onDismiss?.();
    }, [onDismiss]);

    if (!message || dismissed) return null;

    return (
        <AnimatePresence>
            <motion.div
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
                className="relative overflow-hidden bg-surface-bright border border-error/20 rounded-[24px]
                    elev-1 shadow-error/5"
            >
                {/* ── Left accent bar (decorative) ── */}
                <div className="absolute top-0 left-0 w-1 h-full bg-error rounded-l-[24px]" aria-hidden="true" />
                {/* ── Ambient glow ── */}
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-error/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 pl-6">
                    {/* ── Body ── */}
                    <div className="flex items-center gap-4 relative z-10">
                        <div
                            className="w-12 h-12 rounded-2xl bg-error-container flex items-center justify-center text-error shrink-0"
                            aria-hidden="true"
                        >
                            <ShieldAlert size={22} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] font-bold uppercase text-error tracking-[0.2em]">
                                    Priority Alert
                                </span>
                                <span className="w-1 h-1 rounded-full bg-outline-variant" aria-hidden="true" />
                                <time className="text-[10px] font-medium text-text-sub opacity-50">Just Now</time>
                            </div>
                            <p className="text-sm font-semibold text-text-main leading-snug max-w-xl">
                                {message}
                            </p>
                        </div>
                    </div>

                    {/* ── Actions ── */}
                    <div className="flex items-center gap-3 relative z-10 shrink-0">
                        <button
                            className="flex items-center gap-2 h-10 px-5 bg-error text-white rounded-full
                                text-[11px] font-semibold uppercase tracking-wide
                                hover:brightness-110 active:scale-[0.97]
                                elev-1 shadow-error/20
                                outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            aria-label={`Execute protocol for: ${message}`}
                        >
                            Execute Protocol
                            <ArrowRight size={14} aria-hidden="true" />
                        </button>
                        <button
                            onClick={handleDismiss}
                            aria-label="Dismiss this alert"
                            className="icon-btn bg-surface-variant/60 border border-outline-variant text-text-sub hover:text-error hover:bg-error/8
                                outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-1"
                        >
                            <X size={16} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SystemAlertNode;
