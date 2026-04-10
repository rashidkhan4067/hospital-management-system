import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🛰️ M3Button Primitive (Google Standard)
 * Implements Material 3 Button Tokenology: Filled, Tonal, Outlined, and Text.
 */
export default function Button({ 
  children, 
  variant = 'filled', 
  size = 'md', 
  icon: Icon, 
  className = '', 
  ...props 
}) {
  
  const baseStyles = "inline-flex items-center justify-center gap-3 font-bold transition-all active:scale-[0.97] rounded-full whitespace-nowrap";
  
  const variants = {
    filled: "bg-primary text-surface-bright hover:shadow-lg transition-all",
    tonal: "bg-primary/15 text-primary hover:bg-primary/25",
    outlined: "bg-surface-bright border border-outline text-text-main hover:bg-surface hover:border-outline-variant",
    text: "bg-transparent text-primary hover:bg-primary/5",
    danger: "bg-error/10 text-error hover:bg-error/20"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-[11px] uppercase tracking-wider",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : 18} />}
      {children}
    </motion.button>
  );
}
