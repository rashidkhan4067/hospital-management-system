import React from 'react';

/**
 * 🔘 M3 IconButton
 * Standard circular action target (40x40px).
 * Follows Google's "Express" interaction model.
 */
export default function IconButton({ 
  icon: Icon, 
  onClick, 
  active, 
  showDot, 
  ariaLabel,
  className = "" 
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      aria-haspopup="true"
      aria-expanded={active}
      className={`
        relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200
        ${active ? 'bg-primary/10 text-primary' : 'text-text-sub hover:bg-surface'}
        active:scale-90
        ${className}
      `}
    >
      <Icon size={20} strokeWidth={2} />
      {showDot && (
        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-error rounded-full border border-surface-bright" />
      )}
    </button>
  );
}
