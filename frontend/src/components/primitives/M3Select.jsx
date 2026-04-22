import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, AlertCircle, Check, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 🎨 M3Select (Pro Edition)
 * Custom Material Design 3 Dropdown that ensures downward expansion and premium aesthetics.
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
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);

    const hasValue = value !== undefined && value !== null && value !== "";
    const selectedOption = options.find(opt => String(opt.value) === String(value));
    const isLabelShrunk = isOpen || hasValue;

    // Filtered options for quick search
    const filteredOptions = options.filter(opt => 
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        // Mocking an event object for compatibility with existing onChange
        const event = {
            target: { value: option.value, name: id },
            preventDefault: () => {},
            stopPropagation: () => {}
        };
        onChange(event);
        setIsOpen(false);
        setSearchTerm("");
    };

    return (
        <div className={`flex flex-col gap-1.5 w-full group relative ${className}`} ref={dropdownRef}>
            <div 
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`relative rounded-xl border transition-all duration-300 bg-white
                    ${error ? 'border-[var(--m3-error)]' : (isOpen ? 'border-[var(--m3-primary)] ring-[1px] ring-[var(--m3-primary)] shadow-md' : 'border-[var(--m3-outline)] group-hover:border-[var(--m3-text-main)]')}
                    ${disabled ? 'opacity-40 cursor-not-allowed bg-[var(--m3-surface-container)]' : 'cursor-pointer'}
                    min-h-[56px] flex items-center
                `}
            >
                {LeftIcon && (
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10 transition-all duration-300
                        ${isOpen ? 'text-[var(--m3-primary)] scale-110' : 'text-slate-400 group-hover:text-slate-600'}
                    `}>
                        <LeftIcon size={18} strokeWidth={2.2} />
                    </div>
                )}

                {/* Floating Label */}
                <label
                    className={`absolute transition-all duration-300 pointer-events-none z-30
                        ${isLabelShrunk 
                        ? `-top-3 ${LeftIcon ? 'left-9' : 'left-3'} px-1.5 py-0.5 text-[10px] font-black bg-white tracking-widest uppercase
                            ${isOpen ? 'text-[var(--m3-primary)]' : (error ? 'text-[var(--m3-error)]' : 'text-slate-400 group-hover:text-slate-600')}` 
                        : `${LeftIcon ? 'left-11' : 'left-4'} top-1/2 -translate-y-1/2 text-[14px] text-slate-400 font-bold tracking-wide`}
                    `}
                >
                    {label}{required && !isLabelShrunk && <span className="ml-0.5 text-[var(--m3-error)]">*</span>}
                </label>

                {/* Display Value */}
                <div className={`w-full ${LeftIcon ? 'pl-11' : 'px-4'} pr-10 text-[15px] font-bold text-slate-800 truncate h-full flex items-center`}>
                    {isOpen ? (
                        <input 
                            autoFocus
                            type="text"
                            placeholder="Type to search..."
                            className="w-full bg-transparent outline-none text-[14px] font-bold placeholder-slate-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    ) : (
                        hasValue ? (
                            <span className="text-slate-800">{selectedOption?.label}</span>
                        ) : (
                            isLabelShrunk ? (
                                <span className="text-slate-300 font-bold opacity-70">{placeholder}</span>
                            ) : null
                        )
                    )}
                </div>

                <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300
                    ${isOpen ? 'text-[var(--m3-primary)] rotate-180' : 'text-[var(--m3-text-sub)] group-hover:text-[var(--m3-text-main)]'}
                `}>
                    <ChevronDown size={20} strokeWidth={2} />
                </div>
            </div>

            {/* Premium Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 4, scaleY: 1 }}
                        exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                        style={{ originY: 0 }}
                        className="absolute left-0 top-full w-full bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-[100] max-h-[300px] overflow-y-auto custom-scrollbar"
                    >
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => (
                                <div
                                    key={opt.value}
                                    onClick={() => handleSelect(opt)}
                                    className={`
                                        flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-150
                                        ${String(value) === String(opt.value) 
                                            ? 'bg-[var(--m3-primary)]/10 text-[var(--m3-primary)] font-bold' 
                                            : 'hover:bg-slate-50 text-slate-700 font-medium'}
                                    `}
                                >
                                    <span className="text-[14px]">{opt.label}</span>
                                    {String(value) === String(opt.value) && (
                                        <Check size={16} strokeWidth={3} />
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-slate-400 text-sm italic">
                                No matching shards found
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <div className="flex items-center gap-1.5 ml-4 mt-1 text-[var(--m3-error)]">
                    <AlertCircle size={14} strokeWidth={2} />
                    <span className="text-[11px] font-medium leading-none tracking-tight">{error}</span>
                </div>
            )}
        </div>
    );
}
