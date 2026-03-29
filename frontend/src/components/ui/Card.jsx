import React from 'react';

/**
 * Common Card component with glassmorphism
 */
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`glass-panel ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

export default Card;
