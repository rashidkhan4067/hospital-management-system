import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminPage from '@/layouts/AdminPage';
import { AnalyticsProvider, useAnalytics } from '../context/AnalyticsContext';
import AnalyticsFilterBar from '../components/AnalyticsFilterBar';
import { Download } from 'lucide-react';
import { exportToCSV } from '@/core/utils/exportUtils';
import { REVENUE_DATA } from '../api/constants';

// ─── Analytics Atomic Components ───
import MetricMatrix from '../components/MetricMatrix';
import AppointmentsTrend from '../components/AppointmentsTrend';
import RevenueAnalytics from '../components/RevenueAnalytics';
import DepartmentDistribution from '../components/DepartmentDistribution';
import PatientGrowth from '../components/PatientGrowth';
import DoctorPerformanceTable from '../components/DoctorPerformanceTable';
import BookingConversion from '../components/BookingConversion';

import WardFlowShard from '../components/WardFlowShard';
import IntelligenceGateway from '../components/IntelligenceGateway';

/**
 * 🏥 AnalyticsPage (M3 Senior Architect Spec)
 * High-fidelity clinical command center following a strict 12-column Grid.
 * Synchronized with the Dashboard architecture for absolute HMS consistency.
 */
export default function AnalyticsPage() {
    return (
        <AnalyticsProvider>
            <AnalyticsContent />
        </AnalyticsProvider>
    );
}

function AnalyticsContent() {
    const { filters } = useAnalytics();
    const [loading, setLoading] = useState(false);

    const handleExport = () => {
        setLoading(true);
        setTimeout(() => {
            exportToCSV(REVENUE_DATA, 'hospital_revenue_report');
            setLoading(false);
        }, 800);
    };

    return (
        <AdminPage className="bg-surface">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.2 }}
               className="w-full flex flex-col gap-8 md:gap-10"
            >
                {/* 🛰️ Header & Filter Intelligence Cluster (High Focus) */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 md:gap-12">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] md:text-xs font-black text-[#1A73E8] uppercase tracking-[0.2em] opacity-50">Operational Command</span>
                        <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">Intelligence Hub</h1>
                        <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                            <span>{filters.department}</span>
                            <span className="opacity-30">•</span>
                            <span>{filters.dateRange} Period</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full xl:w-auto">
                        <div className="flex-1 xl:flex-none">
                            <AnalyticsFilterBar />
                        </div>
                        <button 
                            onClick={handleExport}
                            disabled={loading}
                            className={`h-11 px-6 rounded-xl flex items-center justify-center gap-2.5 font-bold text-[13px] transition-all w-full md:w-auto
                              ${loading ? 'bg-white text-slate-400 border border-slate-200' : 'bg-[#E8F0FE] text-[#1967D2] border border-[#1967D2]/10 hover:bg-[#D2E3FC] active:scale-[0.98]'}`}
                        >
                            <Download size={16} className={loading ? 'text-slate-300' : 'text-[#1967D2]'} />
                            <span>{loading ? 'Exporting...' : 'Export Report'}</span>
                        </button>
                    </div>
                </div>

                {/* 📊 Tactical Metric Shards (Sourced from Unified Primitive) */}
                <MetricMatrix />

                {/* 📉 Core Intelligence Grids (Interaction Tier) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AppointmentsTrend loading={loading} />
                    <RevenueAnalytics loading={loading} />
                    <DepartmentDistribution loading={loading} />
                </div>

                {/* 📋 Registry Oversight (Performance Tier - Row 3) */}
                <div className="grid grid-cols-12 gap-8 items-stretch">
                    <div className="col-span-12 xl:col-span-8 flex flex-col">
                        <DoctorPerformanceTable />
                    </div>
                    <div className="col-span-12 xl:col-span-4 flex flex-col">
                        <WardFlowShard />
                    </div>
                </div>

                {/* 📈 Success & Growth Metrics (Row 4) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <PatientGrowth loading={loading} />
                    <BookingConversion />
                </div>

                {/* 🛰️ Global Intelligence Gateway (Interconnect Tier) */}
                <div className="flex flex-col gap-6 pb-20">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-slate-200" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cross-Module Intelligence</span>
                        <div className="h-[1px] flex-1 bg-slate-200" />
                    </div>
                    <IntelligenceGateway />
                </div>
            </motion.div>
        </AdminPage>
    );
}
