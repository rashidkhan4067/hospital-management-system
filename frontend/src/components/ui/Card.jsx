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
export const Card = ({ children, className = '', variants, ...props }) => {
  const isMatrix = className.includes('matrix-card');
  
  return (
    <motion.div 
      variants={variants || cardVariants}
      initial="hidden"
      whileInView="show"
      whileHover={!isMatrix ? { y: -5, transition: { duration: 0.2 } } : undefined}
      viewport={{ once: true, margin: "-50px" }}
      className={`${!isMatrix ? "glass-panel" : ""} ${className}`.trim()} 
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

