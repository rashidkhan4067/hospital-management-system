import React from 'react';
import { useAuthStore } from '@/core/store/useAuthStore';
import { ROLES } from '@/core/constants';
import PatientDoctorDetailPage from '@/features/clinical/doctors/pages/PatientDoctorDetailPage';
import AdminDoctorPage from '@/features/clinical/doctors/pages/DoctorRecordPage';

export default function DoctorDetailDispatcher() {
  const { user } = useAuthStore();
  const role = user?.role;

  if (role === ROLES.ADMIN) {
    return <AdminDoctorPage />;
  }

  return <PatientDoctorDetailPage />;
}


