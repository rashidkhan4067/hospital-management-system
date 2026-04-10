import React from 'react';
import { MetricGrid, MetricCard } from '@/components/primitives';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { ShimmerCard } from './AnalyticsSkeleton';
import { Calendar, Activity, Users, Target } from 'lucide-react';

export default function MetricMatrix() {
  const { data, isLoading } = useAnalyticsData();

  const ICONS = {
    appt: Calendar,
    rev: Activity,
    pat: Users,
    conv: Target
  };

  const LABELS = {
    appt: 'Total Appointments',
    rev: 'Total Revenue',
    pat: 'New Patients',
    conv: 'Conversion Rate'
  };

  const SUBS = {
    appt: 'Scheduled Bookings',
    rev: 'Net Operational Gain',
    pat: 'Registry Expansion',
    conv: 'Clinical Finality'
  };

  if (isLoading) {
    return (
      <MetricGrid cols={4} gap={8}>
        {[1, 2, 3, 4].map(i => <ShimmerCard key={i} />)}
      </MetricGrid>
    );
  }

  const kpis = data?.kpis || [];

  return (
    <MetricGrid cols={4} gap={8}>
      {kpis.map((kpi) => (
        <MetricCard
          key={kpi.id}
          label={LABELS[kpi.id]}
          value={kpi.value}
          subLabel={SUBS[kpi.id]}
          icon={ICONS[kpi.id]}
          trend={kpi.trend}
          isUp={kpi.isUp}
          link={`/admin/reports/${kpi.id}`}
        />
      ))}
    </MetricGrid>
  );
}
