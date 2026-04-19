import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';
import { useDataStore } from '@/core/store/useDataStore';

import GreetingHeader          from '../components/GreetingHeader';
import DashboardToolbar        from '../components/DashboardToolbar';
import KpiGrid                 from '../components/KpiGrid';
import AppointmentTrendCard    from '../components/AppointmentTrendCard';
import RevenueAnalysisCard     from '../components/RevenueAnalysisCard';
import RecentAdmissionsCard    from '../components/RecentAdmissionsCard';
import RecentAppointmentsCard  from '../components/RecentAppointmentsCard';
import DepartmentDistributionCard from '../components/DepartmentDistributionCard';
import SystemAlertsFeed        from '../components/SystemAlertsFeed';
import SystemAlertNode         from '../components/SystemAlertNode';
import OperationalPulseCard    from '../components/OperationalPulseCard';
import BedOccupancyCard        from '../components/BedOccupancyCard';
import PharmacyStockCard       from '../components/PharmacyStockCard';
import OutstandingInvoicesCard from '../components/OutstandingInvoicesCard';
import QuickActions            from '../components/QuickActions';

/**
 * DashboardPage — Google-style compact auto-responsive grid
 */
export default function DashboardPage() {
    const [searchParams] = useSearchParams();
    const syncFilters    = useDataStore(s => s.syncFiltersFromUrl);

    useEffect(() => {
        if (searchParams) syncFilters?.(searchParams);
    }, [searchParams, syncFilters]);

    return (
        <AdminPage>
            <main
                id="main-dashboard"
                aria-label="Hospital Management Dashboard"
                style={{
                    maxWidth: 1560,
                    margin: '0 auto',
                    padding: 'clamp(14px, 3vw, 24px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                }}
            >
                {/* ── Row 1: Greeting ── */}
                <header><GreetingHeader /></header>

                {/* ── Row 2: Quick Actions ── */}
                <div style={{
                    background: 'var(--m3-surface-bright)',
                    border: '1px solid var(--m3-outline-variant)',
                    borderRadius: 14, padding: '10px 14px', boxShadow: 'var(--m3-elev-1)',
                }}>
                    <QuickActions />
                </div>

                {/* ── Row 3: Priority alert (conditional) ── */}
                <SystemAlertNode
                    type="Critical"
                    message="Blood Bank: Type O− stock below critical threshold (12 units). Emergency protocols activated — Ward 4 + ICU."
                />

                {/* ── Row 4: Toolbar ── */}
                <section aria-label="Dashboard controls"><DashboardToolbar /></section>

                {/* ── Row 5: KPI strip ── */}
                <section aria-label="Key performance indicators"><KpiGrid /></section>

                {/* ── Row 6: Analytics Primary ── */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-[14px]" aria-label="Appointment analytics">
                    <div className="md:col-span-8"><AppointmentTrendCard /></div>
                    <div className="md:col-span-4"><RecentAppointmentsCard /></div>
                </section>

                {/* ── Row 7: Clinical Flows ── */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-[14px]" aria-label="Patient admissions and operational flow">
                    <div className="md:col-span-8"><RecentAdmissionsCard /></div>
                    <div className="md:col-span-4"><OperationalPulseCard /></div>
                </section>

                {/* ── Row 8: Revenue analysis (full width) ── */}
                <section aria-label="Revenue analytics"><RevenueAnalysisCard /></section>

                {/* ── Row 9: Distribution & Risk trio ── */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]" aria-label="Distribution and Risk monitoring">
                    <DepartmentDistributionCard />
                    <SystemAlertsFeed />
                    <PharmacyStockCard />
                </section>

                {/* ── Row 10: Finance & Bed occupancy ── */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-[14px]" aria-label="Financials and Infrastructure">
                    <div className="md:col-span-4"><OutstandingInvoicesCard /></div>
                    <div className="md:col-span-8"><BedOccupancyCard /></div>
                </section>
            </main>
        </AdminPage>
    );
}
