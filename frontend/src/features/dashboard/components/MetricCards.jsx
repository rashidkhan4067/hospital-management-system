import React from 'react';
import { StatsCard } from '@/shared/components/ui';

/**
 * 📊 Professional SaaS Stat Matrix
 * Refactored to use the global StatsCard for absolute UI consistency.
 */
const MetricCards = ({ metrics = [] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {metrics.map((stat, i) => (
                <StatsCard 
                    key={i} 
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon} 
                    trend={stat.trend}
                    color={stat.color}
                    onClick={stat.onClick}
                />
            ))}
        </div>
    );
};

export default MetricCards;
