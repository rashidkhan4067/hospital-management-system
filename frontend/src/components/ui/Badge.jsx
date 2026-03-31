import React from 'react';
import { motion } from 'framer-motion';

/**
 * Common Badge component for displaying tags or status with glow and motion support
 */
export const Badge = ({ children, icon: Icon, className = '', ...props }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`badge-glow ${className}`.trim()} 
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.div>
  );
};

export default Badge;
