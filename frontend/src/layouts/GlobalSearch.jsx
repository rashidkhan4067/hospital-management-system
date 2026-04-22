import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, X, User, Calendar, FileText, Command, Pill, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '@/core/api';
import { useNavigate } from 'react-router-dom';
import { useClickAway } from '@/core/hooks/useClickAway';
import { useModalStore } from '@/core/store/useModalStore';

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
  const openModal = useModalStore(state => state.openModal);
  const [command, setCommand] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isDiscoveryLoading, setIsDiscoveryLoading] = useState(false);

  useClickAway(containerRef, () => setIsFocused(false));

  // 🧠 State 1: Discovery Shard (Smart Suggestions)
  useEffect(() => {
    if (isFocused && !query) {
      const fetchDiscovery = async () => {
        setIsDiscoveryLoading(true);
        try {
          // Fetch context-aware chips (e.g. active alerts, frequent actions)
          const res = await apiClient.get('dashboard/intelligence/search/discovery/');
          setSuggestions(res.data.chips || []);
        } catch (err) {
          // High-fidelity fallbacks
          setSuggestions([
            { id: '1', label: 'Critical alerts today', icon: Sparkles, color: 'var(--m3-error)' },
            { id: '2', label: 'Admit new patient', type: 'command', cmd: 'ADMIT_PATIENT' },
            { id: '3', label: 'OPD Census', url: '/admin/analytics' },
            { id: '4', label: 'Staff on leave', url: '/admin/doctors' },
          ]);
        } finally {
          setIsDiscoveryLoading(false);
        }
      };
      fetchDiscovery();
    }
  }, [isFocused, query]);

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

  // 🧠 Strategic Intent Parser (Command Library)
  // ... (keep current parseClinicalIntent)
  const parseClinicalIntent = (text) => {
    const raw = text.toLowerCase().trim();
    if (raw.length < 2) return null;

    const commands = [
      {
        trigger: /^admit\s+(.+)$/i,
        id: 'ADMIT_PATIENT',
        label: (match) => `Admit "${match[1]}"`,
        detail: 'Initialize inpatient clinical intake protocol',
        icon: Command,
        props: (match) => ({ initialName: match[1] })
      },
      {
        trigger: /^book\s+(.+)$/i,
        id: 'BOOK_APPOINTMENT',
        label: (match) => `Book Appt. for "${match[1]}"`,
        detail: 'Schedule identity-verified clinical consultation',
        icon: Calendar,
        props: (match) => ({ initialName: match[1] })
      },
      {
        trigger: /^(reg|register)\s+(.+)$/i,
        id: 'ADD_PATIENT',
        label: (match) => `Register "${match[2]}"`,
        detail: 'Add new patient entry to clinical registry',
        icon: User,
        props: (match) => ({ initialName: match[2] })
      },
      {
        trigger: /^(bill|invoice)\s+(.+)$/i,
        id: 'NEW_INVOICE',
        label: (match) => `Invoice for "${match[2]}"`,
        detail: 'Generate financial billing requisition',
        icon: FileText,
        props: (match) => ({ initialName: match[2] })
      },
      {
        trigger: /^(lab|test)\s+(.+)$/i,
        id: 'NEW_LAB_ORDER',
        label: (match) => `Lab Requisition: "${match[2]}"`,
        detail: 'Request diagnostic laboratory tests',
        icon: Pill,
        props: (match) => ({ initialName: match[2] })
      }
    ];

    for (const cmd of commands) {
      const match = text.match(cmd.trigger);
      if (match) {
        return {
          id: cmd.id,
          label: typeof cmd.label === 'function' ? cmd.label(match) : cmd.label,
          detail: cmd.detail,
          icon: cmd.icon,
          props: typeof cmd.props === 'function' ? cmd.props(match) : cmd.props
        };
      }
    }
    return null;
  };

  // Fetch real results with debouncing
  useEffect(() => {
    setCommand(parseClinicalIntent(query));

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
          if (!query) setResults(null);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Keyboard Navigation Matrix
  const handleKeyDown = (e) => {
    if (!results && !suggestions.length) return;
    
    // Flatten results for easy indexing
    const flatResults = [];
    if (command) flatResults.push({ ...command, type: 'command' });
    
    if (results) {
        if (results.ai_interpretation) flatResults.push({ ...results.ai_interpretation, type: 'ai' });
        flatResults.push(...(results.patients || []).map(r => ({ ...r, type: 'patient' })));
        flatResults.push(...(results.doctors || []).map(r => ({ ...r, type: 'doctor' })));
        flatResults.push(...(results.invoices || []).map(r => ({ ...r, type: 'invoice' })));
        flatResults.push(...(results.appointments || []).map(r => ({ ...r, type: 'appt' })));
        flatResults.push(...(results.medicine || []).map(r => ({ ...r, type: 'med' })));
    }
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < flatResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > -1 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const target = flatResults[selectedIndex];
      
      // 🧠 Intent-Aware Command Intercept (Keyboard)
      if (command && (target.type === 'patient' || target.type === 'doctor')) {
          if (command.id === 'ADMIT_PATIENT' && target.type === 'patient') {
              openModal('ADMIT_PATIENT', { initialPatient: target });
              setIsFocused(false);
              setQuery('');
              return;
          }
          if (command.id === 'BOOK_APPOINTMENT') {
              openModal('BOOK_APPOINTMENT', { 
                  initialPatient: target.type === 'patient' ? target : null,
                  initialDoctor: target.type === 'doctor' ? target : null
              });
              setIsFocused(false);
              setQuery('');
              return;
          }
      }

      if (target.type === 'command') {
          openModal(target.id, target.props);
          setIsFocused(false);
          setQuery('');
      } else if (target?.url) {
        navigate(target.url);
        setIsFocused(false);
        setQuery('');
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative flex items-center transition-all duration-300 ${isFocused ? 'flex-grow max-w-[440px]' : 'max-w-[280px] md:max-w-[320px]'} ${isMobile ? 'w-full' : ''}`}>
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
          placeholder="Search patients, doctors, intents..."
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
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute top-14 left-0 w-full bg-surface-bright border border-outline-variant rounded-[24px] shadow-2xl z-[110] overflow-hidden"
          >
            <div className="max-h-[520px] overflow-y-auto custom-scrollbar p-2">
              
              {/* 🧠 State 1: Discovery Shard (Empty Query) */}
              {!query && (
                <div className="p-2">
                  <div className="px-2 mb-3">
                    <span className="text-[10px] font-black uppercase text-text-sub/50 tracking-widest">Intelligent Discovery</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s, i) => (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => {
                          if (s.type === 'command') openModal(s.cmd);
                          else if (s.url) navigate(s.url);
                          else setQuery(s.label);
                        }}
                        className="px-3 py-1.5 rounded-full bg-surface border border-outline-variant hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-all flex items-center gap-2 group"
                      >
                        {s.icon && <s.icon size={13} className="text-text-sub group-hover:text-primary" style={s.color ? { color: s.color } : {}} />}
                        <span className="text-[11px] font-bold text-text-main pr-1">{s.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {query && (command || (results && Object.values(results).some(arr => arr && arr.length > 0))) ? (
                <div className="flex flex-col">
                  {/* AI Interpretation Shard (State 3) */}
                  {results?.ai_interpretation && (
                    <div className="mx-1 p-4 mb-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles size={48} className="text-primary" />
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-md">
                          <Sparkles size={16} />
                        </div>
                        <div className="flex flex-col gap-1 pr-6">
                          <span className="text-[10px] font-black text-primary uppercase tracking-tighter">AI Assistant Intelligence</span>
                          <p className="text-[14px] font-bold text-text-main leading-snug">
                            {results.ai_interpretation.answer}
                          </p>
                          {results.ai_interpretation.action && (
                            <button 
                              onClick={() => navigate(results.ai_interpretation.action.url)}
                              className="mt-2 self-start px-3 py-1 bg-white border border-primary/20 text-[10px] font-bold text-primary rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
                            >
                              {results.ai_interpretation.action.label}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {command && (
                    <div 
                      onClick={() => {
                        openModal(command.id, command.props);
                        setIsFocused(false);
                        setQuery('');
                      }}
                      className={`mx-1 p-3 mb-2 flex items-center justify-between gap-3 rounded-2xl cursor-pointer transition-all border-2 ${selectedIndex === 0 ? 'bg-primary/5 border-primary shadow-sm' : 'bg-surface-variant/30 border-transparent hover:border-primary/20'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20`}>
                            <command.icon size={22} />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[14px] font-black text-text-main flex items-center gap-2">
                                {command.label}
                                <Sparkles size={12} className="text-primary animate-pulse" />
                            </span>
                            <span className="text-[11px] text-text-sub font-medium opacity-70">{command.detail}</span>
                        </div>
                      </div>
                      <div className="pr-2">
                        <div className="px-2 py-1 bg-primary text-white text-[9px] font-black rounded-lg shadow-sm">
                            COMMAND
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 📂 Grouped Registry Results (State 2) */}
                  <ResultSection title="Patients" type="patient" icon={User} items={results?.patients} navigate={navigate} setIsFocused={setIsFocused} setQuery={setQuery} offset={command ? 1 : 0} selectedIndex={selectedIndex} query={query} activeCommand={command} />
                  <ResultSection title="Practitioners" type="doctor" icon={FileText} items={results?.doctors} navigate={navigate} setIsFocused={setIsFocused} setQuery={setQuery} offset={(command ? 1 : 0) + (results?.patients?.length || 0)} selectedIndex={selectedIndex} query={query} activeCommand={command} />
                  <ResultSection title="Financial Records" type="invoice" icon={FileText} items={results?.invoices} navigate={navigate} setIsFocused={setIsFocused} setQuery={setQuery} offset={(command ? 1 : 0) + (results?.patients?.length || 0) + (results?.doctors?.length || 0)} selectedIndex={selectedIndex} query={query} activeCommand={command} />
                  <ResultSection title="Clinical Events" type="appt" icon={Calendar} items={results?.appointments} navigate={navigate} setIsFocused={setIsFocused} setQuery={setQuery} offset={(command ? 1 : 0) + (results?.patients?.length || 0) + (results?.doctors?.length || 0) + (results?.invoices?.length || 0)} selectedIndex={selectedIndex} query={query} activeCommand={command} />
                  <ResultSection title="Inventory" type="med" icon={Pill} items={results?.medicine} navigate={navigate} setIsFocused={setIsFocused} setQuery={setQuery} offset={(command ? 1 : 0) + (results?.patients?.length || 0) + (results?.doctors?.length || 0) + (results?.invoices?.length || 0) + (results?.appointments?.length || 0)} selectedIndex={selectedIndex} query={query} activeCommand={command} />
                </div>
              ) : query && !loading ? (
                <div className="p-8 text-center flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center">
                      <Search size={32} className="text-text-sub/20" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-text-main">No clinical matches found</span>
                      <span className="text-[10px] text-text-sub">Try searching for MRNs, Doctor IDs, or intent commands like "Admit Ali"</span>
                    </div>
                </div>
              ) : null}
            </div>
            
            <div className="p-3 bg-surface border-t border-outline/10 flex items-center justify-between">
                <div className="flex items-center gap-2 pl-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[9px] font-black uppercase text-text-sub tracking-widest">Enterprise Sync Active</span>
                </div>
                <div className="flex items-center gap-4 text-[9px] font-black text-primary uppercase">
                    <span className="cursor-pointer hover:underline">Full Registry</span>
                    <span className="cursor-pointer hover:underline">Clinical Matrix</span>
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
    if (typeof text !== 'string') return text;
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

const ResultSection = ({ title, icon: Icon, items, navigate, setIsFocused, setQuery, offset, selectedIndex, query, type, activeCommand }) => {
  const openModal = useModalStore(state => state.openModal);
  if (!items?.length) return null;
  
  return (
    <div className="mb-4 pt-2">
      <div className="px-3 mb-2 flex justify-between items-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-text-sub opacity-60">{title}</span>
        <span className="text-[9px] font-bold text-text-sub opacity-30">{items.length} matched</span>
      </div>
      {items.map((item, index) => {
        const globalIndex = offset + index;
        const isSelected = selectedIndex === globalIndex;
        
        const handleClick = () => {
          // 🧠 Intent-Aware Command Intercept
          if (activeCommand && type === 'patient') {
            if (activeCommand.id === 'ADMIT_PATIENT') {
              openModal('ADMIT_PATIENT', { initialPatient: item });
              setIsFocused(false);
              setQuery('');
              return;
            }
            if (activeCommand.id === 'BOOK_APPOINTMENT') {
              openModal('BOOK_APPOINTMENT', { initialPatient: item });
              setIsFocused(false);
              setQuery('');
              return;
            }
          }

          if (activeCommand && type === 'doctor' && activeCommand.id === 'BOOK_APPOINTMENT') {
             openModal('BOOK_APPOINTMENT', { initialDoctor: item });
             setIsFocused(false);
             setQuery('');
             return;
          }

          // Default Navigation
          if (item.url) {
            navigate(item.url);
            setIsFocused(false);
            setQuery('');
          }
        };

        return (
          <div 
            key={item.id} 
            onClick={handleClick}
            className={`mx-1 p-2.5 flex items-center justify-between gap-3 rounded-xl cursor-pointer transition-all group ${isSelected ? 'bg-surface-variant ring-1 ring-primary/10 shadow-sm' : 'hover:bg-surface-variant/50'}`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
                <div className={`w-10 h-10 rounded-xl bg-surface border border-outline-variant flex items-center justify-center text-text-sub transition-all ${isSelected ? 'text-primary border-primary/20 bg-white shadow-sm' : 'group-hover:text-primary group-hover:border-primary/10'}`}>
                    <Icon size={19} />
                </div>
                <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-[13.5px] font-bold truncate text-text-main">
                            <HighlightedText text={item.name} query={query} />
                        </span>
                        {item.badge && (
                            <span className="px-1.5 py-0.5 rounded bg-surface-variant text-[8px] font-black uppercase tracking-tighter opacity-60">
                                {item.badge}
                            </span>
                        )}
                        {activeCommand && (
                           <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[7px] font-black uppercase rounded">
                              Click to {activeCommand.id.split('_')[0]}
                           </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-text-sub truncate opacity-70">
                        {item.mrn && <span className="font-bold border-r border-outline-variant pr-2">MRN: {item.mrn}</span>}
                        {item.status && <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Admitted' || item.status === 'On Duty' ? 'bg-success' : 'bg-outline'} animate-pulse-subtle`} />}
                        <span className="truncate">{item.detail}</span>
                    </div>
                </div>
            </div>
            {isSelected && (
                <div className="pr-2">
                    <div className={`px-2 py-0.5 ${activeCommand ? 'bg-primary' : 'bg-text-sub'} text-white text-[9px] font-black rounded-md shadow-sm`}>
                        {activeCommand ? activeCommand.id.split('_')[0] : 'ENTER'}
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
