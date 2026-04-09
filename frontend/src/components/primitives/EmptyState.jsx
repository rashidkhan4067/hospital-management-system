import React from 'react';
import { Button } from './index';

/**
 * 🍃 EmptyState (Google Standard Onboarding)
 * Used when a clinical dataset (Patients, Appointments) is null.
 * Features a high-focus focal point and a primary action trigger.
 */
export default function EmptyState({ 
  title = "No records found",
  message = "This database shard is currently disconnected or empty.", 
  icon: Icon,
  actionLabel,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
        {Icon ? (
          <Icon className="w-10 h-10 text-slate-300" />
        ) : (
          <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse" />
        )}
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-slate-500 font-medium max-w-[280px] leading-relaxed mb-10">
        {message}
      </p>

      {actionLabel && (
        <Button onClick={onAction} className="px-10 h-14 text-xs font-bold uppercase tracking-widest">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
