import React from 'react';

export default function Avatar({ src, name, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-xl',
  };

  const initials = name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

  return (
    <div className={`relative flex-shrink-0 group ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={name || 'User Avatar'} 
          className={`${sizes[size]} rounded-full object-cover border-2 border-white/10 group-hover:border-blue-500/50 transition-all duration-300`}
        />
      ) : (
        <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white border-2 border-white/10 group-hover:scale-105 transition-transform`}>
          {initials}
        </div>
      )}
      <div className="absolute inset-0 rounded-full bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-[8px] -z-10" />
    </div>
  );
}
