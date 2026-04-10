import React from 'react';

/**
 * 🧱 Material 3 Card (Enterprise Spec)
 * The fundamental surface primitive for all clinical data sharding.
 * Follows the high-density 'Flat Surface' rule from Google Cloud Console.
 */
export default function Card({ 
  children, 
  className = '', 
  padded = true, 
  variant = 'flat', // flat, tonal, outlined, elevator
  onClick 
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'tonal':
        return 'bg-primary/10 border-transparent';
      case 'outlined':
        return 'bg-surface-bright border-outline';
      case 'elevator':
        return 'bg-surface-bright border-transparent shadow-xl shadow-slate-900/10 dark:shadow-black/40';
      case 'flat':
      default:
        return 'bg-surface-bright border-outline';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`
        rounded-3xl border transition-all duration-300
        ${padded ? 'p-6 md:p-8' : 'p-0'}
        ${getVariantStyles()}
        ${onClick ? 'cursor-pointer hover:border-[#1A73E8] active:scale-[0.99]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
