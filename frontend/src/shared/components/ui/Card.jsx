import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    } 
  }
};

/**
 * Common Card component with glassmorphism and motion support
 */
export const Card = ({ children, className = '', ...props }) => {
  const isMatrix = className.includes('matrix-card');
  
  return (
    <div 
      className={`${!isMatrix ? "glass-panel" : ""} w-full ${className}`.trim()} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

