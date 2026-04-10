import React from 'react';
import { Download, ChevronDown, Filter, User } from 'lucide-react';
import { Button, SegmentedControl } from '@/components/primitives';
import { useDataStore } from '@/core/store/useDataStore';

/**
 * 🛠️ AnalyticsPageHeader (Unified Global Filtering)
 * Acts as the Control Plane for the entire HMS Intelligence Hub.
 * Composed entirely of shared architectural primitives.
 */
const AnalyticsPageHeader = () => {
    const filters = useDataStore(state => state.filters);
    const setFilters = useDataStore(state => state.setFilters);

    const updateFilter = (key, value) => {
        setFilters({ [key]: value });
    };

    return (
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-8 w-full">
            
            {/* 🏷️ System Identity Area */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-primary tracking-[0.25em]">Strategic Analytics</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tighter leading-none">Command Hub</h1>
            </div>

            {/* 🎮 Shared Global Filter Control Plane */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                
                {/* 🔳 1. Temporal Filter (SHARED PRIMITIVE) */}
                <SegmentedControl 
                    value={filters.dateRange} 
                    onChange={(val) => updateFilter('dateRange', val)}
                    options={[
                        { label: 'Today', val: 'Today' },
                        { label: 'Week', val: 'Week' },
                        { label: 'Month', val: 'Month' }
                    ]}
                />

                <div className="flex flex-col sm:flex-row items-center gap-3">
                    
                    {/* 🏥 2. Unit Filter (Where?) */}
                    <div className="relative flex-1 sm:w-48 group">
                        <select 
                            value={filters.department}
                            onChange={(e) => updateFilter('department', e.target.value)}
                            className="w-full h-11 pl-10 pr-8 bg-surface-bright border border-outline/30 rounded-full text-[9px] font-black uppercase tracking-widest text-text-main hover:border-primary transition-all cursor-pointer appearance-none shadow-sm"
                        >
                            <option value="All">Global Units</option>
                            <option value="OPD">Outpatient (OPD)</option>
                            <option value="IPD">Inpatient (IPD)</option>
                            <option value="ICU">Critical Care (ICU)</option>
                        </select>
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-60" size={13} />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sub opacity-40" size={13} />
                    </div>

                    {/* 👨‍⚕️ 3. Practitioner Filter (Who?) */}
                    <div className="relative flex-1 sm:w-56 group">
                        <select 
                            value={filters.doctor}
                            onChange={(e) => updateFilter('doctor', e.target.value)}
                            className="w-full h-11 pl-10 pr-8 bg-surface-bright border border-outline/30 rounded-full text-[9px] font-black uppercase tracking-widest text-text-main hover:border-primary transition-all cursor-pointer appearance-none shadow-sm"
                        >
                            <option value="All Doctors">All Practitioners</option>
                            <option value="Dr. Ali Khan">Dr. Ali Khan</option>
                            <option value="Dr. Sara Ahmed">Dr. Sara Ahmed</option>
                            <option value="Dr. John Doe">Dr. John Doe</option>
                        </select>
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-60" size={13} />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sub opacity-40" size={13} />
                    </div>

                    <Button 
                        variant="filled" 
                        className="h-11 px-6 rounded-full flex items-center justify-center gap-3 bg-text-main text-surface-bright shadow-lg shadow-text-main/10 hover:shadow-text-main/20 active:scale-95 shrink-0"
                    >
                        <Download size={15} />
                        <span className="hidden lg:inline text-[9px] font-black uppercase tracking-widest leading-none">Export Hub</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPageHeader;
