import React from 'react';
import { motion } from 'framer-motion';

/**
 * Common PageHeader component with breadcrumbs or subtitle and motion
 */
export const PageHeader = ({ title, subtitle, badge: BadgeComponent, className = '' }) => {
  return (
    <header className={`page-header ${className}`.trim()}>
      {BadgeComponent && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4"
        >
          {BadgeComponent}
        </motion.div>
      )}
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-gradient"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="subtitle"
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
};

export default PageHeader;
