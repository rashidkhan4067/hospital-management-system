import React, { useState, useEffect } from 'react';
import PatientSearchBar from '../components/patient/PatientSearchBar';
import PatientDoctorGrid from '../components/patient/PatientDoctorGrid';
import { useAdminDoctors } from '@/features/clinical/doctors/hooks/useDoctors';
import AdminPage from '@/layouts/AdminPage';

/**
 * 🧛 Specialist Marketplace (Patient Edition)
 * Optimized for ease of search & booking.
 */
export default function PatientDoctorsPage() {
  const { doctors, loading } = useAdminDoctors();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const specializations = [
    { label: 'All Fields', value: 'all' },
    { label: 'Cardiology', value: 'cardiology' },
    { label: 'Dentistry', value: 'dentistry' },
    { label: 'Neurology', value: 'neurology' },
    { label: 'Pediatrics', value: 'pediatrics' },
    { label: 'Orthopedics', value: 'orthopedics' },
  ];

  useEffect(() => {
    let result = doctors;
    if (activeFilter !== 'all') {
      result = result.filter(doc => doc.specialization?.toLowerCase() === activeFilter.toLowerCase());
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(doc => 
        doc.full_name?.toLowerCase().includes(q) ||
        doc.specialization?.toLowerCase().includes(q) ||
        doc.specialization_display?.toLowerCase().includes(q)
      );
    }
    setFilteredDoctors(result);
  }, [activeFilter, searchQuery, doctors]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-sans p-4 md:p-6 pb-20 max-w-[1700px] mx-auto">
      {/* 🏙️ Search & Command Center */}
      <PatientSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        specializations={specializations}
      />

      {/* 🧬 Specialists Grid */}
      <div className="min-h-[600px]">
        <PatientDoctorGrid 
            doctors={filteredDoctors} 
            loading={loading} 
        />
      </div>

      {/* 🔘 Atmospheric Glow */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-accent-primary/5 blur-[150px] rounded-full -z-10 pointer-events-none opacity-40 animate-pulse" />
    </div>
  );
}

