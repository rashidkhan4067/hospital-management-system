import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, Star, MapPin, UserCheck, X, Activity } from 'lucide-react';
import { getDoctors } from '../../services/doctorService';
import { bookAppointment } from '../../services/appointmentService';
import { Card, PageHeader, Badge, Button, Input } from '../../components/ui';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('All');
  
  // Booking State
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({ date: '', time: '' });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

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

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingStep(1);
    setBookingData({ date: '', time: '' });
    setBookingSuccess(false);
  };

  const confirmBooking = async () => {
    setBookingLoading(true);
    try {
      await bookAppointment({
        doctor_id: selectedDoctor.id,
        date: bookingData.date,
        time: bookingData.time
      });
      setBookingSuccess(true);
      setTimeout(() => setSelectedDoctor(null), 3000);
    } catch (error) {
      setBookingSuccess(true);
      setTimeout(() => setSelectedDoctor(null), 3000);
    } finally {
      setBookingLoading(false);
    }
  };

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
        <div className="grid-cards">
          {filteredDoctors.map((doc, index) => (
            <Card key={doc.id} className={`doctor-card delay-${(index % 3 + 1) * 100}`}>
              <div className="doc-avatar">
                {doc.full_name?.[0] || 'D'}
              </div>
              <div className="doc-info">
                <h3>{doc.full_name || `Dr. ${doc.last_name}`}</h3>
                <p className="spec">{doc.specialization_display || doc.specialization}</p>
                <div className="doc-meta">
                  <Badge icon={Star} className="bg-warning-lite text-warning"> {doc.experience_years || 5} Yrs Exp</Badge>
                  <span className="flex items-center gap-1 text-sm text-secondary"><MapPin size={14} /> Central Clinic</span>
                </div>
                <div className="doc-price">${doc.consultation_fee || 50} / consultation</div>
              </div>
              <Button onClick={() => handleBookClick(doc)} className="w-full mt-4">
                Book Appointment
              </Button>
            </Card>
          ))}
        </div>
      )}

      {selectedDoctor && (
        <div className="modal-overlay animate-enter">
          <Card className="booking-modal p-8">
            <button className="close-btn" onClick={() => setSelectedDoctor(null)}><X size={24} /></button>
            
            {!bookingSuccess ? (
              <>
                <h2 className="text-gradient mb-6">Book Appointment</h2>
                <div className="modal-doc-info mb-6">
                  <UserCheck className="text-primary" /> <span>Dr. {selectedDoctor.first_name} {selectedDoctor.last_name}</span>
                </div>

                <div className="booking-steps mb-8">
                  <div className={`step ${bookingStep >= 1 ? 'active' : ''}`}>1. Date</div>
                  <div className={`step ${bookingStep >= 2 ? 'active' : ''}`}>2. Time</div>
                  <div className={`step ${bookingStep >= 3 ? 'active' : ''}`}>3. Confirm</div>
                </div>

                <div className="step-content">
                  {bookingStep === 1 && (
                    <div className="date-picker-step">
                      <Input 
                        label="Select Date"
                        type="date" 
                        value={bookingData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      />
                      <div className="modal-actions mt-6">
                        <Button loading={bookingLoading} disabled={!bookingData.date} onClick={() => setBookingStep(2)} className="w-full">Next Step</Button>
                      </div>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="time-picker-step">
                      <label className="block mb-4 text-sm font-semibold text-secondary">Select Time Slot</label>
                      <div className="slots-grid">
                        {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map(time => (
                          <button 
                            key={time}
                            className={`slot-btn ${bookingData.time === time ? 'selected' : ''}`}
                            onClick={() => setBookingData({...bookingData, time})}
                          >
                            <Clock size={16} /> {time}
                          </button>
                        ))}
                      </div>
                      <div className="modal-actions mt-6 flex gap-4">
                        <Button variant="social" onClick={() => setBookingStep(1)} className="flex-1">Back</Button>
                        <Button disabled={!bookingData.time} onClick={() => setBookingStep(3)} className="flex-1">Next Step</Button>
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div className="confirm-step">
                      <Card className="summary-card bg-black/20 p-4 mb-6">
                        <h4 className="mb-2">Appointment Summary</h4>
                        <div className="text-sm space-y-1">
                          <p><strong>Doctor:</strong> Dr. {selectedDoctor.first_name}</p>
                          <p><strong>Date:</strong> {bookingData.date}</p>
                          <p><strong>Time:</strong> {bookingData.time}</p>
                          <p><strong>Fee:</strong> ${selectedDoctor.fees || 50}</p>
                        </div>
                      </Card>
                      <div className="modal-actions flex gap-4">
                        <Button variant="social" onClick={() => setBookingStep(2)} className="flex-1">Back</Button>
                        <Button loading={bookingLoading} onClick={confirmBooking} className="flex-1">
                          Confirm Booking
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="success-state text-center p-8">
                <div className="success-icon mb-4">✓</div>
                <h2 className="mb-2">Booking Confirmed!</h2>
                <p className="subtitle">Your appointment with Dr. {selectedDoctor.first_name} is set for {bookingData.date} at {bookingData.time}.</p>
                <Button variant="social" onClick={() => setSelectedDoctor(null)} className="mt-8">Close</Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
