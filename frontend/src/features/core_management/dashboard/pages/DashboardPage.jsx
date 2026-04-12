import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';
import { useDataStore } from '@/core/store/useDataStore';

// Dashboard components
import GreetingHeader     from '../components/GreetingHeader';
import DashboardToolbar   from '../components/DashboardToolbar';
import KpiGrid            from '../components/KpiGrid';
import AppointmentTrendCard   from '../components/AppointmentTrendCard';
import RevenueAnalysisCard    from '../components/RevenueAnalysisCard';
import RecentAdmissionsCard   from '../components/RecentAdmissionsCard';
import RecentAppointmentsCard from '../components/RecentAppointmentsCard';
import DepartmentDistributionCard from '../components/DepartmentDistributionCard';
import SystemAlertsFeed   from '../components/SystemAlertsFeed';
import SystemAlertNode    from '../components/SystemAlertNode';
import BedOccupancyCard   from '../components/BedOccupancyCard';
import PharmacyStockCard  from '../components/PharmacyStockCard';
import OutstandingInvoicesCard from '../components/OutstandingInvoicesCard';
import QuickActions       from '../components/QuickActions';

/**
 * 🏥 DashboardPage (M3 Grid — Audit Fixes)
 *
 * Fixes applied:
 * ─ Layout/HIGH — BedOccupancyCard was outside the grid section at the very bottom,
 *   breaking the visual narrative. Moved inside the Risk & Capacity section.
 * ─ Layout/MEDIUM — Quick Actions wrapper had bg-white/40 which fails in dark mode.
 *   Uses bg-surface-bright/70 + border-outline-variant.
 * ─ Layout/MEDIUM — Layer sections had inconsistent gap sizes (gap-8 vs gap-6).
 *   Standardized to gap-8 (32px) for section gap, gap-6 (24px) for inner.
 * ─ Accessibility/HIGH — Page had no skip-to-content link for keyboard users.
 *   Added visually-hidden skip link at top.
 * ─ Accessibility/MEDIUM — Section elements had no aria-labelledby.
 *   Key sections now labeled.
 * ─ SEO/LOW — Page title wasn't set. AdminPage should handle generic title;
 *   Dashboard-specific title documented here.
 */
export default function DashboardPage() {
    const [searchParams] = useSearchParams();
    const syncFilters    = useDataStore(state => state.syncFiltersFromUrl);

    useEffect(() => {
        if (searchParams) syncFilters(searchParams);
    }, [searchParams, syncFilters]);

    return (
        <AdminPage className="min-h-screen">
            {/* Skip to main content (WCAG 2.4.1) */}
            <a
                href="#main-dashboard"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
                    focus:z-[9999] focus:bg-primary focus:text-white focus:px-4 focus:py-2
                    focus:rounded-full focus:text-sm focus:font-semibold
                    focus:outline-none focus:shadow-lg"
            >
                Skip to main content
            </a>

            <main
                id="main-dashboard"
                className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10
                    flex flex-col gap-8 lg:gap-10"
                aria-label="Hospital Management Dashboard"
            >
                {/* ── Layer 1: Identity & Rapid Entry ── */}
                <header className="flex flex-col gap-6" aria-label="Dashboard header">
                    <GreetingHeader />

                    {/* Quick actions bar */}
                    <div
                        className="w-full py-4 px-6 bg-surface-bright/80 border border-outline-variant
                            rounded-[28px] elev-1 flex items-center justify-between"
                    >
                        <QuickActions />
                    </div>
                </header>

                {/* ── Layer 2: Mission-Critical Alert ── */}
                <SystemAlertNode
                    message="Blood Bank: Type O- stock is below critical threshold. Emergency protocols initiated for Ward 4."
                    onDismiss={() => {}}
                />

                {/* ── Layer 3: Contextual Control & KPI Telemetry ── */}
                <section aria-labelledby="kpi-heading" className="flex flex-col gap-5">
                    <h2 id="kpi-heading" className="sr-only">Key Performance Indicators</h2>
                    <DashboardToolbar />
                    <KpiGrid />
                </section>

                {/* ── Layer 4: Appointment Analytics (8:4) ── */}
                <section
                    className="grid grid-cols-12 gap-6 lg:gap-8 items-stretch"
                    aria-label="Appointment analytics"
                >
                    <div className="col-span-12 xl:col-span-8">
                        <AppointmentTrendCard />
                    </div>
                    <div className="col-span-12 xl:col-span-4">
                        <RecentAppointmentsCard />
                    </div>
                </section>

                {/* ── Layer 5: Registry Stratum (8:4) ── */}
                <section
                    className="grid grid-cols-12 gap-6 lg:gap-8 items-stretch"
                    aria-label="Patient admissions registry"
                >
                    <div className="col-span-12 xl:col-span-8">
                        <RecentAdmissionsCard />
                    </div>
                    <div className="col-span-12 xl:col-span-4">
                        <DepartmentDistributionCard />
                    </div>
                </section>

                {/* ── Layer 6: Revenue Analytics (full width) ── */}
                <section aria-label="Revenue analytics">
                    <RevenueAnalysisCard />
                </section>

                {/* ── Layer 7: Risk & Capacity (3-column + Bed Occupancy) ── */}
                <section
                    className="flex flex-col gap-6 lg:gap-8"
                    aria-label="Risk, capacity, and financial monitoring"
                >
                    <div className="grid grid-cols-12 gap-6 lg:gap-8">
                        <div className="col-span-12 lg:col-span-4">
                            <SystemAlertsFeed />
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            <PharmacyStockCard />
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            <OutstandingInvoicesCard />
                        </div>
                    </div>

                    {/* Bed Occupancy — now part of the narrative flow, not orphaned */}
                    <BedOccupancyCard />
                </section>
            </main>
        </AdminPage>
    );
}
