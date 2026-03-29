import React from 'react';

/**
 * Common Button component with glassmorphic and glow properties
 */
export const Button = ({ 
  children, 
  variant = 'primary', 
  glow = true, 
  loading = false, 
  className = '', 
  icon: Icon,
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = variant === 'primary' ? 'btn-primary' : 'social-btn';
  const glowClass = glow ? 'btn-glow' : '';
  const combinedClass = `${baseClass} ${variantClass} ${glowClass} ${className}`.trim();

  return (
    <button className={combinedClass} disabled={loading} {...props}>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <>
          {Icon && <Icon size={20} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
