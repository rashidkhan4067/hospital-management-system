import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Filter, RefreshCw, X, ChevronDown, Sparkles, User, FileText, Calendar, Pill, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDataStore }    from '@/core/store/useDataStore';
import { useAnalyticsData } from '../../analytics/hooks/useAnalyticsData';
import { apiClient } from '@/core/api';
import { useNavigate } from 'react-router-dom';
import { useClickAway } from '@/core/hooks/useClickAway';

const DEPTS = ['All', 'OPD', 'IPD', 'ICU', 'Emergency', 'Pharmacy'];
const RANGES = ['Today', 'Week', 'Month'];

const DashboardToolbar = () => {
    const filters    = useDataStore(s => s.filters);
    const setFilters = useDataStore(s => s.setFilters);
    const { refetch } = useAnalyticsData();

    const [filterOpen,   setFilterOpen]   = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [localSearch,  setLocalSearch]  = useState(filters.searchQuery || '');
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const navigate = useNavigate();
    const searchRef = React.useRef(null);

    useClickAway(searchRef, () => setIsSearchFocused(false));

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        refetch?.();
        setTimeout(() => setIsRefreshing(false), 1000);
    }, [refetch]);

    // Intelligence Search Logic
    React.useEffect(() => {
        const fetchIntell = setTimeout(async () => {
            if (localSearch.trim().length >= 2) {
                setSearchLoading(true);
                try {
                    const res = await apiClient.get(`dashboard/intelligence/search/?q=${localSearch}`);
                    setSearchResults(res.data);
                } catch (e) { console.error(e); }
                finally { setSearchLoading(false); }
            } else {
                setSearchResults(null);
            }
        }, 300);
        return () => clearTimeout(fetchIntell);
    }, [localSearch]);

    // Sync global filters on search
    const commitSearch = (val) => {
        setFilters({ searchQuery: val });
        setIsSearchFocused(false);
    };

    const activeDept = filters.department !== 'All' ? filters.department : null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Status line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, color: 'var(--m3-text-sub)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--m3-primary)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} aria-hidden="true" />
                    Viewing: <strong style={{ color: 'var(--m3-text-main)' }}>{filters.dateRange}</strong>
                    {activeDept && <> · <strong style={{ color: 'var(--m3-text-main)' }}>{activeDept}</strong></>}
                </span>
                {activeDept && (
                    <button
                        onClick={() => setFilters({ department: 'All' })}
                        aria-label={`Remove ${activeDept} filter`}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 4,
                            height: 20, padding: '0 8px', borderRadius: 999,
                            background: 'var(--m3-primary)',
                            color: '#fff', border: 'none', cursor: 'pointer',
                            fontSize: 10, fontWeight: 700, outline: 'none',
                        }}
                    >
                        {activeDept} <X size={9} aria-hidden="true" />
                    </button>
                )}
            </div>

            {/* Main toolbar */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
                background: 'var(--m3-surface-bright)',
                border: '1px solid var(--m3-outline-variant)',
                borderRadius: 14,
                padding: '6px 10px',
                boxShadow: 'var(--m3-elev-1)',
            }}>
                {/* Range pills */}
                <div
                    role="tablist"
                    aria-label="Date range"
                    style={{ display: 'flex', gap: 2, background: 'var(--m3-surface-variant)', borderRadius: 8, padding: 2 }}
                >
                    {RANGES.map(r => (
                        <button
                            key={r}
                            role="tab"
                            aria-selected={filters.dateRange === r}
                            onClick={() => setFilters({ dateRange: r })}
                            style={{
                                padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700,
                                border: 'none', cursor: 'pointer', transition: 'all 140ms', outline: 'none',
                                background: filters.dateRange === r ? 'var(--m3-surface-bright)' : 'transparent',
                                color: filters.dateRange === r ? 'var(--m3-primary)' : 'var(--m3-text-sub)',
                                boxShadow: filters.dateRange === r ? 'var(--m3-elev-1)' : 'none',
                            }}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                {/* Divider */}
                <div style={{ width: 1, height: 22, background: 'var(--m3-outline-variant)', flexShrink: 0 }} aria-hidden="true" />

                {/* Search */}
                <div ref={searchRef} style={{ position: 'relative', flex: 1, minWidth: 160 }}>
                    <label htmlFor="dash-search" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span className="sr-only">Search patients and records</span>
                        {searchLoading ? <Loader2 size={14} className="text-primary animate-spin" /> : <Search size={14} style={{ color: 'var(--m3-text-sub)', opacity: 0.5, flexShrink: 0 }} aria-hidden="true" />}
                        <input
                            id="dash-search"
                            type="search"
                            value={localSearch}
                            autoComplete="off"
                            onChange={e => setLocalSearch(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onKeyDown={e => { 
                                if (e.key === 'Enter' && selectedIndex === -1) {
                                    commitSearch(e.target.value); 
                                } else if (e.key === 'ArrowDown') {
                                    e.preventDefault();
                                    const flatCount = Object.values(searchResults || {}).flat().length;
                                    setSelectedIndex(prev => (prev < flatCount - 1 ? prev + 1 : prev));
                                } else if (e.key === 'ArrowUp') {
                                    e.preventDefault();
                                    setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
                                } else if (e.key === 'Enter' && selectedIndex >= 0) {
                                    e.preventDefault();
                                    const flatResults = Object.values(searchResults || {}).flat();
                                    const target = flatResults[selectedIndex];
                                    if (target?.url) navigate(target.url);
                                }
                            }}
                            placeholder="Proactive cluster search..."
                            style={{
                                flex: 1, background: 'transparent', border: 'none',
                                fontSize: 13, fontWeight: 600, color: 'var(--m3-text-main)',
                                outline: 'none', padding: '4px 0',
                                width: '100%',
                            }}
                        />
                    </label>

                    {/* Proactive Intelligence Dropdown */}
                    <AnimatePresence>
                        {isSearchFocused && searchResults && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                style={{
                                    position: 'absolute', top: 'calc(100% + 10px)', left: -10, right: -10,
                                    background: 'var(--m3-surface-bright)', border: '1px solid var(--m3-outline-variant)',
                                    borderRadius: 16, boxShadow: 'var(--m3-elev-3)', zIndex: 110,
                                    maxHeight: 400, overflowY: 'auto', padding: 8
                                }}
                            >
                                <SearchSection title="Patients" items={searchResults.patients} icon={User} navigate={navigate} query={localSearch} offset={0} selectedIndex={selectedIndex} />
                                <SearchSection title="Doctors" items={searchResults.doctors} icon={FileText} navigate={navigate} query={localSearch} offset={searchResults.patients?.length || 0} selectedIndex={selectedIndex} />
                                <SearchSection title="Clinical Events" items={searchResults.appointments} icon={Calendar} navigate={navigate} query={localSearch} offset={(searchResults.patients?.length || 0) + (searchResults.doctors?.length || 0)} selectedIndex={selectedIndex} />
                                <SearchSection title="Pharmacy" items={searchResults.medicine} icon={Pill} navigate={navigate} query={localSearch} offset={(searchResults.patients?.length || 0) + (searchResults.doctors?.length || 0) + (searchResults.appointments?.length || 0)} selectedIndex={selectedIndex} />

                                {Object.values(searchResults).every(a => a.length === 0) && (
                                    <div style={{ padding: 20, textAlign: 'center', color: 'var(--m3-text-sub)', fontSize: 11 }}>
                                        No proactive matches found. Press Enter to filter dashboard.
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Filter */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setFilterOpen(v => !v)}
                        aria-expanded={filterOpen}
                        aria-controls="dept-filter"
                        aria-haspopup="listbox"
                        onKeyDown={e => { if (e.key === 'Escape') setFilterOpen(false); }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 5,
                            height: 30, padding: '0 10px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                            border: '1px solid var(--m3-outline-variant)', cursor: 'pointer',
                            background: filterOpen ? 'var(--m3-primary)' : 'transparent',
                            color: filterOpen ? '#fff' : 'var(--m3-text-main)',
                            transition: 'all 150ms', outline: 'none',
                        }}
                    >
                        <Filter size={12} aria-hidden="true" />
                        Filter
                        {activeDept && <strong>{activeDept}</strong>}
                        <ChevronDown size={11} style={{ transform: filterOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} aria-hidden="true" />
                    </button>

                    <AnimatePresence>
                        {filterOpen && (
                            <>
                                <div style={{ position: 'fixed', inset: 0, zIndex: 199 }} onClick={() => setFilterOpen(false)} aria-hidden="true" />
                                <motion.div
                                    id="dept-filter"
                                    role="listbox"
                                    aria-label="Filter by department"
                                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                    transition={{ duration: 0.14 }}
                                    onKeyDown={e => { if (e.key === 'Escape') setFilterOpen(false); }}
                                    style={{
                                        position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                                        width: 240, zIndex: 200,
                                        background: 'var(--m3-surface-bright)',
                                        border: '1px solid var(--m3-outline-variant)',
                                        borderRadius: 14, boxShadow: 'var(--m3-elev-4)',
                                        padding: 10,
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                                        <Sparkles size={12} style={{ color: 'var(--m3-primary)' }} aria-hidden="true" />
                                        <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--m3-text-sub)' }}>
                                            Department
                                        </span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
                                        {DEPTS.map(d => (
                                            <button
                                                key={d}
                                                role="option"
                                                aria-selected={filters.department === d}
                                                onClick={() => { setFilters({ department: d }); setFilterOpen(false); }}
                                                style={{
                                                    height: 30, borderRadius: 8, fontSize: 11, fontWeight: 700,
                                                    border: '1px solid',
                                                    borderColor: filters.department === d ? 'var(--m3-primary)' : 'transparent',
                                                    background: filters.department === d ? 'var(--m3-primary)' : 'var(--m3-surface-variant)',
                                                    color: filters.department === d ? '#fff' : 'var(--m3-text-sub)',
                                                    cursor: 'pointer', transition: 'all 140ms', outline: 'none',
                                                }}
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* Refresh */}
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    aria-label={isRefreshing ? 'Refreshing…' : 'Refresh dashboard'}
                    aria-busy={isRefreshing}
                    style={{
                        width: 30, height: 30, borderRadius: 8, border: '1px solid var(--m3-outline-variant)',
                        background: 'transparent', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--m3-text-sub)', transition: 'all 150ms', outline: 'none',
                        opacity: isRefreshing ? 0.5 : 1,
                    }}
                >
                    <RefreshCw size={13} className={isRefreshing ? 'animate-spin' : ''} aria-hidden="true" />
                </button>
            </div>
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

const SearchSection = ({ title, items, icon: Icon, navigate, query, offset, selectedIndex }) => {
    if (!items?.length) return null;
    return (
        <div style={{ marginBottom: 4 }}>
            <div style={{ padding: '8px 12px 4px', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: 'var(--m3-text-sub)', opacity: 0.6, letterSpacing: '0.08em' }}>
                {title}
            </div>
            {items.map((item, index) => {
                const globalIndex = offset + index;
                const isSelected = selectedIndex === globalIndex;
                return (
                    <div
                        key={item.id}
                        onClick={() => navigate(item.url)}
                        style={{
                            padding: '8px 12px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 120ms',
                            background: isSelected ? 'var(--m3-surface-variant)' : 'transparent',
                            margin: '1px 0'
                        }}
                        className={!isSelected ? "hover:bg-surface-variant/50" : ""}
                    >
                        <div style={{ 
                            width: 32, height: 32, borderRadius: 10, background: 'var(--m3-surface)', 
                            display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center',
                            border: '1px solid var(--m3-outline-variant)', flexShrink: 0
                        }}>
                             <Icon size={16} style={{ color: isSelected ? 'var(--m3-primary)' : 'var(--m3-text-sub)' }} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--m3-text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                <HighlightedText text={item.name} query={query} />
                            </span>
                            <span style={{ fontSize: 11, color: 'var(--m3-text-sub)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.detail}</span>
                        </div>
                        {isSelected && (
                             <div style={{ padding: '2px 6px', background: 'var(--m3-primary)', borderRadius: 6, fontSize: 9, fontWeight: 900, color: '#fff' }}>
                                ENTER
                             </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default DashboardToolbar;
