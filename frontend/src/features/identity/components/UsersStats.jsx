import React from 'react';
import { Users, Stethoscope, Briefcase, Activity } from 'lucide-react';
import { StatsCard } from '@/shared/components/ui';

export default function UsersStats({ loading, users }) {
  const stats = [
    { title: "Total Users", value: loading ? "..." : users.length, icon: Users, trend: "Current" },
    { title: "Active Doctors", value: loading ? "..." : users.filter(u => u.role === 'doctor').length, icon: Stethoscope, trend: "Current" },
    { title: "Admin Staff", value: loading ? "..." : users.filter(u => u.role === 'admin').length, icon: Briefcase, trend: "Current" },
    { title: "Patients", value: loading ? "..." : users.filter(u => u.role === 'patient').length, icon: Activity, trend: "Total" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
    </div>
  );
}
