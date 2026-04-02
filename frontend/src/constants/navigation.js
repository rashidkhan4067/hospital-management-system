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
  Droplets
} from 'lucide-react';
import { ROLES } from './index';

export const PATIENT_NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/doctors', label: 'Our Doctors', icon: Users },
  { to: '/my-appointments', label: 'My Visits', icon: Calendar },
  { to: '/sana-ai', label: 'Sana AI', icon: Bot },
];

export const DOCTOR_NAV = [
  { to: '/dashboard', label: 'Clinical Dashboard', icon: LayoutDashboard },
  { to: '/my-appointments', label: 'Patient Schedule', icon: Calendar },
  { to: '/patients', label: 'Medical Records', icon: Users },
];

/**
 * 📊 COMPREHENSIVE ADMIN NAVIGATION SHARDS
 * Structured in categories with sub-items for the Elite Sidebar.
 */
export const ADMIN_NAV = [
  {
    category: 'Operational Command',
    items: [
      { to: '/admin', label: 'Command Dashboard', icon: LayoutDashboard, end: true },
      { to: '/admin/finances', label: 'Financial Hub', icon: CreditCard },
      { to: '/admin/analytics', label: 'Protocol Analytics', icon: BarChart3 },
      { to: '/admin/chats', label: 'Clinical Comms', icon: MessageSquare },
    ]
  },
  {
    category: 'Identity Matrix',
    items: [
      { to: '/admin/users', label: 'User Registry', icon: Users },
      { to: '/admin/users/add', label: 'Provision Identity', icon: UserPlus },
      { to: '/admin/staff', label: 'Staff Matrix', icon: UserCog },
      { to: '/admin/roles', label: 'Role Architecture', icon: ShieldCheck },
    ]
  },
  {
    category: 'Clinical Registry',
    items: [
      { to: '/admin/patients', label: 'Patient Index', icon: HeartPulse },
      { to: '/admin/patients/add', label: 'Intake Protocol', icon: UserPlus },
      { to: '/admin/appointments', label: 'Appointment Matrix', icon: ClipboardList },
    ]
  },
  {
    category: 'Faculty Hub',
    items: [
      { to: '/admin/doctors', label: 'Authorized MDs', icon: Stethoscope },
      { to: '/admin/doctors/add', label: 'Authorize Specialist', icon: UserPlus },
      { to: '/admin/doctors/schedule', label: 'Specialist Schedule', icon: CalendarCheck },
      { to: '/admin/doctors/specialty', label: 'Clinical Specializations', icon: Database },
    ]
  },
  {
    category: 'Diagnostic & Assets',
    items: [
      { to: '/admin/lab', label: 'Lab Matrix', icon: FlaskConical },
      { to: '/admin/pharmacy', label: 'Pharmacy Shard', icon: Droplets },
      { to: '/admin/inventory', label: 'Supply Matrix', icon: Database },
    ]
  },
  {
    category: 'Neural Intelligence',
    items: [
      { to: '/admin/ai/chats', label: 'Neural Hub', icon: Bot },
      { to: '/admin/ai/logs', label: 'Propagation Logs', icon: History },
      { to: '/admin/ai/config', label: 'Neural Configuration', icon: Settings },
    ]
  },
  {
    category: 'System Control',
    items: [
      { to: '/admin/departments', label: 'Clinical Units', icon: Building2 },
      { to: '/admin/notifs/send', label: 'Global Alerts', icon: Bell },
      { to: '/admin/security/audit', label: 'Security Audit', icon: History },
      { to: '/admin/settings/general', label: 'System Protocol', icon: Settings },
    ]
  },
];

export const COMMON_NAV = [
  { to: '/profile', label: 'My Profile', icon: UserCog },
  { to: '/settings', label: 'Settings', icon: Settings },
];

/**
 * Helper to get navigation based on role
 */
export const getNavigationByRole = (role) => {
  switch (role) {
    case ROLES.ADMIN: return { primary: ADMIN_NAV }; // For Admin, we use the categorical structure
    case ROLES.DOCTOR: return { primary: DOCTOR_NAV };
    case ROLES.PATIENT: return { primary: PATIENT_NAV };
    default: return { primary: [] };
  }
};
