import {
  LayoutDashboard,
  Users,
  UserPlus,
  ShieldCheck,
  UserCog,
  HeartPulse,
  FileText,
  Stethoscope,
  Calendar,
  CalendarCheck,
  Mic,
  MessageSquare,
  Bot,
  CreditCard,
  Receipt,
  FlaskConical,
  Building2,
  Bell,
  Mail,
  MessageCircle,
  BarChart3,
  TrendingUp,
  Settings,
  Globe,
  ShieldAlert,
  Activity,
  Key,
  Database,
  History,
  ClipboardList,
  Droplets,
  BedDouble,
  Wallet,
  DollarSign,
  FileBarChart2,
  PieChart,
  Cpu,
  BrainCircuit,
  Layers,
  CalendarRange,
  LucideCalendarClock,
  Siren,
  ServerCog,
  HardDrive,
  FileClock,
  Ambulance,
  Bed,
  ClipboardPlus,
  BadgeDollarSign,
} from 'lucide-react';
import { ROLES } from './index';

export const PATIENT_NAV = [
  { to: '/dashboard',       label: 'Dashboard',     icon: LayoutDashboard },
  { to: '/doctors',         label: 'Our Doctors',   icon: Users },
  { to: '/my-appointments', label: 'My Visits',     icon: Calendar },
  { to: '/sana-ai',         label: 'Sana AI',       icon: Bot },
];

export const DOCTOR_NAV = [
  { to: '/dashboard',       label: 'Clinical Dashboard', icon: LayoutDashboard },
  { to: '/my-appointments', label: 'Patient Schedule',   icon: Calendar },
  { to: '/patients',        label: 'Medical Records',    icon: Users },
];

/**
 * 📊 COMPREHENSIVE ADMIN NAVIGATION — Full HMS Sidebar Structure
 * Organized into 6 master categories per the HMS Master Architecture Plan.
 */
export const ADMIN_NAV = [

  // ── 1. CORE MANAGEMENT ──────────────────────────────────────────────────────
  {
    category: 'Core Management',
    items: [
      { to: '/admin',           label: 'Dashboard',        icon: LayoutDashboard, end: true },
      { to: '/admin/analytics', label: 'Analytics',        icon: BarChart3 },
      { to: '/admin/appointments', label: 'Appointments',  icon: Calendar },
      { to: '/admin/chats',     label: 'Messages',         icon: MessageSquare },
    ]
  },

  // ── 2. CLINICAL ─────────────────────────────────────────────────────────────
  {
    category: 'Clinical',
    items: [
      { to: '/admin/patients',    label: 'Patients (EMR)',   icon: HeartPulse },
      { to: '/admin/patients/add', label: 'Add Patient',    icon: UserPlus },
      { to: '/admin/doctors',     label: 'Doctors',          icon: Stethoscope },
      { to: '/admin/opd-queue',   label: 'OPD Queue',        icon: ClipboardList },
      { to: '/admin/wards',       label: 'Ward & Beds',      icon: BedDouble },
      { to: '/admin/admissions',  label: 'Admissions',       icon: ClipboardPlus },
      { to: '/admin/lab',         label: 'Laboratory',       icon: FlaskConical },
      { to: '/admin/pharmacy',    label: 'Pharmacy',         icon: Droplets },
    ]
  },

  // ── 3. FINANCIALS ───────────────────────────────────────────────────────────
  {
    category: 'Financials',
    items: [
      { to: '/admin/billing',           label: 'Billing & Invoices', icon: Receipt },
      { to: '/admin/expenses',          label: 'Expenses',           icon: Wallet },
      { to: '/admin/reports/financial', label: 'Financial Reports',  icon: FileBarChart2 },
    ]
  },

  // ── 4. STAFF ────────────────────────────────────────────────────────────────
  {
    category: 'Staff',
    items: [
      { to: '/admin/users',         label: 'All Users',       icon: Users },
      { to: '/admin/staff',         label: 'Hospital Staff',  icon: UserCog },
      { to: '/admin/staff/roster',  label: 'Shift Roster',    icon: CalendarRange },
      { to: '/admin/staff/leaves',  label: 'Leave Requests',  icon: FileClock },
      { to: '/admin/roles',         label: 'Roles & Perms',   icon: ShieldCheck },
    ]
  },

  // ── 5. AI & INTELLIGENCE ────────────────────────────────────────────────────
  {
    category: 'AI & Intelligence',
    items: [
      { to: '/sana-ai',                label: 'Sana AI',        icon: Bot },
      { to: '/admin/ai-agent/logs',    label: 'AI Logs',        icon: History },
      { to: '/admin/ai-agent/chats',   label: 'AI Chats',       icon: MessageCircle },
      { to: '/admin/ai-agent/insights',label: 'AI Insights',    icon: BrainCircuit },
      { to: '/admin/ai-agent/config',  label: 'AI Config',      icon: Cpu },
    ]
  },

  // ── 6. SYSTEM ───────────────────────────────────────────────────────────────
  {
    category: 'System',
    items: [
      { to: '/admin/departments',       label: 'Departments',       icon: Building2 },
      { to: '/admin/inventory',         label: 'Inventory & Assets', icon: Layers },
      { to: '/admin/settings',          label: 'Settings',           icon: Settings },
      { to: '/admin/settings/gateway',  label: 'Notifications',      icon: Bell },
      { to: '/admin/security/audit',    label: 'Audit Log',          icon: ShieldAlert },
      { to: '/admin/settings/health',   label: 'System Health',      icon: ServerCog },
    ]
  },
];

export const COMMON_NAV = [
  { to: '/profile', label: 'My Profile', icon: UserCog },
  { to: '/settings', label: 'Settings',  icon: Settings },
];

/**
 * Helper to get navigation based on role
 */
export const getNavigationByRole = (role) => {
  switch (role) {
    case ROLES.ADMIN:   return { primary: ADMIN_NAV };
    case ROLES.DOCTOR:  return { primary: DOCTOR_NAV };
    case ROLES.PATIENT: return { primary: PATIENT_NAV };
    default:            return { primary: [] };
  }
};
