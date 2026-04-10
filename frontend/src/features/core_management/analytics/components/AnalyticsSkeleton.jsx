import React from 'react';

export const ShimmerCard = ({ height = '220px', className = '' }) => (
  <div 
    className={`bg-surface-bright border border-outline rounded-2xl p-8 relative overflow-hidden animate-pulse ${className}`}
    style={{ height }}
  >
    <div className="flex items-center justify-between mb-8">
      <div className="w-12 h-12 bg-surface rounded-xl" />
      <div className="w-16 h-6 bg-surface/50 rounded-full" />
    </div>
    <div className="flex flex-col items-center gap-4">
      <div className="w-32 h-10 bg-surface rounded-lg" />
      <div className="w-24 h-4 bg-surface/50 rounded" />
    </div>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
);

export const TableSkeleton = () => (
  <div className="bg-surface-bright border border-outline rounded-2xl overflow-hidden animate-pulse">
    <div className="p-8 border-b border-outline/30 flex justify-between">
      <div className="w-48 h-8 bg-surface rounded" />
      <div className="flex gap-2">
        <div className="w-24 h-10 bg-surface/50 rounded-xl" />
        <div className="w-24 h-10 bg-surface rounded-xl" />
      </div>
    </div>
    <div className="p-8 space-y-6">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="flex justify-between items-center pb-4 border-b border-outline/10 last:border-0">
          <div className="w-40 h-5 bg-surface rounded" />
          <div className="w-20 h-5 bg-surface/50 rounded" />
          <div className="w-24 h-5 bg-surface rounded" />
          <div className="w-16 h-8 bg-surface/50 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

export const ChartSkeleton = () => (
    <div className="bg-surface-bright border border-outline rounded-2xl p-6 h-[400px] animate-pulse flex flex-col">
        <div className="flex justify-between items-start mb-8">
            <div className="space-y-2">
                <div className="w-32 h-4 bg-surface rounded" />
                <div className="w-48 h-6 bg-surface/50 rounded" />
            </div>
            <div className="w-10 h-10 bg-surface/50 rounded-xl" />
        </div>
        <div className="flex-1 flex flex-col justify-end gap-2">
            <div className="flex items-end gap-4 h-full px-4">
                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                    <div key={i} className="flex-1 bg-surface/50 rounded-t-lg" style={{ height: `${h}%` }} />
                ))}
            </div>
            <div className="h-4 w-full bg-surface/50 rounded mt-4" />
        </div>
    </div>
);
