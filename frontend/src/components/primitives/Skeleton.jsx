import React, { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * 🦴 Skeleton (M3 Diagnostic Primitive — CLS-Safe)
 *
 * Fixes applied:
 * ─ Uses CSS skeleton-shimmer class (keyframe) instead of Framer width animation
 *   → eliminates layout shift from JS-driven position change
 * ─ aria-hidden="true" + role="status" wrapper for screen readers
 * ─ Increased base opacity for better visibility on white cards
 * ─ Every instance declares explicit dimensions → no collapse during load
 */
const Skeleton = ({ className = '', variant = 'rect' }) => {
    const base = 'skeleton-shimmer';
    const variantCls = {
        rect:   'rounded-2xl',
        circle: 'rounded-full',
        text:   'rounded-md h-3 w-3/4',
        pill:   'rounded-full h-8 w-24',
    };

    return (
        <div
            className={`${base} ${variantCls[variant] ?? variantCls.rect} ${className}`}
            aria-hidden="true"
        />
    );
};

/**
 * CardSkeleton — mirrors the real card header + body pattern.
 * Fixed height matches real card so zero CLS on data load.
 */
export const CardSkeleton = ({ minHeight = '280px' }) => (
    <div
        className="bg-surface-bright border border-outline-variant rounded-[24px] p-6 flex flex-col gap-4 elev-1"
        style={{ minHeight }}
        role="status"
        aria-label="Loading content"
    >
        <div className="flex items-center justify-between">
            <Skeleton variant="circle" className="w-12 h-12" />
            <Skeleton variant="pill" className="w-24 h-6" />
        </div>
        <Skeleton variant="text" className="w-1/2 h-3" />
        <Skeleton className="flex-1 min-h-[100px]" />
        <div className="flex justify-between items-center mt-auto">
            <Skeleton variant="text" className="w-20 h-3" />
            <Skeleton variant="circle" className="w-8 h-8" />
        </div>
    </div>
);

/**
 * KpiCardSkeleton — Fixed 160px so KPI row never collapses.
 */
export const KpiCardSkeleton = () => (
    <div
        className="bg-surface-bright border border-outline-variant rounded-[24px] p-6 flex flex-col gap-4 elev-1"
        style={{ minHeight: '160px' }}
        role="status"
        aria-label="Loading KPI"
    >
        <div className="flex items-center gap-4">
            <Skeleton variant="circle" className="w-12 h-12" />
            <div className="flex flex-col gap-2 flex-1">
                <Skeleton variant="text" className="w-20 h-2.5" />
                <Skeleton variant="text" className="w-14 h-2" />
            </div>
        </div>
        <div className="mt-auto flex justify-between items-end">
            <Skeleton variant="rect" className="w-24 h-9 rounded-xl" />
            <Skeleton variant="rect" className="w-16 h-8 rounded-xl" />
        </div>
        <Skeleton variant="rect" className="w-full h-1.5 rounded-full" />
    </div>
);

/**
 * ListSkeleton — each row has fixed heights to prevent CLS.
 */
export const ListSkeleton = ({ rows = 5 }) => (
    <div className="flex flex-col gap-3 w-full" role="status" aria-label="Loading list">
        {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-1">
                <Skeleton variant="circle" className="w-10 h-10 shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                    <Skeleton variant="text" className="w-1/3 h-3" />
                    <Skeleton variant="text" className="w-1/4 h-2.5" />
                </div>
                <Skeleton variant="pill" className="w-12 h-6" />
            </div>
        ))}
    </div>
);

/**
 * ChartSkeleton — Fixed 260px matching chart card height.
 */
export const ChartSkeleton = ({ height = '260px' }) => (
    <div
        className="w-full"
        style={{ height }}
        role="status"
        aria-label="Loading chart"
    >
        <Skeleton className="w-full h-full rounded-2xl" />
    </div>
);

export default Skeleton;
