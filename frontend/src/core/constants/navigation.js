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
    category: 'Management',
    items: [
      { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/admin/finances', label: 'Finances & Fees', icon: CreditCard },
      { to: '/admin/analytics', label: 'Reports', icon: BarChart3 },
      { to: '/admin/chats', label: 'Messages', icon: MessageSquare },
    ]
  },
  {
    category: 'Users & Staff',
    items: [
      { to: '/admin/users', label: 'All Users', icon: Users },
      { to: '/admin/users/add', label: 'Add New User', icon: UserPlus },
      { to: '/admin/staff', label: 'Hospital Staff', icon: UserCog },
      { to: '/admin/roles', label: 'User Roles', icon: ShieldCheck },
    ]
  },
  {
    category: 'Patients',
    items: [
      { to: '/admin/patients', label: 'Find Patient', icon: HeartPulse },
      { to: '/admin/patients/add', label: 'Add Patient', icon: UserPlus },
      { to: '/admin/appointments', label: 'Appointments', icon: ClipboardList },
    ]
  },
  {
    category: 'Doctors Control',
    items: [
      { to: '/admin/doctors', label: 'All Doctors', icon: Stethoscope },
      { to: '/admin/doctors/add', label: 'Add Doctor', icon: UserPlus },
      { to: '/admin/doctors/schedule', label: 'Doctor Rota', icon: CalendarCheck },
      { to: '/admin/doctors/specialty', label: 'Specialties', icon: Database },
    ]
  },
  {
    category: 'Store & Lab',
    items: [
      { to: '/admin/lab', label: 'Laboratory', icon: FlaskConical },
      { to: '/admin/pharmacy', label: 'Pharmacy', icon: Droplets },
      { to: '/admin/inventory', label: 'Medicine & Stock', icon: Database },
    ]
  },
  {
    category: 'AI Assistant',
    items: [
      { to: '/admin/ai-agent/chats', label: 'AI Chats', icon: Bot },
      { to: '/admin/ai-agent/logs', label: 'System Logs', icon: History },
      { to: '/admin/ai-agent/config', label: 'AI Settings', icon: Settings },
    ]
  },
  {
    category: 'Settings',
    items: [
      { to: '/admin/departments', label: 'Departments', icon: Building2 },
      { to: '/admin/notifs/send', label: 'Group Alerts', icon: Bell },
      { to: '/admin/security/audit', label: 'Security Log', icon: History },
      { to: '/admin/settings/general', label: 'General Settings', icon: Settings },
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

