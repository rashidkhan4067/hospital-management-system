import React, { useEffect, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';
import { AnalyticsProvider } from '../context/AnalyticsContext';
import { Skeleton } from '@/components/primitives';
import { useDataStore } from '@/core/store/useDataStore';

// Synchronous Components (Critical View)
import AnalyticsPageHeader from '../components/AnalyticsPageHeader';
import AnalyticsGrid from '../components/AnalyticsKpiGrid';

// 🚀 Lazy Loaded Shards
const RevenueAnalytics = lazy(() => import('../components/RevenueAnalytics'));
const PatientGrowthChart = lazy(() => import('../components/PatientGrowthChart'));
const DepartmentDistribution = lazy(() => import('../components/DepartmentDistribution'));
const AnalyticalRegistry = lazy(() => import('../components/AnalyticalRegistry'));

export default function AnalyticsPage() {
  const [searchParams] = useSearchParams();
  const syncFilters = useDataStore(state => state.syncFiltersFromUrl);
  const focusType = searchParams.get('type');

  // 🛰️ QA Protocol: Deep-Link Sync
  // Ensures that incoming URL context (range, unit, doctor) hydrates the global store.
  useEffect(() => {
    if (searchParams.size > 0) {
      syncFilters(searchParams);
    }
  }, [searchParams, syncFilters]);

  // 🏥 Context Orientation Effect
  useEffect(() => {
    if (focusType) {
      const timer = setTimeout(() => {
        const targetId = `shifaa-${focusType}-node`;
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-4', 'ring-primary/20', 'transition-all');
          setTimeout(() => element.classList.remove('ring-4', 'ring-primary/20'), 3000);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [focusType]);

  const ShardFallback = () => (
    <div className="w-full h-80 bg-surface-bright border border-outline/10 rounded-[32px] p-8 flex flex-col gap-4">
      <Skeleton className="h-12 w-48 rounded-full" />
      <Skeleton className="flex-1 w-full rounded-2xl" />
    </div>
  );

  return (
    <AnalyticsProvider>
      <AdminPage className="bg-[#FEF7FF]/50 min-h-screen">
        <div className="max-w-[1280px] mx-auto p-8 flex flex-col gap-12 sm:gap-16">
          <AnalyticsPageHeader />
          <div id="shifaa-meta-node">
            <AnalyticsGrid />
          </div>
          <Suspense fallback={<ShardFallback />}>
            <section className="grid grid-cols-12 gap-8 items-start">
              <div id="shifaa-growth-node" className="col-span-12 lg:col-span-8 rounded-[32px] overflow-hidden">
                <PatientGrowthChart />
              </div>
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                <div id="shifaa-finance-node" className="rounded-[32px] overflow-hidden">
                  <RevenueAnalytics />
                </div>
                <div id="shifaa-distribution-node" className="rounded-[32px] overflow-hidden">
                  <DepartmentDistribution />
                </div>
              </div>
            </section>
            <section id="shifaa-schedule-node" className="col-span-12 pb-12 rounded-[32px] overflow-hidden">
              <AnalyticalRegistry />
            </section>
          </Suspense>
        </div>
      </AdminPage>
    </AnalyticsProvider>
  );
}
