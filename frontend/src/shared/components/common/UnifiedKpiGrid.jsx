import React from 'react';
import { StatsCard } from '@/shared/components/ui';

/**
 * 🛰️ UnifiedKpiGrid
 * A standardized 4-column KPI row used across the Al Shifaa administrative command centers.
 * Replaces domain-specific KPI grids (PatientKpiGrid, AppointmentKpiGrid, etc.)
 */
const UnifiedKpiGrid = ({ stats = [], loading = false, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 ${className}`}>
      {stats.map((stat, i) => (
        <StatsCard 
          key={i} 
          {...stat} 
          value={loading ? '...' : stat.value} 
        />
      ))}
    </div>
  );
};

export default UnifiedKpiGrid;
