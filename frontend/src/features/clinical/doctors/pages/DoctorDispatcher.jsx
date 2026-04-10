import React from 'react';
import { useAuthStore } from '@/core/store/useAuthStore';
import { ROLES } from '@/core/constants';
import PatientDoctorsPage from '@/features/clinical/doctors/pages/PatientDoctorsPage';
import AdminDoctorsPage from '@/features/clinical/doctors/pages/DoctorsPage';

export default function DoctorDispatcher() {
  const { user } = useAuthStore();
  const role = user?.role;

  if (role === ROLES.ADMIN) {
    return <AdminDoctorsPage />;
  }

  return <PatientDoctorsPage />;
}


