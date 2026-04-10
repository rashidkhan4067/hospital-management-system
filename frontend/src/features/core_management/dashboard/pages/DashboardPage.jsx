import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';
import { useDataStore } from '@/core/store/useDataStore';

// Components
import GreetingHeader from '../components/GreetingHeader';
import DashboardToolbar from '../components/DashboardToolbar';
import KpiGrid from '../components/KpiGrid';
import AIPulseNode from '../components/AIPulseNode';
import OperationalWidgets from '../components/OperationalWidgets';
import AnalyticsCharts from '../components/AnalyticsCharts';
import AlertsPanel from '../components/AlertsPanel';
import ActivityFeed from '../components/ActivityFeed';
import QuickActions from '../components/QuickActions';

/**
 * 🏥 DashboardPage (Strict MD3 8px Alignment)
 * Standardized spacing grid using multiples of 8px (gap-8, p-8, gap-16).
 */
export default function DashboardPage() {
  const [searchParams] = useSearchParams();
  const syncFilters = useDataStore(state => state.syncFiltersFromUrl);

  useEffect(() => {
    if (searchParams) {
        syncFilters(searchParams);
    }
  }, [searchParams, syncFilters]);

  // Using p-8 (32px) and gap-8 (32px) for strict 8px grid alignment
  return (
    <AdminPage className="bg-[#FEF7FF]/50 min-h-screen">
      <div className="max-w-[1280px] mx-auto p-8 flex flex-col gap-12 sm:gap-16">
        
        <GreetingHeader />
        
        <section className="col-span-12">
            <DashboardToolbar />
        </section>

        <KpiGrid />

        <AIPulseNode />

        <section className="col-span-12">
            <QuickActions />
        </section>

        {/* 8px-multiplied grid gap (gap-8 = 32px) */}
        <section className="grid grid-cols-12 gap-8 items-start">
             <div className="col-span-12 lg:col-span-8">
                <AnalyticsCharts />
             </div>
             <div className="col-span-12 lg:col-span-4">
                <ActivityFeed />
             </div>
        </section>

        <OperationalWidgets />

        <div className="col-span-12">
            <AlertsPanel />
        </div>

      </div>
    </AdminPage>
  );
}
