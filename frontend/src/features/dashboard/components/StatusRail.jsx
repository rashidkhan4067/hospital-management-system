import React from 'react';
import { Calendar, Activity, Clock, Bed } from 'lucide-react';
import { MetricGrid, MetricCard } from '@/components/primitives';

const Sparkline = () => (
  <svg className="w-full h-8 mt-2 opacity-30" viewBox="0 0 100 20" preserveAspectRatio="none">
    <path
      d="M0,15 Q10,5 20,12 T40,8 T60,15 T80,5 T100,10"
      fill="none"
      stroke="#1a73e8"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 🛰️ StatusRail (Refactored to Metric Architecture)
 * Dashboard-specific KPI rail utilizing the universal MetricCard primitive.
 * Maintains DRY adherence while providing temporal trend visualizers (Sparklines).
 */
export default function StatusRail({ unit }) {
  const getSimValue = (label, base) => {
    if (unit === 'All Units') return base;
    if (unit === 'Emergency') {
      if (label === 'OPD Density') return '98%';
      if (label === 'Triage Latency') return '4m';
    }
    if (unit === 'Cardiology') {
      if (label === 'Appointments') return '42';
      if (label === 'Ward Occupancy') return '99%';
    }
    return base;
  };

  const metrics = [
    { label: 'Appointments', value: getSimValue('Appointments', '12'), icon: Calendar, link: '/admin/appointments?filter=today', trend: '12%', isUp: true },
    { label: 'OPD Density', value: getSimValue('OPD Density', '84%'), icon: Activity, link: '/admin/patients?view=queue', trend: '4%', isUp: false },
    { label: 'Triage Latency', value: getSimValue('Triage Latency', '14m'), icon: Clock, link: '/admin/patients?triage=active', trend: '2m', isUp: false },
    { label: 'Ward Occupancy', value: getSimValue('Ward Occupancy', '92%'), icon: Bed, link: '/admin/patients?status=admitted', trend: '2%', isUp: true },
  ];

  return (
    <div className="w-full">
      <MetricGrid cols={4}>
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m}>
            <div className="w-full h-8 mt-2 overflow-hidden rounded-lg">
                <Sparkline />
            </div>
          </MetricCard>
        ))}
      </MetricGrid>
    </div>
  );
}

