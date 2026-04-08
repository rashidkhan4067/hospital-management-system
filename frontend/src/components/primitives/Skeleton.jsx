import React from 'react';

export default function Skeleton({ variant = 'rect', width = 'w-full', height = 'h-4', className = '' }) {
  const baseClasses = 'animate-pulse bg-white/5 border border-white/5 relative overflow-hidden';
  
  const variants = {
    rect: 'rounded-xl',
    circle: 'rounded-full',
    text: 'rounded-md',
  };

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${width} ${height} ${className}`}
    >
      {/* Glint effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-va-shimmer" />
    </div>
  );
}

// Composite skeleton for a card (useful pattern)
export const CardSkeleton = () => (
  <div className="p-6 glass-panel border-white/5 space-y-6">
    <div className="flex items-center gap-4">
      <Skeleton variant="circle" width="w-12" height="h-12" />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" width="w-2/3" />
        <Skeleton variant="text" width="w-1/3" />
      </div>
    </div>
    <Skeleton variant="rect" height="h-32" />
    <div className="flex gap-4">
      <Skeleton variant="rect" width="w-1/2" height="h-10" />
      <Skeleton variant="rect" width="w-1/2" height="h-10" />
    </div>
  </div>
);
