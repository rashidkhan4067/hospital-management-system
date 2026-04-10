import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function M3TextField({ label, placeholder, type = "text", helperText, ...props }) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 🏥 M3 Rule: Certain types always have internal browser placeholders
  const isDateType = ['date', 'time', 'datetime-local', 'month'].includes(type);
  const isLabelShrunk = isFocused || hasValue || isDateType || props.value || props.defaultValue;

  const handleInputChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  const { fullWidth, ...inputProps } = props;

  // Determine dynamic type for password visibility toggle
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`flex flex-col gap-1.5 group ${fullWidth ? 'w-full' : 'w-auto'}`}>
      <div className="relative pt-2">
        {/* Floating Label Logic (M3 Cutout Effect) */}
        <label
          className={`absolute left-3 transition-all duration-200 pointer-events-none z-20 px-2
            ${isLabelShrunk 
              ? `-top-2 text-xs bg-surface-bright font-medium transition-colors ${isFocused ? 'text-primary' : 'text-text-sub'}` 
              : `top-5 text-[16px] text-text-sub transition-colors`}
          `}
        >
          {label}
        </label>

        {/* Input Field */}
        <input
          type={inputType}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={handleInputChange}
          placeholder={isFocused ? placeholder : ''}
          className={`w-full px-4 py-3.5 bg-surface-bright border rounded-xl text-text-main outline-none transition-all text-[16px]
            ${isFocused 
              ? 'border-primary border-2 px-[15px] py-[13.5px]' 
              : 'border-outline border-[1px]'}
            ${isDateType ? 'cursor-text min-h-[56px]' : 'min-h-[56px]'}
            ${type === 'password' ? 'pr-12' : ''}
          `}
          {...inputProps}
        />

        {/* 👁️ Password Visibility Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 p-2 text-text-sub hover:bg-surface rounded-full transition-colors z-30"
            tabIndex="-1"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {helperText && (
        <span className="text-[12px] text-text-sub ml-4 font-medium tracking-wide transition-colors">
          {helperText}
        </span>
      )}
    </div>
  );
}
