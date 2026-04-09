import React from 'react';

/**
 * 🦴 Skeleton (Material 3 Spec)
 * Implements a high-fidelity shimmer gradient for clinical data triage.
 * Follows Google's "Load Content, Not Spinners" philosophy.
 */
export default function Skeleton({ className = '', variant = 'rect' }) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circle': return 'rounded-full';
      case 'text': return 'h-4 rounded-full';
      default: return 'rounded-[12px]';
    }
  };

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${getVariantStyles()} ${className}`}>
      {/* 🔮 Shimmer Gradient Layer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent shadow-[0_0_100px_rgba(255,255,255,0.5)]" />
      
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
