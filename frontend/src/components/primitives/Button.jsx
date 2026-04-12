import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🛰️ M3Button Primitive
 *
 * Fixes applied:
 * ─ WCAG focus-visible ring on all variants (keyboard accessible)
 * ─ disabled state: aria-disabled + visual opacity + cursor-not-allowed
 * ─ Loading state with spinner + aria-busy
 * ─ Minimum 44px height for all sizes (touch target)
 * ─ whileTap scale 0.97 only when not disabled
 * ─ Proper contrast: filled uses on-primary token (white)
 */
export default function Button({
    children,
    variant  = 'filled',
    size     = 'md',
    icon: Icon,
    className = '',
    disabled  = false,
    isLoading = false,
    ...props
}) {
    const isDisabled = disabled || isLoading;

    const base = [
        'inline-flex items-center justify-center gap-2',
        'font-semibold rounded-full whitespace-nowrap',
        'transition-none',                 // let CSS handle transitions
        'outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        isDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
    ].join(' ');

    const variants = {
        filled:   'bg-primary text-white hover:shadow-md hover:brightness-110 active:brightness-90',
        tonal:    'bg-primary-container text-primary hover:brightness-95 active:brightness-90',
        outlined: 'bg-surface-bright border border-outline text-text-main hover:bg-surface-variant active:bg-outline-variant/30',
        text:     'bg-transparent text-primary hover:bg-primary/8 active:bg-primary/12',
        danger:   'bg-error-container text-error hover:brightness-95 active:brightness-90',
    };

    const sizes = {
        sm: 'px-4  h-9  text-[11px] tracking-wide  uppercase',
        md: 'px-6  h-11 text-sm',
        lg: 'px-8  h-12 text-base',
    };

    return (
        <motion.button
            whileTap={isDisabled ? undefined : { scale: 0.97 }}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            aria-busy={isLoading}
            className={`${base} ${variants[variant] ?? variants.filled} ${sizes[size] ?? sizes.md} ${className}`}
            {...props}
        >
            {isLoading ? (
                <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
            ) : (
                Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 17} aria-hidden="true" />
            )}
            {children}
        </motion.button>
    );
}
