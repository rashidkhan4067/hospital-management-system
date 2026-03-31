import React, { useState, useEffect } from 'react';
import { Search, Filter, Activity } from 'lucide-react';
import { getDoctors } from '../../services/doctorService';
import { Card, PageHeader, Input } from '../../components/ui';
import DoctorGrid from '../../components/features/doctors/DoctorGrid';
import BookingForm from '../../components/features/appointments/BookingForm';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();
      const docs = data.results || data;
      setDoctors(Array.isArray(docs) ? docs : []);
    } catch (error) {
      console.error("Failed to load real doctors", error);
      setDoctors([]); 
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(doc => {
    const name = doc.full_name || `${doc.first_name} ${doc.last_name}` || "Unknown Doctor";
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpec = specialization === 'All' || doc.specialization_display === specialization || doc.specialization === specialization;
    return matchesSearch && matchesSpec;
  });

  const specializations = ['All', ...new Set(doctors.map(d => d.specialization))];

  return (
    <div className="page-container animate-enter">
      <div className="doctors-header">
        <PageHeader 
          title="Find a Specialist"
          subtitle="Book appointments with top medical professionals"
        />
        
        <Card className="filters flex gap-4 p-4 mt-6">
          <Input 
            type="text" 
            placeholder="Search doctors..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
            wrapperClassName="flex-1"
          />
          <div className="spec-filter flex items-center gap-2">
            <Filter size={20} className="text-muted" />
            <select 
              value={specialization} 
              onChange={(e) => setSpecialization(e.target.value)}
              className="input-glass py-2"
              style={{ minWidth: '150px' }}
            >
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </Card>
      </div>

      {loading ? (
        <div className="loading-state">
           <Activity className="va-spin text-gradient" size={32} />
           <p>Loading doctors...</p>
        </div>
      ) : (
        <DoctorGrid 
            doctors={filteredDoctors} 
            onBookClick={(doc) => setSelectedDoctor(doc)} 
        />
      )}

      {selectedDoctor && (
        <BookingForm doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </div>
  );
}
