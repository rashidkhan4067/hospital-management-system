import React, { useState } from 'react';

export default function M3TextField({ label, placeholder, type = "text", helperText, ...props }) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  // 🏥 M3 Rule: Certain types always have internal browser placeholders
  const isDateType = ['date', 'time', 'datetime-local', 'month'].includes(type);
  const isLabelShrunk = isFocused || hasValue || isDateType || props.value || props.defaultValue;

  const handleInputChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full group">
      <div className="relative pt-2">
        {/* Floating Label Logic (M3 Cutout Effect) */}
        <label
          className={`absolute left-3 transition-all duration-200 pointer-events-none z-20 px-2
            ${isLabelShrunk 
              ? `-top-2 text-xs bg-white font-medium ${isFocused ? 'text-[#1A73E8]' : 'text-[#79747E]'}` 
              : 'top-5 text-[16px] text-[#79747E]'}
          `}
        >
          {label}
        </label>

        {/* Input Field */}
        <input
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={handleInputChange}
          placeholder={isFocused ? placeholder : ''}
          className={`w-full px-4 py-3.5 bg-white border rounded-xl text-slate-900 outline-none transition-all text-[16px]
            ${isFocused 
              ? 'border-[#1A73E8] border-2 px-[15px] py-[13.5px]' 
              : 'border-[#79747E] border-[1px]'}
            ${isDateType ? 'cursor-text min-h-[56px]' : 'min-h-[56px]'}
          `}
          {...props}
        />
      </div>



      {helperText && (
        <span className="text-[12px] text-[#79747E] ml-4 font-medium tracking-wide">
          {helperText}
        </span>
      )}
    </div>
  );
}
