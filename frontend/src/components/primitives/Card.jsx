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
        return 'bg-[#E8F0FE] border-transparent';
      case 'outlined':
        return 'bg-white border-[#DADCE0]';
      case 'elevator':
        return 'bg-white border-transparent shadow-xl shadow-slate-200/50';
      case 'flat':
      default:
        return 'bg-white border-[#DADCE0]';
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
