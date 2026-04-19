import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, X, User, Calendar, FileText, Command, Pill, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '@/core/api';
import { useNavigate } from 'react-router-dom';
import { useClickAway } from '@/core/hooks/useClickAway';

/**
 * 🛰️ GlobalSearch (MD3 Specification)
 * Full rounded pill shape, expandable on focus, with grouped navigation results.
 */
const GlobalSearch = ({ isMobile = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useClickAway(containerRef, () => setIsFocused(false));

  // Keyboard shortcut: Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch real results with debouncing
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true);
        try {
          const response = await apiClient.get(`dashboard/intelligence/search/?q=${query}`);
          setResults(response.data);
          setSelectedIndex(-1);
        } catch (error) {
          console.error("Search error:", error);
          setResults(null);
        } finally {
          setLoading(false);
        }
      } else {
        setResults(null);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Keyboard Navigation Matrix
  const handleKeyDown = (e) => {
    if (!results) return;
    
    // Flatten results for easy indexing
    const flatResults = [
        ...(results.patients || []).map(r => ({ ...r, type: 'patient' })),
        ...(results.doctors || []).map(r => ({ ...r, type: 'doctor' })),
        ...(results.appointments || []).map(r => ({ ...r, type: 'appt' })),
        ...(results.medicine || []).map(r => ({ ...r, type: 'med' })),
    ];

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < flatResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const target = flatResults[selectedIndex];
      if (target?.url) {
        navigate(target.url);
        setIsFocused(false);
        setQuery('');
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative flex items-center transition-all duration-300 ${isFocused ? 'flex-grow max-w-[400px]' : 'max-w-[280px] md:max-w-[320px]'} ${isMobile ? 'w-full' : ''}`}>
      {/* 💊 MD3 Search Bar Pill */}
      <div 
        className={`
          flex items-center w-full h-12 px-4 rounded-[28px] transition-all duration-300
          ${isFocused ? 'bg-white shadow-lg ring-1 ring-primary/20' : 'bg-surface-variant'}
        `}
      >
        <Search size={20} className={`${isFocused ? 'text-primary' : 'text-text-sub'} transition-colors duration-300`} />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search patients, doctors, appointments..."
          className="flex-grow bg-transparent border-none outline-none px-3 text-sm text-text-main placeholder:text-text-sub"
        />

        <div className="flex items-center gap-2">
            {!isFocused && !query && (
                <div className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded border border-outline/30 text-[10px] text-text-sub font-bold">
                    <Command size={10} />
                    <span>K</span>
                </div>
            )}
            {loading ? (
                <Loader2 size={18} className="text-primary animate-spin" />
            ) : query ? (
                <button onClick={() => setQuery('')} className="p-1 hover:bg-surface border-transparent rounded-full text-text-sub">
                    <X size={16} />
                </button>
            ) : (
                <Mic size={20} className="text-text-sub cursor-pointer hover:text-primary transition-colors" />
            )}
        </div>
      </div>

      {/* 📂 Dropdown Results Container */}
      <AnimatePresence>
        {isFocused && (query || results) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-14 left-0 w-full bg-surface-bright border border-outline-variant rounded-[24px] shadow-2xl z-[110] overflow-hidden"
          >
            <div className="max-h-[480px] overflow-y-auto custom-scrollbar p-2">
              {results && Object.values(results).some(arr => arr.length > 0) ? (
                <div className="flex flex-col">
                  <ResultSection title="Patients" icon={User} items={results.patients} navigate={navigate} setIsFocused={setIsFocused} setQuery={setQuery} offset={0} selectedIndex={selectedIndex} query={query} />
                  <ResultSection title="Practitioners" icon={FileText} items={results.doctors} navigate={navigate} setIsFocused={setIsFocused} setQuery={setQuery} offset={results.patients?.length || 0} selectedIndex={selectedIndex} query={query} />
                  <ResultSection title="Clinical Events" icon={Calendar} items={results.appointments} navigate={navigate} setIsFocused={setIsFocused} setQuery={setQuery} offset={(results.patients?.length || 0) + (results.doctors?.length || 0)} selectedIndex={selectedIndex} query={query} />
                  <ResultSection title="Inventory" icon={Pill} items={results.medicine} navigate={navigate} setIsFocused={setIsFocused} setQuery={setQuery} offset={(results.patients?.length || 0) + (results.doctors?.length || 0) + (results.appointments?.length || 0)} selectedIndex={selectedIndex} query={query} />
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center gap-3">
                    <Search size={32} className="text-text-sub/20" />
                    <span className="text-xs font-medium text-text-sub">Start typing to explore intelligence registry...</span>
                </div>
              )}
            </div>
            
            <div className="p-3 bg-surface border-t border-outline/10 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-text-sub tracking-widest pl-2">Syncing Live Cluster</span>
                <div className="flex items-center gap-4 text-[10px] font-bold text-primary">
                    <span className="cursor-pointer hover:underline">View All Records</span>
                    <span className="cursor-pointer hover:underline">Advanced Filter</span>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



const HighlightedText = ({ text, query }) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
        <span>
            {parts.map((part, i) => (
                <span key={i} style={part.toLowerCase() === query.toLowerCase() ? { color: 'var(--m3-primary)', fontWeight: 800 } : {}}>
                    {part}
                </span>
            ))}
        </span>
    );
};

const ResultSection = ({ title, icon: Icon, items, navigate, setIsFocused, setQuery, offset, selectedIndex, query }) => {
  if (!items?.length) return null;
  return (
    <div className="mb-4 pt-2">
      <div className="px-3 mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-text-sub opacity-60">{title}</span>
      </div>
      {items.map((item, index) => {
        const globalIndex = offset + index;
        const isSelected = selectedIndex === globalIndex;
        
        return (
          <div 
            key={item.id} 
            onClick={() => {
                if (item.url) {
                    navigate(item.url);
                    setIsFocused(false);
                    setQuery('');
                }
            }}
            className={`mx-1 p-2 flex items-center justify-between gap-3 rounded-xl cursor-pointer transition-all group ${isSelected ? 'bg-surface-variant ring-1 ring-primary/10' : 'hover:bg-surface-variant/50'}`}
          >
            <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-surface border border-outline-variant flex items-center justify-center text-text-sub transition-all ${isSelected ? 'text-primary border-primary/20 shadow-sm' : 'group-hover:text-primary'}`}>
                    <Icon size={18} />
                </div>
                <div className="flex flex-col min-w-0">
                    <span className={`text-[13px] font-bold truncate ${isSelected ? 'text-text-main' : 'text-text-main'}`}>
                        <HighlightedText text={item.name} query={query} />
                    </span>
                    <span className="text-[11px] text-text-sub truncate opacity-80">{item.detail}</span>
                </div>
            </div>
            {isSelected && (
                <div className="pr-2">
                    <div className="px-2 py-0.5 bg-primary text-white text-[9px] font-black rounded-md shadow-sm animate-pulse-subtle">
                        ENTER
                    </div>
                </div>
            )}
          </div>
        );
      })}
    </div>
  );
};


export default GlobalSearch;
