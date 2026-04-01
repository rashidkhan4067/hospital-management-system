import React from 'react';

/**
 * ⚡ Ultra-Modern Input Component
 * Design: Highnd glassmorphic field with floating focus and clinical precision.
 */
export const Input = ({ 
  label, 
  icon: Icon, 
  error, 
  id, 
  className = '', 
  wrapperClassName = '',
  ...props 
}) => {
  return (
    <div className={`space-y-4 ${wrapperClassName}`.trim()}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-[10px] font-black uppercase tracking-[0.4em] text-[#86868b] px-1"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#86868b] group-focus-within:text-[#007aff] transition-colors pointer-events-none">
            <Icon size={18} strokeWidth={1.5} />
          </div>
        )}
        <input 
          id={id}
          className={`
            w-full h-16 bg-[#fbfbfd] border border-slate-100 rounded-3xl px-8 
            ${Icon ? 'pl-16' : ''} 
            text-[#1d1d1f] font-bold text-base placeholder:text-slate-300
            focus:outline-none focus:ring-4 focus:ring-[#007aff]/5 focus:border-[#007aff]/30
            hover:bg-white hover:border-slate-200
            transition-all duration-300
            ${className}
          `.trim()} 
          {...props} 
        />
        
        {/* Animated Underline / Border Detail */}
        <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#007aff]/0 to-transparent group-focus-within:via-[#007aff]/40 transition-all duration-700"></div>
      </div>
      {error && (
        <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest px-1 animate-in fade-in slide-in-from-top-1 duration-300">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
