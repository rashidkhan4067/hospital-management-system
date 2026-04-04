import React from 'react';
import { useAuth } from '@/core/auth/AuthContext';
import { ROLES } from '@/core/constants';
import PatientBookingPage from '@/features/appointments/pages/PatientBookingPage';
import AdminAppointmentsPage from '@/features/appointments/pages/AppointmentsPage';

export default function BookingDispatcher() {
  const { role } = useAuth();

  if (role === ROLES.ADMIN) {
    return <AdminAppointmentsPage autoOpenAdd={true} />;
  }

  return <PatientBookingPage />;
}
