/**
 * 🛰️ Shifaa HMS UI Primitives (Material 3 Lockdown)
 * Atomic components following Google Enterprise standards.
 */

// 🧱 Structural Primitives
export { default as Button } from './Button';
export { default as IconButton } from './IconButton';
export { default as Card } from './Card';

export { default as Badge } from './Badge';
export { default as Loading } from './Loading';
export { default as Avatar } from './Avatar';
export { default as Skeleton } from './Skeleton';
export { default as UnifiedSkeleton } from './UnifiedSkeleton';
export { default as EmptyState } from './EmptyState';
export { default as MiniWidget } from './MiniWidget';

// 📊 Intelligence Nodes
export { default as KpiCard } from './KpiCard';
export { default as StatCard } from './KpiCard'; // Architectural Alias
export { MetricCard, MetricGrid } from './MetricGrid';
export { default as SegmentedControl } from './SegmentedControl'; // 🕹️ New Selection Primitive

// 🏛️ Administrative Modules
export { default as PageHeader } from './PageHeader';
export { default as AdminTable } from './AdminTable';
export { default as FilterBar } from './FilterBar';
export { default as TableActions } from './TableActions';

// 🛰️ Material 3 Interaction Shells (Modern Spec)
export { default as MaterialDialog } from './MaterialDialog';
export { default as MaterialSideSheet } from './MaterialSideSheet';
export { default as M3TextField } from './M3TextField';
export { default as FullScreenDialog } from './FullScreenDialog';

// 🔄 Compatibility Layer
export { default as Modal } from './MaterialDialog';
export { default as Input } from './M3TextField';
export { default as StatsCard } from './Card';
export { default as Alert } from './Badge';
