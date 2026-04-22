import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * 🏥 M3TextField
 * Senior UX Optimized Material Design 3 Input.
 */
export default function M3TextField({ 
  label, 
  placeholder, 
  type = "text", 
  helperText, 
  validation, 
  errorText,
  icon: LeftIcon,
  multiline = false,
  rows = 3,
  variant = "outlined", // "outlined" or "filled"
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);
  const [showPassword, setShowPassword] = useState(false);

  const isDateType = ['date', 'time', 'datetime-local', 'month'].includes(type);
  
  // 🛡️ Robust Label Shrinkage (Handles numeric 0, external updates, and date types)
  const incomingValue = props.value !== undefined && props.value !== null && props.value !== "";
  const defaultHasValue = props.defaultValue !== undefined && props.defaultValue !== null && props.defaultValue !== "";
  const isLabelShrunk = isFocused || hasValue || isDateType || incomingValue || defaultHasValue;

  const handleInputChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  // 🧪 Autofill Resilience: Check DOM value directly for browser-filled content
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current?.value) setHasValue(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const inputRef = useRef(null);
  const { fullWidth, className = "", ...inputProps } = props;
  const inputType = type === 'password' && showPassword ? 'text' : type;
  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className={`flex flex-col gap-1.5 group ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}>
      <div className={`relative transition-all duration-300 rounded-t-xl
        ${variant === 'filled' ? 'bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-variant)]' : ''}
      `}>
        
        {/* Leading Icon */}
        {LeftIcon && !multiline && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-200 z-30
            ${isFocused ? 'text-[var(--m3-primary)] scale-110' : 'text-[var(--m3-text-sub)] group-hover:text-[var(--m3-text-main)]'}
          `}>
             <LeftIcon size={20} strokeWidth={1.8} />
          </div>
        )}

        {/* Floating Label */}
        <label
          className={`absolute transition-all duration-200 pointer-events-none z-20
            ${isLabelShrunk 
              ? `${variant === 'filled' ? 'top-1' : '-top-2.5'} left-3 text-[10px] ${variant === 'filled' ? 'bg-transparent' : 'bg-white px-1.5'} font-black uppercase tracking-widest
                 ${isFocused ? 'text-[var(--m3-primary)]' : (validation === 'error' ? 'text-[var(--m3-error)]' : 'text-slate-400 group-hover:text-slate-600')}` 
              : `${LeftIcon && !multiline ? 'left-11' : 'left-4'} ${variant === 'filled' ? 'top-6' : 'top-1/2 -translate-y-1/2'} text-[14px] text-slate-400 font-medium tracking-wide`}
          `}
        >
          {label}
        </label>

        {/* Input/Textarea */}
        <InputComponent
          ref={inputRef}
          type={multiline ? undefined : inputType}
          rows={multiline ? rows : undefined}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={handleInputChange}
          placeholder={isFocused && !isDateType ? placeholder : ''}
          required={props.required}
          className={`w-full bg-transparent outline-none transition-all duration-200 text-[16px] font-normal text-[var(--m3-text-main)]
            ${multiline ? 'pt-7 pb-3 px-4 resize-none min-h-[100px]' : (variant === 'filled' ? 'h-[64px] pt-6' : 'h-[56px]')}
            ${LeftIcon && !multiline ? 'pl-11 pr-4' : 'px-4'}
            ${variant === 'outlined' 
                ? `border rounded-xl ${isFocused ? 'border-[var(--m3-primary)] ring-[1px] ring-[var(--m3-primary)]' : (validation === 'error' ? 'border-[var(--m3-error)]' : 'border-[var(--m3-outline)] group-hover:border-[var(--m3-text-main)]')}` 
                : `border-b-2 rounded-t-xl ${isFocused ? 'border-[var(--m3-primary)]' : (validation === 'error' ? 'border-[var(--m3-error)]' : 'border-[var(--m3-outline)] group-hover:border-[var(--m3-text-main)]')}`
            }
            ${(type === 'password' || validation) && !multiline ? 'pr-11' : ''}
          `}
          style={{ WebkitAppearance: isDateType ? 'none' : undefined }}
          {...inputProps}
        />

        {/* Trailing Feedback */}
        {!multiline && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-30">
            {validation === 'error' && <AlertCircle size={18} className="text-[var(--m3-error)]" />}
            {validation === 'success' && <CheckCircle2 size={18} className="text-[var(--m3-success)]" />}
            
            {type === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 text-[var(--m3-text-sub)] hover:bg-[var(--m3-surface-variant)] rounded-full transition-colors"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
          </div>
        )}
      </div>

      {(errorText || helperText) && (
        <span className={`text-[11px] ml-4 font-medium tracking-tight ${errorText ? 'text-[var(--m3-error)]' : 'text-[var(--m3-text-sub)]'}`}>
          {errorText || helperText}
        </span>
      )}
    </div>
  );
}
