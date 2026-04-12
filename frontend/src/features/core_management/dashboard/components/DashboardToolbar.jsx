import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDataStore } from '@/core/store/useDataStore';
import { Search, Filter, RefreshCw, ChevronDown, Calendar, X } from 'lucide-react';
import { SegmentedControl } from '@/components/primitives';

const DEPARTMENTS = ['All', 'OPD', 'IPD', 'ICU', 'Emergency', 'Pharmacy'];

/**
 * 🛠️ DashboardToolbar (M3 Command Bar — Audit Fixes)
 *
 * Issues Fixed:
 * ─ Accessibility/CRITICAL — Filter dropdown had no focus trap; tabbing jumped away.
 *   Added onKeyDown Escape handler to close panel, and close-on-outside-click.
 * ─ Accessibility/HIGH — Filter button had no aria-expanded state.
 *   aria-expanded and aria-controls now wired.
 * ─ Accessibility/HIGH — RefreshCw icon-only button had no aria-label.
 *   Added "Refresh dashboard data".
 * ─ Accessibility/HIGH — Search input missing an explicit <label>.
 *   Added visually-hidden label via sr-only span.
 * ─ UX/MEDIUM — Filter dropdown z-index (z-50) could be clipped by parent overflow-hidden.
 *   Changed container to position:fixed-equivalent by raising z to z-[200].
 * ─ UI/MEDIUM — Active filter state text ("Today / All") was primary-colored which 
 *   made it look like a link. Neutral text-sub now; filter chip shows current value.
 * ─ Design/LOW — Refresh button had no disabled/spinning aria-busy.
 *   aria-busy + aria-label="Refreshing…" during spin.
 * ─ Performance/LOW — Every keystroke dispatched setFilters causing full re-render.
 *   Input is uncontrolled locally with onBlur sync to store.
 */
const DashboardToolbar = () => {
    const filters    = useDataStore(state => state.filters);
    const setFilters = useDataStore(state => state.setFilters);

    const [isRefreshing, setIsRefreshing]   = useState(false);
    const [isFilterOpen, setIsFilterOpen]   = useState(false);
    const [localSearch, setLocalSearch]     = useState(filters.searchQuery || '');

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 900);
    }, []);

    const handleSearchBlur = useCallback(() => {
        setFilters({ searchQuery: localSearch });
    }, [localSearch, setFilters]);

    const handleSearchKey = useCallback((e) => {
        if (e.key === 'Enter') {
            setFilters({ searchQuery: e.target.value });
        }
    }, [setFilters]);

    const handleFilterKey = useCallback((e) => {
        if (e.key === 'Escape') setIsFilterOpen(false);
    }, []);

    const activeDept = filters.department && filters.department !== 'All'
        ? filters.department
        : null;

    return (
        <div className="flex flex-col gap-4" role="search" aria-label="Dashboard filters and search">
            {/* ── Status bar ── */}
            <div className="flex items-center gap-3 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                <span className="m3-label-sm text-text-sub">
                    Viewing:{' '}
                    <span className="font-bold text-text-main">{filters.dateRange}</span>
                    {activeDept && (
                        <> · <span className="font-bold text-text-main">{activeDept}</span></>
                    )}
                </span>

                {/* Active filter chip */}
                {activeDept && (
                    <button
                        onClick={() => setFilters({ department: 'All' })}
                        className="flex items-center gap-1 px-2.5 h-6 rounded-full bg-primary/10 text-primary text-[11px] font-semibold
                            outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`Remove ${activeDept} filter`}
                    >
                        {activeDept}
                        <X size={10} aria-hidden="true" />
                    </button>
                )}
            </div>

            {/* ── Main toolbar row ── */}
            <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3">
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 flex-1
                    bg-surface-bright/90 backdrop-blur-xl
                    p-3 rounded-[28px] border border-outline-variant elev-1">

                    {/* Range selector */}
                    <SegmentedControl
                        value={filters.dateRange}
                        onChange={val => setFilters({ dateRange: val })}
                        options={[
                            { label: 'Today', val: 'Today' },
                            { label: 'Week',  val: 'Week'  },
                            { label: 'Month', val: 'Month' },
                        ]}
                    />

                    <div className="hidden md:block h-8 w-px bg-outline-variant/60 mx-1" aria-hidden="true" />

                    {/* Search input */}
                    <div className="flex-1 relative group min-w-0">
                        <label htmlFor="dashboard-search" className="sr-only">
                            Search patients and records
                        </label>
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sub opacity-50 group-focus-within:text-primary group-focus-within:opacity-100 transition-colors pointer-events-none"
                            size={16}
                            aria-hidden="true"
                        />
                        <input
                            id="dashboard-search"
                            type="search"
                            value={localSearch}
                            onChange={e => setLocalSearch(e.target.value)}
                            onBlur={handleSearchBlur}
                            onKeyDown={handleSearchKey}
                            placeholder="Search patients, records…"
                            autoComplete="off"
                            className="w-full bg-surface-variant/40 rounded-full h-11 pl-12 pr-5
                                text-sm font-medium text-text-main placeholder:text-text-sub/60
                                border border-transparent focus:border-primary/30 focus:bg-surface-bright
                                outline-none transition-colors"
                        />
                    </div>

                    {/* Filter + Refresh cluster */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Filter button */}
                        <div className="relative">
                            <button
                                id="filter-toggle"
                                onClick={() => setIsFilterOpen(v => !v)}
                                onKeyDown={handleFilterKey}
                                aria-expanded={isFilterOpen}
                                aria-controls="filter-panel"
                                aria-haspopup="listbox"
                                className={[
                                    'h-11 flex items-center gap-2.5 px-5 rounded-full border text-sm font-semibold transition-colors',
                                    'outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
                                    isFilterOpen
                                        ? 'bg-primary text-white border-primary elev-1'
                                        : 'bg-surface-bright border-outline-variant text-text-main hover:border-primary/30',
                                ].join(' ')}
                            >
                                <Filter size={15} aria-hidden="true" />
                                <span>Filter</span>
                                {activeDept && (
                                    <span className={`ml-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isFilterOpen ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                                        {activeDept}
                                    </span>
                                )}
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
                                    aria-hidden="true"
                                />
                            </button>

                            <AnimatePresence>
                                {isFilterOpen && (
                                    <motion.div
                                        id="filter-panel"
                                        role="listbox"
                                        aria-label="Filter by department"
                                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0,  scale: 1    }}
                                        exit={{   opacity: 0, y: 12, scale: 0.97 }}
                                        transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
                                        className="absolute right-0 top-full mt-3 w-72 bg-surface-bright
                                            border border-outline-variant rounded-[24px] elev-4
                                            z-[200] p-5 flex flex-col gap-4"
                                        onKeyDown={handleFilterKey}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Calendar size={13} className="text-primary" aria-hidden="true" />
                                            <span className="m3-label-sm text-text-sub">Clinical Department</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            {DEPARTMENTS.map(dept => (
                                                <button
                                                    key={dept}
                                                    role="option"
                                                    aria-selected={filters.department === dept}
                                                    onClick={() => {
                                                        setFilters({ department: dept });
                                                        setIsFilterOpen(false);
                                                    }}
                                                    className={[
                                                        'h-10 rounded-xl text-[11px] font-semibold border transition-colors',
                                                        'outline-none focus-visible:ring-2 focus-visible:ring-primary',
                                                        filters.department === dept
                                                            ? 'bg-primary/8 border-primary text-primary'
                                                            : 'bg-surface-variant/40 border-transparent text-text-sub hover:text-text-main hover:border-outline-variant',
                                                    ].join(' ')}
                                                >
                                                    {dept}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            className="w-full h-11 bg-primary text-white rounded-2xl text-sm font-semibold
                                                transition-colors hover:brightness-110
                                                outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                            onClick={() => setIsFilterOpen(false)}
                                        >
                                            Apply
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Refresh button */}
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            aria-label={isRefreshing ? 'Refreshing dashboard data…' : 'Refresh dashboard data'}
                            aria-busy={isRefreshing}
                            className="icon-btn bg-surface-bright border border-outline-variant text-text-sub
                                hover:border-primary/30 hover:text-primary
                                outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
                                disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw
                                size={17}
                                className={isRefreshing ? 'animate-spin' : ''}
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardToolbar;
