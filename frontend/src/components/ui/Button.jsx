import React from 'react';
import { motion } from 'framer-motion';

/**
 * Common Button component with glassmorphic, glow and motion properties
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
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={combinedClass} 
      disabled={loading} 
      {...props}
    >
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <>
          {Icon && <Icon size={20} />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
