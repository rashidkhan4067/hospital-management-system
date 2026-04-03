import React from 'react';
import { Search } from 'lucide-react';
import { Card } from '../../ui';

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

            {/* Tab Controller */}
            {tabs.length > 0 && (
                <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900/10 border border-slate-200/50 dark:border-white/5 rounded-xl shadow-sm border-none">
                    {tabs.map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${
                                    isActive 
                                    ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20 scale-[1.02]' 
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
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
