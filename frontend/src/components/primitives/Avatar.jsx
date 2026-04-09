import React from 'react';

export default function Avatar({ src, alt, size = 'md', className = '' }) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };
  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 ${className}`}>
      {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-200" />}
    </div>
  );
}
