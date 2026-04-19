import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * Compact KpiCard — Google-style, no bloating
 * Fits auto-fill grid (min 180px).
 */
const KpiCard = memo(({
    title,
    value,
    trend,
    isUp       = true,
    icon: Icon,
    color      = 'var(--m3-primary)',
    bgColor    = 'var(--m3-primary-container)',
    delay      = 0,
    onClick,
    progressValue = null,
}) => {
    const pct = progressValue !== null
        ? Math.min(Math.max(progressValue, 0), 100)
        : isUp ? 72 : 38;

    const displayVal = (() => {
        if (typeof value === 'string' && value.includes('PKR')) {
            const parts = value.split(' ');
            if (parts.length === 2) {
                const n = parseFloat(parts[1]);
                if (n >= 1_000_000) return `PKR ${(n / 1_000_000).toFixed(1)}M`;
                if (n >= 1_000)     return `PKR ${(n / 1_000).toFixed(0)}k`;
            }
        }
        return value ?? '—';
    })();

    // Trend label
    const TrendIcon = isUp ? TrendingUp : TrendingDown;
    const trendColor = isUp ? 'var(--m3-success)' : 'var(--m3-error)';

    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.25, ease: [0.2, 0, 0, 1] }}
            onClick={onClick}
            onKeyDown={(e) => {
                if (onClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault(); onClick();
                }
            }}
            tabIndex={onClick ? 0 : undefined}
            role={onClick ? 'button' : undefined}
            aria-label={onClick ? `${title}: ${displayVal}, click for details` : undefined}
            className="kpi-card"
        >
            {/* Row 1: icon + label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                    className="kpi-icon"
                    style={{ background: bgColor, color }}
                    aria-hidden="true"
                >
                    {Icon && <Icon size={17} strokeWidth={2.2} />}
                </div>
                <span
                    style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'var(--m3-text-sub)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </span>
            </div>

            {/* Row 2: value */}
            <div
                className="kpi-metric"
                aria-label={`${title} value: ${displayVal}`}
            >
                {displayVal}
            </div>

            {/* Row 3: progress + trend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div className="kpi-bar-track">
                    <motion.div
                        className="kpi-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: delay + 0.15, duration: 0.8, ease: [0.2, 0, 0, 1] }}
                        style={{ background: color }}
                    />
                </div>

                {trend && (
                    <div
                        style={{
                            display: 'flex', alignItems: 'center', gap: '3px',
                            fontSize: '11px', fontWeight: 700, color: trendColor,
                        }}
                        aria-label={`${isUp ? 'Up' : 'Down'} ${trend}`}
                    >
                        <TrendIcon size={11} aria-hidden="true" />
                        <span>{trend}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
});

KpiCard.displayName = 'KpiCard';
export default KpiCard;
