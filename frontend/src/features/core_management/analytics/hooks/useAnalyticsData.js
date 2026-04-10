import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDataStore } from '@/core/store/useDataStore';
import { useEffect, useCallback } from 'react';

/**
 * 🛰️ useClinicalTelemetry (Architected for Data Integrity)
 * Enforces a 'Compute-and-Aggregate' pattern to ensure 100% parity between KPIs and Charts.
 */
export function useAnalyticsData() {
  const queryClient = useQueryClient();
  const globalFilters = useDataStore(state => state.filters);
  const updateTelemetry = useDataStore(state => state.updateTelemetry);

  const query = useQuery({
    queryKey: ['clinical-telemetry', globalFilters],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return generateSimulationTelemetry(globalFilters);
    },
    staleTime: 10 * 1000,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
  });

  const { data, isLoading } = query;

  const forceRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['clinical-telemetry'] });
  }, [queryClient]);

  useEffect(() => {
    if (data && !isLoading) {
      updateTelemetry({
        patients: { total: data.kpis[0].value, trend: data.kpis[0].trend, isUp: data.kpis[0].isUp },
        appointments: { total: data.kpis[1].value, trend: data.kpis[1].trend, isUp: data.kpis[1].isUp },
        revenue: { total: data.kpis[2].value, trend: data.kpis[2].trend, isUp: data.kpis[2].isUp },
        doctors: { total: data.kpis[3].value, trend: data.kpis[3].trend, isUp: data.kpis[3].isUp },
        loading: false
      });
    }
  }, [data, isLoading, updateTelemetry]);

  return { ...query, forceRefresh, filters: globalFilters };
}

/**
 * 🧠 Backend Aggregation Simulator (100% Data Parity)
 * Pattern: Timeseries First -> Aggregate Second.
 */
function generateSimulationTelemetry(filters) {
  const { dateRange, department, doctor } = filters;
  const isAllUnits = department === 'All';
  const isAllDocs = doctor === 'All Doctors';
  
  // 🧬 Standardized Intelligence Multipliers
  const unitMult = isAllUnits ? 1 : 0.35;
  const docMult = isAllDocs ? 1 : 0.12;
  const seed = (department.length + dateRange.length + doctor.length + Math.floor(Date.now() / 60000)) % 25;

  // 1️⃣ GENERATE PRIMARY TIMESERIES (The 'Ground Truth')
  const patientTrend = Array.from({ length: 7 }, (_, i) => ({
      name: `${i+1} May`,
      value: Math.floor((200 + seed * 10 + i * 15) * unitMult * docMult)
  }));

  const revenueSeries = [
      { name: 'W1', value: Math.floor((1200000 + seed * 5000) * unitMult * docMult) },
      { name: 'W2', value: Math.floor((900000 + seed * 7000) * unitMult * docMult) },
      { name: 'W3', value: Math.floor((1500000 + seed * 3000) * unitMult * docMult) },
      { name: 'W4', value: Math.floor((1100000 + seed * 12000) * unitMult * docMult) },
  ];

  // 2️⃣ DERIVED AGGREGATION (Ensures KPIs match Chart totals)
  const totalPatients = patientTrend.reduce((acc, curr) => acc + curr.value, 0);
  const totalRevenue = revenueSeries.reduce((acc, curr) => acc + curr.value, 0);
  const totalAppts = Math.floor(totalPatients * 0.45); // Logically inferred from patient volume

  // 3️⃣ REGISTRY LEDGER (Filtered by active matrix)
  const baseRegistryData = [
    { id: 1, patient: 'Ali Khan', dept: 'OPD', doctor: 'Dr. Ali Khan', date: '2026-05-10', status: 'Completed', revenue: 2500 },
    { id: 2, patient: 'Sara Ahmed', dept: 'IPD', doctor: 'Dr. Sara Ahmed', date: '2026-05-11', status: 'Pending', revenue: 15400 },
    { id: 3, patient: 'John Doe', dept: 'ICU', doctor: 'Dr. John Doe', date: '2026-05-12', status: 'Critical', revenue: 45000 },
    { id: 4, patient: 'Fatima Zahra', dept: 'OPD', doctor: 'Dr. Ali Khan', date: '2026-05-10', status: 'Cancelled', revenue: 0 },
  ];

  const filteredRegistry = baseRegistryData.filter(item => (isAllUnits || item.dept === department) && (isAllDocs || item.doctor === doctor));

  return {
    kpis: [
      { id: 'pat', value: totalPatients.toLocaleString(), trend: "+12.4%", isUp: true },
      { id: 'appt', value: totalAppts.toLocaleString(), trend: "+5.1%", isUp: true },
      { id: 'rev', value: `PKR ${(totalRevenue / 1000000).toFixed(2)}M`, trend: "+18.2%", isUp: true },
      { id: 'doc', value: Math.floor((45 + seed) * (isAllUnits ? 1 : 0.3)).toLocaleString(), trend: "-2.1%", isUp: false },
    ],
    patientTrend,
    revenueData: revenueSeries.map(s => ({ name: s.name, revenue: s.value })),
    deptDistribution: [
      { name: 'OPD', value: 45 * unitMult },
      { name: 'IPD', value: 35 * unitMult },
      { name: 'ICU', value: 20 * unitMult },
    ],
    registryData: filteredRegistry
  };
}
