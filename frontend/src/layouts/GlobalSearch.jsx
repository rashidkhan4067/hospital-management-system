import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, X, User, Calendar, FileText, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 🛰️ GlobalSearch (MD3 Specification)
 * Full rounded pill shape, expandable on focus, with grouped navigation results.
 */
const GlobalSearch = ({ isMobile = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);

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

  // Mock results logic
  useEffect(() => {
    if (query.length > 2) {
      setResults({
        patients: [
          { id: 1, name: 'John Doe', detail: 'ID: #44023' },
          { id: 2, name: 'Sarah Jenkins', detail: 'ID: #44089' }
        ],
        doctors: [
          { id: 1, name: 'Dr. Alistair Cook', detail: 'Cardiology' }
        ],
        appointments: [
          { id: 1, name: 'Emergency Triage', detail: 'Today, 14:30' }
        ]
      });
    } else {
      setResults(null);
    }
  }, [query]);

  return (
    <div className={`relative flex items-center transition-all duration-300 ${isFocused ? 'flex-grow max-w-[400px]' : 'max-w-[280px] md:max-w-[320px]'} ${isMobile ? 'w-full' : ''}`}>
      {/* 💊 MD3 Search Bar Pill */}
      <div 
        className={`
          flex items-center w-full h-12 px-4 rounded-[28px] transition-all duration-300
          ${isFocused ? 'bg-white shadow-lg ring-1 ring-primary/20' : 'bg-[#E7E0EC]'}
        `}
      >
        <Search size={20} className={`${isFocused ? 'text-primary' : 'text-[#49454F]'} transition-colors duration-300`} />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search patients, doctors, appointments..."
          className="flex-grow bg-transparent border-none outline-none px-3 text-sm text-[#1C1B1F] placeholder:text-[#49454F]"
        />

        <div className="flex items-center gap-2">
            {!isFocused && !query && (
                <div className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#79747E]/30 text-[10px] text-[#49454F] font-bold">
                    <Command size={10} />
                    <span>K</span>
                </div>
            )}
            {query ? (
                <button onClick={() => setQuery('')} className="p-1 hover:bg-surface-variant rounded-full text-[#49454F]">
                    <X size={16} />
                </button>
            ) : (
                <Mic size={20} className="text-[#49454F] cursor-pointer hover:text-primary transition-colors" />
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
            className="absolute top-14 left-0 w-full bg-white border border-[#CAC4D0] rounded-[24px] shadow-2xl z-[110] overflow-hidden"
          >
            <div className="max-h-[480px] overflow-y-auto custom-scrollbar p-2">
              {results ? (
                <div className="flex flex-col">
                  <ResultSection title="Patients" icon={User} items={results.patients} />
                  <ResultSection title="Practitioners" icon={FileText} items={results.doctors} />
                  <ResultSection title="Clinical Events" icon={Calendar} items={results.appointments} />
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center gap-3">
                    <Search size={32} className="text-[#49454F]/20" />
                    <span className="text-xs font-medium text-[#49454F]">Start typing to explore intelligence registry...</span>
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

const ResultSection = ({ title, icon: Icon, items }) => {
  if (!items?.length) return null;
  return (
    <div className="mb-2">
      <div className="flex items-center gap-2 px-4 py-2 mt-1">
        <Icon size={14} className="text-primary" />
        <span className="text-[10px] font-black uppercase tracking-widest text-[#49454F]">{title}</span>
      </div>
      {items.map((item) => (
        <div key={item.id} className="mx-1 p-3 flex items-center gap-4 hover:bg-[#6750A4]/5 rounded-2xl cursor-pointer transition-all group">
            <div className="w-8 h-8 rounded-full bg-surface border border-outline/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Icon size={14} />
            </div>
            <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#1C1B1F]">{item.name}</span>
                <span className="text-[11px] text-[#49454F]">{item.detail}</span>
            </div>
        </div>
      ))}
    </div>
  );
};

export default GlobalSearch;
