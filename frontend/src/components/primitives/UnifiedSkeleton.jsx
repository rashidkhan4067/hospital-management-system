import React from 'react';
import Skeleton from './Skeleton';

export default function UnifiedSkeleton({ type = 'card' }) {
  if (type === 'card') {
    return (
      <div className="p-6 bg-white border border-slate-100 rounded-[24px] flex flex-col gap-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-10 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-3 w-12 rounded-full" />
          <Skeleton className="h-3 w-12 rounded-full" />
        </div>
      </div>
    );
  }
  
  return <Skeleton className="w-full h-8" />;
}
