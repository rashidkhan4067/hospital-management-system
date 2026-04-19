import React, { useState } from 'react';
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
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);
  const [showPassword, setShowPassword] = useState(false);

  const isDateType = ['date', 'time', 'datetime-local', 'month'].includes(type);
  const isLabelShrunk = isFocused || hasValue || isDateType || props.value || props.defaultValue;

  const handleInputChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  const { fullWidth, ...inputProps } = props;
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`flex flex-col gap-1.5 group ${fullWidth ? 'w-full' : 'w-auto'}`}>
      <div className="relative">
        
        {/* Leading Icon Shard */}
        {LeftIcon && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 z-30
            ${isFocused ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}
          `}>
             <LeftIcon size={18} strokeWidth={2} />
          </div>
        )}

        {/* Floating Label (Strict MD3 Spec) */}
        <label
          className={`absolute transition-all duration-200 pointer-events-none z-20 px-1 rounded-sm
            ${isLabelShrunk 
              ? `-top-2 left-3 text-xs bg-white font-bold tracking-tight
                 ${isFocused ? 'text-blue-600' : (validation === 'error' ? 'text-red-500' : 'text-gray-500')}` 
              : `${LeftIcon ? 'left-11' : 'left-4'} top-[14px] text-sm text-gray-400 font-medium tracking-tight`}
          `}
        >
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        {/* MD3 Outlined Container */}
        <input
          type={inputType}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={handleInputChange}
          placeholder={isFocused ? placeholder : ''}
          className={`w-full h-[52px] bg-white border rounded-xl text-gray-800 outline-none transition-all text-sm font-medium
            ${LeftIcon ? 'pl-11 pr-4' : 'px-4'}
            ${isFocused 
              ? `border-2 ${validation === 'error' ? 'border-red-500' : 'border-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]'}` 
              : `border-gray-200 group-hover:border-gray-300`}
            ${(type === 'password' || validation) ? 'pr-11' : ''}
          `}
          {...inputProps}
        />

        {/* Trailing Feedback */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-30">
          {validation === 'error' && <AlertCircle size={16} className="text-red-500" />}
          {validation === 'success' && <CheckCircle2 size={16} className="text-green-600" />}
          
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
              tabIndex="-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
      </div>

      {(errorText || helperText) && (
        <span className={`text-[10px] ml-4 font-bold ${errorText ? 'text-red-500' : 'text-gray-400'}`}>
          {errorText || helperText}
        </span>
      )}
    </div>
  );
}
