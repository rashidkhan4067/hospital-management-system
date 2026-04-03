import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Eye, Edit3, Trash2, ShieldAlert } from 'lucide-react';
import { createPortal } from 'react-dom';

/**
 * 🛠️ Table Action Intelligence Shard
 * Highly responsive, smart-positioning portal menu for administrative registries.
 * Detects viewport boundaries to ensure perfect visibility during deep-node orchestration.
 */
/**
 * 🛠️ Table Actions Menu
 * A responsive, smart-positioning menu for table records.
 */
export default function TableActions({ row, actions = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const [config, setConfig] = useState({ top: 0, left: 0, strategy: 'down' });

    const handleToggle = (e) => {
        e.stopPropagation();
        const rect = containerRef.current.getBoundingClientRect();
        
        // Estimate menu height based on number of actions (approx 44px per action + padding)
        const ESTIMATED_HEIGHT = (actions.length || 3) * 44 + 40; 
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        let top;
        let strategy = 'down';

        if (spaceBelow < ESTIMATED_HEIGHT && spaceAbove > spaceBelow) {
            // Open upwards if not enough space below
            top = rect.top + window.scrollY - ESTIMATED_HEIGHT;
            strategy = 'up';
        } else {
            // Open downwards
            top = rect.bottom + window.scrollY + 8;
            strategy = 'down';
        }

        setConfig({
            top: Math.max(10, top), // Don't go above screen
            left: Math.max(10, rect.right - 180 + window.scrollX),
            strategy
        });
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const close = () => setIsOpen(false);
        if (isOpen) {
            window.addEventListener('click', close);
        }
        return () => window.removeEventListener('click', close);
    }, [isOpen]);

    const displayActions = actions.length > 0 ? actions : [
        { label: 'View Details', icon: Eye, onClick: () => console.log('Viewing', row) },
        { label: 'Edit Record', icon: Edit3, onClick: () => console.log('Editing', row) },
        { label: 'Delete Record', icon: Trash2, onClick: () => console.log('Deleting', row), variant: 'danger' },
    ];

    return (
        <div className="relative inline-block" ref={containerRef}>
            <button 
                onClick={handleToggle}
                className={`p-2.5 rounded-xl transition-all active:scale-95 ${
                    isOpen 
                        ? 'bg-accent-primary text-white shadow-lg' 
                        : 'bg-slate-50 dark:bg-slate-800/40 text-slate-400 hover:text-accent-primary hover:bg-accent-primary/10'
                }`}
                aria-label="Actions"
            >
                <MoreHorizontal size={14} className={isOpen ? 'rotate-90 transition-transform' : 'transition-transform'} />
            </button>

            {isOpen && createPortal(
                <AnimatePresence>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: config.strategy === 'up' ? 10 : -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: config.strategy === 'up' ? 10 : -10 }}
                        style={{ 
                            position: 'absolute', 
                            top: config.top, 
                            left: config.left,
                            zIndex: 999999 // Ensure it's above everything including modals
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-white/10 p-2 backdrop-blur-xl"
                    >
                        <div className="space-y-1">
                            {displayActions.map((action, idx) => {
                                const Icon = action.icon;
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            action.onClick(row);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all group ${
                                            action.variant === 'danger' 
                                                ? 'text-rose-500 hover:bg-rose-500/10' 
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-accent-primary'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {Icon && <Icon size={14} strokeWidth={2.5} />}
                                            {action.label}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}
