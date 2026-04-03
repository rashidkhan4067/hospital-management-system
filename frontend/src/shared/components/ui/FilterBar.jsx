import React from 'react';
import { Search } from 'lucide-react';
import { Card } from '@/shared/components/ui';

/**
 * 🔍 Scalable Filter & Search Interface
 * Features a streamlined command-style search and elevated interactive tabs.
 */
export default function FilterBar({ 
    searchTerm, 
    setSearchTerm, 
    activeTab, 
    setActiveTab, 
    tabs = [],
    placeholder = "Search Identity, Protocol or Metadata..."
}) {
    return (
        <div className="flex flex-col xl:flex-row items-center gap-4 mb-6">
            {/* Search Module */}
            <div className="relative flex-1 w-full group">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-primary transition-colors pointer-events-none" />
                <input 
                    type="text" 
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900/10 border border-slate-200/50 dark:border-white/5 rounded-xl py-2.5 pl-12 pr-6 text-[10px] font-bold tracking-tight text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-accent-primary/10 transition-all shadow-sm group-hover:shadow-md border-none"
                />
            </div>

            {/* Tab Controller Shard - Responsive Horizontal Scroll Interface */}
            {tabs.length > 0 && (
                <div className="w-full xl:w-auto flex overflow-x-auto custom-scrollbar-hide flex-nowrap items-center gap-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-2xl shadow-sm border-none">
                    {tabs.map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap min-w-[100px] sm:min-w-0 ${
                                    isActive 
                                    ? 'bg-accent-primary text-white shadow-xl shadow-accent-primary/25 scale-[1.05]' 
                                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
