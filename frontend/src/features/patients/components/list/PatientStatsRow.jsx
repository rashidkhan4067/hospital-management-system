import React from 'react';
import { Users, UserPlus, Zap } from 'lucide-react';
import UnifiedKpiGrid from '@/shared/components/common/UnifiedKpiGrid';

/**
 * 📊 PatientStatsRow
 * Stats row — Total patients, new this month, active today — 3 stat cards on top.
 */
export default function PatientStatsRow({ total, newThisMonth, activeToday, loading }) {
  const stats = [
    { title: 'Total Patients Hub', value: total || '0', icon: Users, trend: 'Clinical Identity Matrix' },
    { title: 'New Registration Node', value: newThisMonth || '0', icon: UserPlus, trend: 'Temporal Shard (Monthly)' },
    { title: 'Active Admission Flow', value: activeToday || '0', icon: Zap, trend: 'Real-time Inpatient Sync' }
  ];

  return <UnifiedKpiGrid loading={loading} stats={stats} gridCols="grid-cols-1 md:grid-cols-3" />;
}
