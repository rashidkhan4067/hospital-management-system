import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🕹️ SegmentedControl (Shared M3 Component)
 * A premium pill-shaped toggle for selection logic.
 * Synchronizes across breakpoints (fills width on mobile).
 */
export default function SegmentedControl({ value, onChange, options, className = '' }) {
    return (
        <div className={`relative flex items-center p-1 bg-surface border border-outline/20 rounded-full w-full sm:w-auto ${className}`}>
            {options.map((opt) => (
                <button
                    key={opt.val}
                    onClick={() => onChange(opt.val)}
                    className="relative flex-1 sm:flex-none px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors z-10 whitespace-nowrap"
                >
                    <span className={value?.toLowerCase() === opt.val.toLowerCase() ? 'text-white' : 'text-text-sub'}>
                        {opt.label}
                    </span>
                    {value?.toLowerCase() === opt.val.toLowerCase() && (
                        <motion.div
                            layoutId="pill-background"
                            className="absolute inset-x-0.5 inset-y-0.5 bg-primary rounded-full -z-10 shadow-lg shadow-primary/20"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
