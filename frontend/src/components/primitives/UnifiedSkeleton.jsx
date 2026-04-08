import React from 'react';
import { Card } from './Card';

/**
 * 🦴 Unified Skeleton Protocol
 * High-fidelity pulsing loader for premium aesthetic consistency.
 */
const UnifiedSkeleton = ({ className = '', height = 'h-[350px]' }) => (
    <Card className={`relative p-8 rounded-[2.5rem] bg-slate-50 dark:bg-[#1a1d23] border border-slate-200 dark:border-white/5 ${height} overflow-hidden shadow-2xl ${className}`}>
        <div className="animate-pulse space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-white/5" />
                    <div className="space-y-3">
                        <div className="h-4 w-32 bg-slate-200 dark:bg-white/5 rounded-full" />
                        <div className="h-2 w-24 bg-slate-100 dark:bg-white/5 rounded-full opacity-50" />
                    </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5" />
            </div>
            
            <div className="flex-1 space-y-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="space-y-3">
                        <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full" />
                        <div className="h-8 w-full bg-slate-200 dark:bg-white/5 rounded-xl opacity-40" />
                    </div>
                ))}
            </div>
            
            <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                <div className="h-2 w-48 bg-slate-100 dark:bg-white/5 rounded-full mx-auto" />
            </div>
        </div>
        
        {/* 🪄 Neural Shimmer Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 dark:via-white/[0.02] to-transparent -translate-x-full animate-va-shimmer" />
    </Card>
);

export default UnifiedSkeleton;
