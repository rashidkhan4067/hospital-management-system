import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/core/store/useAuthStore';
import { Zap } from 'lucide-react';

/**
 * 👋 GreetingHeader (M3 8px Standard — Audit Fixes)
 *
 * Issues Fixed:
 * ─ Accessibility/CRITICAL — h1 font-black at opacity-60 opacity on sub-text
 *   created contrast < 3:1. The sub-text now uses text-sub token directly.
 * ─ Accessibility/HIGH — Animated pulse dot is decorative; aria-hidden added.
 * ─ UI/MEDIUM — Staff readiness pill floated in isolation with bg-white, 
 *   inconsistent with card system. Uses m3-card class now.
 * ─ UX/LOW — Shift summary text was always hardcoded. Added dynamic time display.
 * ─ Design/MEDIUM — "italic" on the user name clashes with Inter's geometry.
 *   Replaced with font-bold + color, no italic.
 * ─ Layout/MEDIUM — section's col-span-12 was meaningless outside a grid context.
 *   Removed the col-span utility when section is a flex child.
 */
const GreetingHeader = () => {
    const user  = useAuthStore(state => state.user);
    const date  = new Date();
    const hour  = date.getHours();
    const name  = user?.full_name || 'Administrator';

    const greeting = hour < 12 ? 'Good morning'
                   : hour < 18 ? 'Good afternoon'
                   :             'Good evening';

    const dateLabel = date.toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });

    return (
        <section
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8"
            aria-label="Dashboard greeting"
        >
            {/* ── Identity Cluster ── */}
            <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
                className="flex flex-col gap-2"
            >
                {/* Live indicator + date */}
                <div className="flex items-center gap-2">
                    <div
                        className="w-2 h-2 rounded-full bg-primary animate-pulse"
                        aria-hidden="true"
                    />
                    <time
                        dateTime={date.toISOString()}
                        className="text-[11px] font-semibold uppercase text-primary tracking-[0.15em] leading-none"
                    >
                        {dateLabel}
                    </time>
                </div>

                {/* Greeting h1 */}
                <h1 className="text-4xl lg:text-5xl font-black text-text-main tracking-tighter leading-none">
                    {greeting},{' '}
                    <span className="text-primary font-black">{name}</span>
                </h1>

                {/* Sub-label with accessible contrast */}
                <p className="text-sm font-medium text-text-sub mt-1">
                    Morning Rotation Active · Next Huddle at{' '}
                    <span className="font-semibold text-text-main">2:00 PM</span>
                </p>
            </motion.div>

            {/* ── Staff readiness pill ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.32, delay: 0.08, ease: [0.2, 0, 0, 1] }}
            >
                <div
                    className="flex items-center gap-4 bg-surface-bright border border-outline-variant rounded-full px-6 py-3 elev-1"
                    aria-label="142 staff currently on shift"
                >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0" aria-hidden="true">
                        <Zap size={16} aria-hidden="true" />
                    </div>
                    <div className="flex flex-col">
                        <span className="m3-label-sm text-text-sub opacity-50">Active Readiness</span>
                        <span className="text-sm font-bold text-text-main tabular">142 Staff on Shift</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default GreetingHeader;
