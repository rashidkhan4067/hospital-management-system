import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDataStore } from '@/core/store/useDataStore';
import { Search, Filter, RefreshCw, ChevronDown, Calendar, Database } from 'lucide-react';
import { SegmentedControl } from '@/components/primitives';

/**
 * 🛠️ DashboardToolbar (Architectural Pattern)
 * Fully composed of shared primitives (SegmentedControl, SearchInputs).
 */
const DashboardToolbar = () => {
    const filters = useDataStore(state => state.filters);
    const setFilters = useDataStore(state => state.setFilters);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 800);
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-primary tracking-[0.2em]">Operational Context: {filters.dateRange} / {filters.department}</span>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
                <div className="w-full flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 bg-surface-bright/80 p-2 md:p-3 rounded-[32px] border border-outline/30 shadow-sm backdrop-blur-xl transition-all">
                    
                    {/* 🔳 SHARED PRIMITIVE: SegmentedControl */}
                    <SegmentedControl 
                        value={filters.dateRange}
                        onChange={(val) => setFilters({ dateRange: val })}
                        options={[
                            { label: 'Today', val: 'Today' },
                            { label: 'Week', val: 'Week' },
                            { label: 'Month', val: 'Month' }
                        ]}
                    />

                    <div className="hidden md:block h-10 w-[1px] bg-outline/20 mx-1" />

                    <div className="flex-1 relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-sub opacity-40 group-focus-within:text-primary transition-colors" size={16} />
                        <input 
                            type="search"
                            value={filters.searchQuery || ''}
                            onChange={(e) => setFilters({ searchQuery: e.target.value })}
                            placeholder="Interrogate data matrix..."
                            className="w-full bg-surface/40 border-none focus:bg-white rounded-full h-11 pl-14 pr-6 text-xs font-bold text-text-main outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 md:flex-none">
                            <button 
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`w-full md:w-auto h-11 flex items-center justify-center gap-3 px-6 rounded-full border border-outline/30 text-[10px] font-black uppercase tracking-widest transition-all ${
                                    isFilterOpen ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-text-main'
                                }`}
                            >
                                <Filter size={16} />
                                <span>Unit Triage</span>
                                <ChevronDown size={14} className={isFilterOpen ? 'rotate-180' : ''} />
                            </button>
                            
                            <AnimatePresence>
                                {isFilterOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 15 }}
                                        className="absolute right-0 top-full mt-4 w-full md:w-72 bg-surface-bright border border-outline/30 rounded-[32px] shadow-2xl z-50 p-6 flex flex-col gap-5"
                                    >
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={12} className="text-primary" />
                                                <span className="text-[10px] font-black uppercase text-text-sub tracking-[0.2em]">Operational Section</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['All', 'OPD', 'IPD', 'ICU'].map(u => (
                                                    <button 
                                                        key={u}
                                                        onClick={() => setFilters({ department: u })}
                                                        className={`px-3 py-3 rounded-xl text-[10px] font-black border transition-all ${filters.department === u ? 'bg-primary/5 border-primary text-primary' : 'bg-surface/50 border-transparent text-text-sub'}`}
                                                    >
                                                        {u}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="w-full py-3.5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]" onClick={() => setIsFilterOpen(false)}>Commit View</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button onClick={handleRefresh} disabled={isRefreshing} className="w-11 h-11 rounded-full bg-white border border-outline/30 flex items-center justify-center text-text-sub hover:border-primary transition-all">
                            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardToolbar;
