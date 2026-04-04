import React from 'react';
import { useAuth } from '@/core/auth/AuthContext';
import { ROLES } from '@/core/constants';
import PatientDoctorDetailPage from '@/features/doctors/pages/PatientDoctorDetailPage';
import AdminDoctorPage from '@/features/doctors/pages/DoctorRecordPage';

export default function DoctorDetailDispatcher() {
  const { role } = useAuth();

  if (role === ROLES.ADMIN) {
    return <AdminDoctorPage />;
  }

  return <PatientDoctorDetailPage />;
}
