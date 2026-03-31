import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Card, Badge, Button } from '../../ui';

export default function DoctorCard({ doctor, index, onBookClick }) {
  const name = doctor.full_name || `Dr. ${doctor.last_name}`;
  const spec = doctor.specialization_display || doctor.specialization;
  const initial = (doctor.full_name || doctor.first_name || 'D')[0];

  return (
    <Card className={`doctor-card delay-${(index % 3 + 1) * 100}`}>
      <div className="doc-avatar">
        {initial}
      </div>
      <div className="doc-info">
        <h3>{name}</h3>
        <p className="spec">{spec}</p>
        <div className="doc-meta">
          <Badge icon={Star} className="bg-warning-lite text-warning"> {doctor.experience_years || 5} Yrs Exp</Badge>
          <span className="flex items-center gap-1 text-sm text-secondary"><MapPin size={14} /> Central Clinic</span>
        </div>
        <div className="doc-price">${doctor.consultation_fee || 50} / consultation</div>
      </div>
      <Button onClick={() => onBookClick(doctor)} className="w-full mt-4">
        Book Appointment
      </Button>
    </Card>
  );
}
