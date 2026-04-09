import React from 'react';

export default function PageContainer({ children, className = '' }) {
  return (
    <div className={`matrix-container animate-in fade-in duration-500 ${className}`}>
      {children}
    </div>
  );
}
