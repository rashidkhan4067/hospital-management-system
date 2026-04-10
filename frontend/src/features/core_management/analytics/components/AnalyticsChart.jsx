import React from 'react';
import { Card, Skeleton, EmptyState, Button } from '@/components/primitives';
import { AlertCircle } from 'lucide-react';

/**
 * 📈 AnalyticsChart Shell (Performance & Geometry Optimized)
 * Features an expanded 440px tactical footprint to prevent chart clipping.
 */
export default function AnalyticsChart({ 
  title, 
  subtitle, 
  children, 
  loading, 
  error,
  isEmpty,
  onRetry,
  onAddData,
  className = '',
  action
}) {
  return (
    <Card className={`flex flex-col h-[400px] md:h-[440px] bg-surface-bright border border-outline/30 rounded-[32px] overflow-hidden transition-all duration-300 ${className}`}>
        
        {/* 📟 Header Shard */}
        <div className="px-6 pt-6 pb-2 flex items-start justify-between relative z-20 bg-surface-bright/80 backdrop-blur-sm">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.25em] leading-none mb-1">
                  {subtitle}
                </span>
                <h3 className="text-lg font-black text-text-main tracking-tighter leading-tight">
                  {title}
                </h3>
            </div>
            {action && <div className="hidden sm:block shrink-0 scale-90 origin-right">{action}</div>}
        </div>

        {/* 📉 Data Content Shell */}
        <div className="flex-1 min-h-0 relative z-10">
            {loading ? (
                <div className="absolute inset-0 px-8 pb-12 flex flex-col gap-4">
                    <div className="flex-1 flex items-end gap-2">
                      {[60, 40, 75, 45, 90, 60, 50].map((h, i) => (
                        <Skeleton key={i} className="flex-1 bg-outline/10" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                </div>
            ) : error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <AlertCircle size={32} className="text-error mb-4 opacity-20" />
                    <Button variant="outlined" size="sm" onClick={onRetry} className="h-10 text-[10px] rounded-full">Recalibrate Intelligence</Button>
                </div>
            ) : isEmpty ? (
                <div className="h-full flex items-center justify-center">
                    <EmptyState 
                        title="No Operational Telemetry" 
                        message="This clinical shard is currently empty for the selected filters."
                        actionLabel="Add Appointment"
                        onAction={onAddData}
                    />
                </div>
            ) : (
                <div className="w-full h-full px-2 pb-6">
                    {children}
                </div>
            )}
        </div>
    </Card>
  );
}
