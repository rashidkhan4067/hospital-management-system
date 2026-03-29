import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Common Alert component for displaying error or info messages
 */
export const Alert = ({ children, variant = 'error', className = '', icon: Icon = AlertCircle, ...props }) => {
  const baseClass = variant === 'error' ? 'error-box' : 'info-box'; // Assuming info-box could exist later
  return (
    <div className={`${baseClass} ${className}`.trim()} {...props}>
      <Icon size={24} />
      <span>{children}</span>
    </div>
  );
};

export default Alert;
