import React from 'react';

/**
 * 🛰️ Navigation Registry (Material 3 Spec)
 * Defines all clinical and administrative routes with inline SVGs.
 */

const DashIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
  </svg>
);

const ChartIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const DoctorIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const QueueIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BedIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
  </svg>
);

const AdmissionIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
  </svg>
);

const LabIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M4.5 3h15M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3M6 14h12" />
  </svg>
);

const PharmacyIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
    <path d="m8.5 8.5 7 7" />
  </svg>
);

const BillingIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

// ... will complete with more real icons

const MoneyIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <path d="M8 12h8" />
  </svg>
);

const ReportIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const StaffIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

const RosterIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="9" y1="4" x2="9" y2="22" />
  </svg>
);

const RoleIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const SanaIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z" />
    <path d="M12 8v4l3 3" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity={fill ? "1" : "0.2"} />
  </svg>
);

const AILogIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
);

const DeptIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const SettingsIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1-1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
);

const AuditIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const HealthIcon = ({ fill }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export const NAV_SECTIONS = [
  {
    id: 'core',
    label: 'Core Management',
    items: [
      { label: 'Dashboard', path: '/admin', icon: DashIcon, exact: true },
      { label: 'Analytics', path: '/admin/analytics', icon: ChartIcon },
      { label: 'Appointments', path: '/admin/appointments', icon: CalIcon, badge: null },
    ]
  },
  {
    id: 'clinical',
    label: 'Clinical',
    items: [
      { label: 'Patients (EMR)', path: '/admin/patients', icon: UserIcon },
      { label: 'Doctors', path: '/admin/doctors', icon: DoctorIcon },
      { label: 'OPD Queue', path: '/admin/opd-queue', icon: QueueIcon },
      { label: 'Ward / Beds', path: '/admin/wards', icon: BedIcon },
      { label: 'Admissions', path: '/admin/admissions', icon: AdmissionIcon },
      { label: 'Lab', path: '/admin/lab', icon: LabIcon },
      { label: 'Pharmacy', path: '/admin/pharmacy', icon: PharmacyIcon },
    ]
  },
  {
    id: 'financial',
    label: 'Financials',
    items: [
      { label: 'Billing', path: '/admin/billing', icon: BillingIcon },
      { label: 'Expenses', path: '/admin/expenses', icon: MoneyIcon },
      { label: 'Financial Reports', path: '/admin/reports/financial', icon: ReportIcon },
    ]
  },
  {
    id: 'staff',
    label: 'Staff',
    items: [
      { label: 'All Users', path: '/admin/users', icon: UserIcon },
      { label: 'Staff', path: '/admin/staff', icon: StaffIcon },
      { label: 'Shift Roster', path: '/admin/staff/roster', icon: RosterIcon },
      { label: 'Leave Requests', path: '/admin/staff/leaves', icon: CalIcon, badge: 3 },
      { label: 'Roles & Perms', path: '/admin/roles', icon: RoleIcon },
    ]
  },
  {
    id: 'ai',
    label: 'AI & Intelligence',
    items: [
      { label: 'Sana AI', path: '/sana-ai', icon: SanaIcon, pulse: true, isAI: true },
      { label: 'AI Logs', path: '/admin/ai-agent/logs', icon: AILogIcon, isAI: true },
      { label: 'AI Chats', path: '/admin/ai-agent/chats', icon: QueueIcon, isAI: true },
      { label: 'AI Insights', path: '/admin/ai-agent/insights', icon: ChartIcon, isAI: true },
    ]
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { label: 'Departments', path: '/admin/departments', icon: DeptIcon },
      { label: 'Settings', path: '/admin/settings', icon: SettingsIcon },
      { label: 'Notifications', path: '/admin/settings/gateway', icon: CalIcon },
      { label: 'Audit Log', path: '/admin/security/audit', icon: AuditIcon },
      { label: 'System Health', path: '/admin/settings/health', icon: HealthIcon },
    ]
  }
];
