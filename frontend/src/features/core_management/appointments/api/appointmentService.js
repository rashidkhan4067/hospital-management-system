/**
 * 🛰️ Appointment API Service (Senior Architect Spec)
 * Handles high-density clinical telemetry and administrative scheduling.
 */

const TODAY = '2026-04-10';
const TOMORROW = '2026-04-11';

// 🧪 Enhanced Clinical Data (Simulating Global Registry)
let MOCK_APPOINTMENTS = [
  { id: '1001', hospitalId: 'H-921', patient: 'Sarah Malik', doctor: 'Dr. Sarah Ahmed', time: '09:00 AM', date: TODAY, department: 'Cardiology', status: 'Confirmed', type: 'Consultation', history: ['Initial Checkup Feb-26', 'ECG Normal Mar-26'], payment_status: 'fully_paid' },
  { id: '1002', hospitalId: 'H-922', patient: 'Michael J.', doctor: 'Dr. John Carter', time: '10:30 AM', date: TODAY, department: 'Surgery', status: 'Pending', type: 'Surgical Follow-up', history: ['Knee Surgery Nov-25'], payment_status: 'unpaid' },
  { id: '1003', hospitalId: 'H-923', patient: 'Emma Watson', doctor: 'Dr. Elena Vance', time: '11:15 AM', date: TODAY, department: 'Pediatrics', status: 'Waiting', type: 'General Checkup', history: ['Vaccination Dec-25'], payment_status: 'fully_paid' },
  { id: '1004', hospitalId: 'H-924', patient: 'David Miller', doctor: 'Dr. Usman Raza', time: '01:00 PM', date: TODAY, department: 'Radiology', status: 'Completed', type: 'MRI Scan', history: [], payment_status: 'fully_paid' },
  { id: '1005', hospitalId: 'H-925', patient: 'Alice Wong', doctor: 'Dr. Sarah Ahmed', time: '02:30 PM', date: TODAY, department: 'Cardiology', status: 'Pending', type: 'ECG Review', history: ['Referred from ER'], payment_status: 'unpaid' },
  { id: '1006', hospitalId: 'H-926', patient: 'Robert Fox', doctor: 'Dr. John Carter', time: '04:00 PM', date: TODAY, department: 'Surgery', status: 'Confirmed', type: 'Post-Op', payment_status: 'fully_paid' },
  { id: '1007', hospitalId: 'H-927', patient: 'Zara Khan', doctor: 'Dr. Sarah Ahmed', time: '11:00 AM', date: TOMORROW, department: 'Cardiology', status: 'Confirmed', type: 'Checkup', payment_status: 'fully_paid' },
  { id: '1008', hospitalId: 'H-928', patient: 'Omar Malik', doctor: 'Dr. Usman Raza', time: '03:00 PM', date: TOMORROW, department: 'Radiology', status: 'Pending', type: 'X-Ray', payment_status: 'unpaid' },
];

const DOCTOR_SLOTS = {
  'Dr. Sarah Ahmed': ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
  'Dr. John Carter': ['09:30 AM', '10:30 AM', '01:00 PM', '04:00 PM'],
  'Dr. Elena Vance': ['11:15 AM', '12:15 PM', '03:15 PM'],
  'Dr. Usman Raza': ['01:00 PM', '02:00 PM', '03:00 PM'],
};

// 🧠 Utility to check if a filter represents "Global/All"
const isAll = (val) => {
    if (!val) return true;
    const v = val.toLowerCase();
    return v === 'all' || v === 'all departments' || v === 'all doctors';
};

export const appointmentService = {
  fetchAppointments: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filtered = [...MOCK_APPOINTMENTS];
    
    // 🏢 Unit Normalization
    if (!isAll(filters.unit)) {
      filtered = filtered.filter(a => a.department.toLowerCase() === filters.unit.toLowerCase());
    }

    // 👨‍⚕️ Practitioner Normalization
    if (!isAll(filters.doctor)) {
      filtered = filtered.filter(a => a.doctor.toLowerCase() === filters.doctor.toLowerCase());
    }

    // 🚦 Triage Status Normalization
    if (!isAll(filters.status)) {
      filtered = filtered.filter(a => a.status.toLowerCase() === filters.status.toLowerCase());
    }

    // 📅 Temporal Normalization
    if (!isAll(filters.range)) {
        if (filters.range === 'Today') {
            filtered = filtered.filter(a => a.date === TODAY);
        }
    }

    if (filters.query) {
      const q = filters.query.toLowerCase();
      filtered = filtered.filter(a => 
        a.patient.toLowerCase().includes(q) || 
        a.id.toLowerCase().includes(q)
      );
    }
    
    return filtered;
  },

  fetchAvailableSlots: async (doctor, date) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const baseline = DOCTOR_SLOTS[doctor] || [];
    const booked = MOCK_APPOINTMENTS
      .filter(a => a.doctor === doctor && a.date === date)
      .map(a => a.time);
    return baseline.filter(slot => !booked.includes(slot));
  },

  createAppointment: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newRecord = {
      ...data,
      id: `${1006 + MOCK_APPOINTMENTS.length + 1}`,
      status: data.status || 'Confirmed'
    };
    MOCK_APPOINTMENTS.unshift(newRecord);
    return newRecord;
  },

  rescheduleAppointment: async (id, newDate, newTime) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    MOCK_APPOINTMENTS = MOCK_APPOINTMENTS.map(a => 
      a.id === id ? { ...a, date: newDate, time: newTime } : a
    );
    return { success: true };
  },

  cancelAppointment: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    MOCK_APPOINTMENTS = MOCK_APPOINTMENTS.filter(a => a.id !== id);
    return { success: true };
  }
};
