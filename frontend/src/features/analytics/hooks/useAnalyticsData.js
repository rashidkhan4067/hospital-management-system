import { useQuery } from '@tanstack/react-query';
import { useAnalytics } from '../context/AnalyticsContext';

/**
 * 🛰️ useAnalyticsData (Interconnected Intelligence Hook)
 * All clinical widgets subscribe to this hook for synchronized telemetry.
 * Automatically triggers a global dashboard refresh when URL filters change.
 */
export function useAnalyticsData() {
  const { filters } = useAnalytics();

  // 🏥 Clinical Discovery Query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['analytics', filters],
    queryFn: async () => {
      // ⛓️ Simulate professional clinical API latency
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 🧪 Intelligence Simulation Logic
      // In production, this would be: return fetchAnalytics(filters);
      return generateSimulationData(filters);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes fresh
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    filters // provide back filters for local widget logic
  };
}

// 🧠 Intelligence Simulation Engine (Google Standard)
function generateSimulationData(filters) {
  const { period, unit, practitioner } = filters;
  
  // Logic: Change numbers based on unit/period
  const seed = (unit.length + practitioner.length + period.length) % 10;
  const multiplier = unit === 'All Departments' ? 1 : 0.4;

  return {
    kpis: [
      { id: 'appt', value: Math.floor((1450 + seed * 100) * multiplier).toLocaleString(), trend: '+8%', isUp: true },
      { id: 'rev', value: `PKR ${(4.8 + seed * 0.2).toFixed(1)}M`, trend: '+14%', isUp: true },
      { id: 'pat', value: Math.floor((840 + seed * 50) * multiplier).toLocaleString(), trend: '+12%', isUp: true },
      { id: 'conv', value: `${(85.4 + seed).toFixed(1)}%`, trend: '-2.4%', isUp: false },
    ],
    appointmentsTrend: [
      { name: '01 May', value: 40 + seed },
      { name: '05 May', value: 30 + seed * 2 },
      { name: '10 May', value: 45 + seed },
      { name: '15 May', value: 50 + seed * 3 },
      { name: '20 May', value: 35 + seed },
      { name: '25 May', value: 60 + seed * 2 },
      { name: '30 May', value: 55 + seed },
    ],
    revenueData: [
      { name: 'Week 1', revenue: 1200000 + seed * 50000 },
      { name: 'Week 2', revenue: 900000 + seed * 100000 },
      { name: 'Week 3', revenue: 1500000 + seed * 30000 },
      { name: 'Week 4', revenue: 1100000 + seed * 20000 },
    ],
    doctorPerformance: [
      { id: 1, name: 'Dr. Sarah Ahmed', appt: 142 + seed, revenue: 450000 + seed * 1000, rating: 4.9, status: 'Active' },
      { id: 2, name: 'Dr. John Carter', appt: 98 + seed, revenue: 280000 + seed * 500, rating: 4.8, status: 'On Leave' },
      { id: 3, name: 'Dr. Elena Vance', appt: 115 + seed, revenue: 320000 + seed * 800, rating: 4.7, status: 'Active' },
    ].filter(doc => unit === 'All Departments' || (seed % 2 === 0 ? doc.name.includes('Sarah') : doc.name.includes('John')))
  };
}
