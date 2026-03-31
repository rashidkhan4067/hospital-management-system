import React from 'react';
import { Clock } from 'lucide-react';

export default function SlotPicker({ selectedTime, onSelectTime, slots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] }) {
  return (
    <div className="time-picker-step">
      <label className="block mb-4 text-sm font-semibold text-secondary">Select Time Slot</label>
      <div className="slots-grid">
        {slots.map(time => (
          <button 
            key={time}
            type="button"
            className={`slot-btn ${selectedTime === time ? 'selected' : ''}`}
            onClick={() => onSelectTime(time)}
          >
            <Clock size={16} /> {time}
          </button>
        ))}
      </div>
    </div>
  );
}
