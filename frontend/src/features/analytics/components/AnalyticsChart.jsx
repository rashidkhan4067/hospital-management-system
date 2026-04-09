import React from 'react';
import { Card, Skeleton, EmptyState, Button } from '@/components/primitives';
import { UI_TOKENS } from '@/core/config/UI';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * 📈 AnalyticsChart Shell
 * Standardized Material 3 container for all Recharts instances.
 * Handles loading states, empty clusters, and clinical error triage.
 */
export default function AnalyticsChart({ 
  title, 
  subtitle, 
  children, 
  loading, 
  error,
  isEmpty,
  onRetry,
  className = '',
  action
}) {
  return (
    <Card className={`flex flex-col h-[460px] bg-white border border-slate-200 rounded-3xl transition-all ${className}`}>
        {/* 📟 Header Shard (Console Standard) */}
        <div className="p-6 flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-1">
                  {subtitle}
                </span>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-none">
                  {title}
                </h3>
            </div>
            {action && <div className="shrink-0 scale-90 origin-right">{action}</div>}
        </div>

        {/* 📉 Data Content Shell */}
        <div className="flex-1 min-h-0 relative px-6 pb-6">
            {loading ? (
                <div className="absolute inset-0 px-8 pb-8 flex flex-col gap-4">
                    <div className="flex-1 flex items-end gap-2">
                      {[60, 40, 75, 45, 90, 50, 65].map((h, i) => (
                        <Skeleton key={i} className="flex-1" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                </div>
            ) : error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-red-50/10 text-center animate-in fade-in duration-300">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4">
                        <AlertCircle size={24} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Telemtry Error</h4>
                    <p className="text-[11px] text-slate-400 max-w-[200px] mb-4">Failed to synchronize clinical data with the backend unit.</p>
                    <Button 
                      variant="outlined" 
                      onClick={onRetry} 
                      className="h-9 text-[10px] gap-2 border-red-100 text-red-600 hover:bg-red-50"
                    >
                      <RefreshCw size={12} />
                      Retry Triage
                    </Button>
                </div>
            ) : isEmpty ? (
                <div className="absolute inset-0">
                  <EmptyState 
                    title="No Clinical Data" 
                    description="The selected shard contains no active telemetry for this period."
                    className="h-full"
                  />
                </div>
            ) : (
                <div className="w-full h-full">
                    {children}
                </div>
            )}
        </div>
    </Card>
  );
}
