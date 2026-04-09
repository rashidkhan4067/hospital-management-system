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
    filled: "bg-[#1a73e8] text-white hover:bg-[#1557b0] hover:shadow-md",
    tonal: "bg-[#E8F0FE] text-[#1967D2] hover:bg-[#D2E3FC]",
    outlined: "bg-white border border-[#dadce0] text-[#3c4043] hover:bg-[#F8F9FA]",
    text: "bg-transparent text-[#1a73e8] hover:bg-[#1a73e8]/5",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
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
