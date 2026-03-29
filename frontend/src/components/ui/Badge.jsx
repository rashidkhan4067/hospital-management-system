import React from 'react';

/**
 * Common Badge component for displaying tags or status with glow
 */
export const Badge = ({ children, icon: Icon, className = '', ...props }) => {
  return (
    <div className={`badge-glow ${className}`.trim()} {...props}>
      {Icon && <Icon size={16} />}
      {children}
    </div>
  );
};

export default Badge;
