import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminPage from '@/layouts/AdminPage';
import DashboardToolbar from '../../dashboard/components/DashboardToolbar';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { useDataStore } from '@/core/store/useDataStore';
import Loading from '@/components/composed/Loading';

// 🏗️ Analytical Intelligence Shards (Institutional Standarized)
import ClinicalPulseChart from '../components/ClinicalPulseChart';
import DepartmentMatrixCard from '../components/DepartmentMatrixCard';
import DoctorPerformanceTable from '../components/DoctorPerformanceTable';
import OperationsPulseCard from '../components/OperationsPulseCard';
import DemographicDistributionCard from '../components/DemographicDistributionCard';
import InsuranceVelocityCard from '../components/InsuranceVelocityCard';
import WardCapacityWidget from '../components/WardCapacityWidget';

import InstitutionalAlertStream from '../components/InstitutionalAlertStream';
import AnalyticalRegistry from '../components/AnalyticalRegistry';
import AnalyticsKpiGrid from '../components/AnalyticsKpiGrid';

// 🏛️ Advanced Operational Shards (Utility-First)
import AdmissionChannelShard from '../components/AdmissionChannelShard';
import ClinicalQueueVelocity from '../components/ClinicalQueueVelocity';
import CriticalResourceVault from '../components/CriticalResourceVault';

/**
 * 📈 AnalyticsPage (Clinical Business Intelligence hub)
 * Re-engineered with absolute design parity to the core dashboard.
 * Expanded with a multi-dimensional, properly adjusted compact investigative matrix.
 */
const AnalyticsPage = () => {
    const [searchParams] = useSearchParams();
    const setFilters = useDataStore(s => s.setFilters);
    const { data, isLoading } = useAnalyticsData();

    useEffect(() => {
        const query = searchParams.get('q') || '';
        setFilters({ searchQuery: query });
    }, [searchParams, setFilters]);

    return (
        <AdminPage>
            <main className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto w-full font-sans animate-in fade-in duration-700">
                
                <section aria-label="Analytical Toolbar"><DashboardToolbar /></section>

                {/* 📊 KPI Registry */}
                <AnalyticsKpiGrid isLoading={isLoading} />

                {/* 📈 Row 4: Primary Strategic Analytics & Live Shards */}
                <section className="grid grid-cols-1 xl:grid-cols-12 gap-[14px]" aria-label="Strategic Matrix">
                    {/* Primary Pulse Chart (Strategic View) */}
                    <div className="xl:col-span-8">
                        <ClinicalPulseChart data={data?.pulseSeries} isLoading={isLoading} />
                    </div>

                    {/* Operational Intelligence (Alert Feed) */}
                    <div className="xl:col-span-4">
                        <InstitutionalAlertStream data={data?.alerts} isLoading={isLoading} />
                    </div>
                </section>                {/* 📊 Row 5: Diagnostic Performance Trio */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]" aria-label="Diagnostic Metrics">
                    <DemographicDistributionCard data={data?.demographics} isLoading={isLoading} />
                    <InsuranceVelocityCard data={data?.insuranceVelocity} isLoading={isLoading} />
                    <WardCapacityWidget data={data?.wardCapacity} isLoading={isLoading} />
                </section>

                {/* 🏷️ Row 6: Tactical Operational & Resource Shards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]" aria-label="Operational Matrix">
                    <AdmissionChannelShard data={data?.admissionChannels} isLoading={isLoading} />
                    <ClinicalQueueVelocity data={data?.clinicalQueues} isLoading={isLoading} />
                    <CriticalResourceVault data={data?.resourceVault} isLoading={isLoading} />
                </section>

                {/* ⚙️ Row 7: Operational Command Shard (Full Width) */}
                <section aria-label="Operational Pulse Velocity">
                    <OperationsPulseCard
                        waitTimes={data?.waitTimes}
                        inventory={data?.inventoryBurn}
                        isLoading={isLoading}
                    />
                </section>

                {/* 🩺 Row 8: Clinical Integrity & Personnel Matrix */}
                <section className="grid grid-cols-1 xl:grid-cols-12 gap-[14px]" aria-label="Integrity Shards">
                    {/* Clinical Integrity Efficiency Matrix */}
                    <div className="xl:col-span-5">
                        <DepartmentMatrixCard data={data?.deptPerformance} isLoading={isLoading} />
                    </div>
                    {/* Practitioner Efficiency Ledger */}
                    <div className="xl:col-span-7">
                        <DoctorPerformanceTable data={data?.practitionerScore || []} isLoading={isLoading} />
                    </div>
                </section>

                {/* 📉 Row 9: The Data Root (Intelligence Ledger) */}
                <section aria-label="Tactical Intelligence Registry">
                    <AnalyticalRegistry data={data?.registryData} isLoading={isLoading} />
                </section>

                {/* 📟 Institutional Ledger Footnote */}
                <footer className="mt-8 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold text-text-sub opacity-30 uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-6">
                        <span>Node: SITE-PK-ISL-BI-04</span>
                        <span>Shard: ANALYTICS-PREDICTIVE-SYNC</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span>Last Intelligence Pulse: {new Date().toLocaleTimeString()}</span>
                        <span>Cite-PK Enterprise Intelligence v5.24</span>
                    </div>
                </footer>
            </main>
        </AdminPage>
    );
};

export default AnalyticsPage;
