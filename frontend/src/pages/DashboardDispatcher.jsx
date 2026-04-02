import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../constants';
import PatientDashboard from './patient/Dashboard';
import DoctorDashboard from './doctor/Dashboard';
import AdminDashboard from './admin/Dashboard';

export default function DashboardPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorCount, setDoctorCount] = useState(0);

  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [apptsRes, docsRes] = await Promise.all([
          apiClient.get('/appointments/'),
          apiClient.get('/doctors/')
        ]);
        const apptsData = Array.isArray(apptsRes.data) ? apptsRes.data : apptsRes.data.results || [];
        setAppointments(apptsData);
        
        const docsData = Array.isArray(docsRes.data) ? docsRes.data : docsRes.data.results || [];
        setDoctorCount(docsData.length || 0);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.error("Dashboard real-time sync failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000); // 🚀 Real-time sync every 10s
    return () => clearInterval(interval);
  }, []);

  const role = user?.role || ROLES.PATIENT;

  // Dispatch to role-specific dashboard
  switch (role) {
    case ROLES.ADMIN:
      return (
        <AdminDashboard 
          user={user} 
          appointments={appointments} 
          loading={loading} 
          doctorCount={doctorCount} 
        />
      );
    case ROLES.DOCTOR:
      return (
        <DoctorDashboard 
          user={user} 
          appointments={appointments} 
          loading={loading} 
        />
      );
    case ROLES.PATIENT:
    default:
      return (
        <PatientDashboard 
          user={user} 
          appointments={appointments} 
          loading={loading} 
          doctorCount={doctorCount} 
        />
      );
  }
}

