import React from 'react';
import { motion } from 'framer-motion';
import SEO from './SEO';

/**
 * Standard Page Container for all application pages
 * Handles SEO, Accessibility, and standard entry animations
 */
const PageContainer = ({ 
  children, 
  title, 
  description, 
  className = "",
  animate = true,
  maxWidth = "xl" // 'md', 'lg', 'xl', 'full'
}) => {
  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const maxWidthClasses = {
    'md': 'max-w-4xl',
    'lg': 'max-w-6xl',
    'xl': 'max-w-[1600px]',
    'full': 'max-w-none'
  };

  return (
    <motion.div
      className={`page-container min-h-full w-full ${className}`}
      initial={animate ? "initial" : false}
      animate={animate ? "animate" : false}
      exit="exit"
      variants={containerVariants}
    >
      {/* Dynamic SEO Head Management */}
      <SEO title={title} description={description} />
      
      <div className={`mx-auto ${maxWidthClasses[maxWidth] || maxWidthClasses.xl} px-4 py-6 md:px-8 md:py-10 lg:px-12 lg:py-14`}>
        {children}
      </div>
    </motion.div>
  );
};

export default PageContainer;
