/**
 * 🛰️ Shifaa HMS UI Primitives (Material 3 Lockdown)
 * Atomic components following Google Enterprise standards.
 */

// 🧱 Structural Primitives
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Badge } from './Badge';
export { default as Loading } from './Loading';
export { default as Avatar } from './Avatar';
export { default as Skeleton } from './Skeleton';
export { default as UnifiedSkeleton } from './UnifiedSkeleton';
export { default as EmptyState } from './EmptyState';
export { MetricCard, MetricGrid } from './MetricGrid';

// 🏛️ Administrative Modules
export { default as PageHeader } from './PageHeader';
export { default as AdminTable } from './AdminTable';
export { default as FilterBar } from './FilterBar';
export { default as TableActions } from './TableActions';
export { default as SidebarLink } from './SidebarLink';

// 🛰️ Material 3 Interaction Shells (Modern Spec)
export { default as MaterialDialog } from './MaterialDialog';
export { default as MaterialSideSheet } from './MaterialSideSheet';
export { default as M3TextField } from './M3TextField';
export { default as FullScreenDialog } from './FullScreenDialog';

// 🔄 Compatibility Layer (Prevents 404s while refactoring)
export { default as Modal } from './MaterialDialog';
export { default as Input } from './M3TextField';
export { default as StatsCard } from './Card';
export { default as Alert } from './Badge';
