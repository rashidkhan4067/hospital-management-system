import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

/**
 * 🎨 M3Select
 * Senior UX Optimized Material Design 3 Dropdown.
 */
export default function M3Select({ 
    label, 
    id, 
    value, 
    onChange, 
    options = [], 
    required = false, 
    disabled = false, 
    error = null,
    className = "",
    placeholder = "Select Option",
    icon: LeftIcon,
    ...props 
}) {
    return (
        <div className={`flex flex-col gap-1.5 w-full group relative ${className}`}>
            {label && (
                <div className="flex items-center gap-1 ml-4 h-4">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        {label}
                    </span>
                    {required && <span className="text-red-500 text-[12px]">*</span>}
                </div>
            )}
            
            <div className={`relative overflow-hidden rounded-xl border transition-all duration-200 bg-white
                ${error ? 'border-red-500' : 'border-gray-200 group-hover:border-gray-300 focus-within:border-2 focus-within:border-blue-600 focus-within:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]'}
                ${disabled ? 'opacity-40 cursor-not-allowed grayscale bg-gray-50' : 'cursor-pointer'}
            `}>
                {LeftIcon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 z-10 transition-colors group-focus-within:text-blue-600">
                        <LeftIcon size={18} strokeWidth={2} />
                    </div>
                )}

                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={`
                        w-full h-[52px] min-h-[52px] pr-10 
                        text-sm font-medium text-gray-800 block appearance-none cursor-pointer
                        bg-transparent outline-none border-none
                        ${LeftIcon ? 'pl-11' : 'px-4'}
                    `}
                    {...props}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((opt) => (
                        <option 
                            key={opt.value} 
                            value={opt.value} 
                            className="bg-white text-gray-800"
                        >
                            {opt.label}
                        </option>
                    ))}
                </select>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-gray-500 transition-opacity">
                    <ChevronDown size={18} strokeWidth={2} />
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-1.5 ml-4 mt-1 animate-in slide-in-from-top-1 text-red-500">
                    <AlertCircle size={10} strokeWidth={3} />
                    <span className="text-[10px] font-bold leading-none">{error}</span>
                </div>
            )}
        </div>
    );
}
