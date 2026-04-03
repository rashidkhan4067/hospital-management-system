import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Eye, Edit3, Trash2, ShieldAlert } from 'lucide-react';
import { createPortal } from 'react-dom';

/**
 * 🛠️ Table Action Intelligence Shard
 * Highly responsive, smart-positioning portal menu for administrative registries.
 * Detects viewport boundaries to ensure perfect visibility during deep-node orchestration.
 */
export default function TableActions({ row, actions = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const [config, setConfig] = useState({ top: 0, left: 0, strategy: 'down' });

    const handleToggle = (e) => {
        e.stopPropagation();
        const rect = containerRef.current.getBoundingClientRect();
        const APPROX_MENU_HEIGHT = 220; 
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        let top;
        let strategy = 'down';

        if (spaceBelow < APPROX_MENU_HEIGHT && spaceAbove > spaceBelow) {
            // 🔼 UPWARD PROPAGATION (Avoid bottom occlusion)
            top = rect.top + window.scrollY - APPROX_MENU_HEIGHT + 10;
            strategy = 'up';
        } else {
            // 🔽 DOWNWARD PROPAGATION (Standard path)
            top = rect.bottom + window.scrollY + 8;
            strategy = 'down';
        }

        setConfig({
            top,
            left: Math.max(10, rect.right - 180 + window.scrollX),
            strategy
        });
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const close = () => setIsOpen(false);
        if (isOpen) {
            window.addEventListener('click', close);
            // 🛡️ Persistent Engagement: Scroll listener removed to allow inspection while scrolling
        }
        return () => window.removeEventListener('click', close);
    }, [isOpen]);

    const defaultActions = [
        { label: 'View Shard', icon: Eye, onClick: () => console.log('Viewing', row) },
        { label: 'Modify Node', icon: Edit3, onClick: () => console.log('Editing', row) },
        { label: 'Terminate Shard', icon: Trash2, onClick: () => console.log('Deleting', row), variant: 'danger' },
    ];

    const displayActions = actions.length > 0 ? actions : defaultActions;

    return (
        <div className="relative inline-block" ref={containerRef}>
            <button 
                onClick={handleToggle}
                className={`p-2.5 rounded-xl transition-all shadow-inner active:scale-90 ${
                    isOpen 
                        ? 'bg-accent-primary text-white shadow-lg' 
                        : 'bg-slate-50 dark:bg-slate-800/40 text-slate-400 hover:text-accent-primary hover:bg-accent-primary/10'
                }`}
            >
                <MoreHorizontal size={14} className={isOpen ? 'rotate-90 transition-transform duration-300' : 'transition-transform duration-300'} />
            </button>

            {isOpen && createPortal(
                <AnimatePresence>
                    <motion.div 
                        initial={{ 
                            opacity: 0, 
                            scale: 0.95, 
                            y: config.strategy === 'up' ? 20 : -20 
                        }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ 
                            opacity: 0, 
                            scale: 0.95, 
                            y: config.strategy === 'up' ? 20 : -20 
                        }}
                        style={{ 
                            position: 'absolute', 
                            top: config.top, 
                            left: config.left,
                            zIndex: 999999
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-white/10 p-2 overflow-hidden backdrop-blur-3xl"
                    >
                        <div className="space-y-1">
                            {displayActions.map((action, idx) => {
                                const Icon = action.icon;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
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
                                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-0 group-hover:opacity-20 transition-opacity" />
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-white/5 px-4 py-2 flex items-center gap-2 opacity-30">
                             <ShieldAlert size={10} />
                             <span className="text-[7px] font-black uppercase tracking-tighter">HARDENED NODE OPERATION</span>
                        </div>
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}
