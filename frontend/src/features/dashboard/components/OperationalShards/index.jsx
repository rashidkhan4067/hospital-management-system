import React, { memo, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Activity, ShieldAlert, LayoutGrid } from 'lucide-react';
import { UnifiedKpiGrid } from '@/components/composed';
import { useOperationalTelemetry } from '../../hooks/useOperationalTelemetry';

/**
 * 🔢 CountUp Component
 * Animates numeric values using Framer Motion to prevent high-frequency re-renders.
 */
const CountUp = ({ value, suffix = "" }) => {
    const nodeRef = useRef(null);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
        return controls.stop;
    }, [value, count]);

    useMotionValueEvent(rounded, "change", (latest) => {
        if (nodeRef.current) {
            nodeRef.current.textContent = `${latest}${suffix}`;
        }
    });

    return <span ref={nodeRef} className="tabular-nums">0{suffix}</span>;
};

/**
 * 🛰️ OperationalShards (Mission Control Hub)
 * Refactored to use UnifiedKpiGrid for enterprise consistency.
 */
const OperationalShards = memo(({ isSyncActive }) => {
    const navigate = useNavigate();
    const { metrics, loading } = useOperationalTelemetry(isSyncActive);

    // 🗺️ Telemetry to KPI Mapping Registry
    const iconMap = {
        appointments: Calendar,
        opd: Activity,
        triage: ShieldAlert,
        wards: LayoutGrid
    };

    const kpiStats = metrics.map(shard => ({
        title: shard.label,
        value: <CountUp value={shard.value} suffix={shard.suffix} />,
        icon: iconMap[shard.id] || Activity,
        trend: shard.status,
        color: shard.score >= 90 ? '#10b981' : shard.score >= 70 ? '#0ea5e9' : '#f59e0b',
        onClick: () => navigate(shard.path)
    }));

    return (
        <div className="relative z-10 -mb-6">
            <UnifiedKpiGrid 
                loading={loading} 
                stats={kpiStats} 
                className="!mb-0"
            />
        </div>
    );
});

OperationalShards.displayName = 'OperationalShards';

export default OperationalShards;
