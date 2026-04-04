import React from 'react';
import { useAuth } from '@/core/auth/AuthContext';
import { ROLES } from '@/core/constants';
import PatientDoctorsPage from '@/features/doctors/pages/PatientDoctorsPage';
import AdminDoctorsPage from '@/features/doctors/pages/DoctorsPage';

export default function DoctorDispatcher() {
  const { role } = useAuth();

  if (role === ROLES.ADMIN) {
    return <AdminDoctorsPage />;
  }

  return <PatientDoctorsPage />;
}
