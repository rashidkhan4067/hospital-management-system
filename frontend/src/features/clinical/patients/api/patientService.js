/**
 * 🛰️ Patient EMR API Service
 * Advanced Electronic Medical Record (EMR) telemetry and clinical history.
 */

// 🧪 Simulated EMR Registry (Google Health Standard)
const MOCK_PATIENTS = [
  { 
    id: 'P-1001', 
    name: 'Sarah Jenkins', 
    age: 34, 
    gender: 'Female', 
    bloodType: 'O+',
    chronic: true,
    status: 'In-Patient',
    vitals: { bp: '142/95', hr: 88, spo2: 94, temp: 37.2 },
    lastVisit: '2026-04-05',
    timeline: [
      { id: 'ev-1', type: 'Consultation', title: 'Cardiac Review', date: '2026-04-05', provider: 'Dr. Sarah Ahmed', notes: 'Patient complaints of shortness of breath. Prescribed Beta Blockers.' },
      { id: 'ev-2', type: 'Lab Report', title: 'Full Blood Count', date: '2026-03-28', provider: 'Main Lab', result: 'Normal hemoglobin levels detected.' },
      { id: 'ev-3', type: 'Surgical', title: 'Appendectomy', date: '2025-11-12', provider: 'Surgery Dept', notes: 'Recovery successful, no post-op complications.' },
    ]
  },
  { 
    id: 'P-1002', 
    name: 'Michael Chen', 
    age: 42, 
    gender: 'Male', 
    chronic: false,
    status: 'Out-Patient',
    vitals: { bp: '120/80', hr: 72, spo2: 98, temp: 36.6 },
    lastVisit: '2026-03-12',
    timeline: [
        { id: 'ev-4', type: 'Consultation', title: 'General Checkup', date: '2026-03-12', provider: 'Dr. John Carter', notes: 'Routine physical examination.' },
    ]
  },
  { 
    id: 'P-1003', 
    name: 'Emma Watson', 
    age: 28, 
    gender: 'Female', 
    chronic: false,
    status: 'In-Patient',
    vitals: { bp: '110/70', hr: 65, spo2: 99, temp: 36.8 },
    lastVisit: '2026-04-08',
    timeline: [
        { id: 'ev-5', type: 'Surgical', title: 'Knee Reconstruction', date: '2026-04-08', provider: 'Surgery Dept', notes: 'In recovery ward.' },
    ]
  }
];

export const patientService = {
  /**
   * 📡 Fetch clinical master list
   */
  fetchPatients: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    let filtered = [...MOCK_PATIENTS];
    
    if (filters.status && filters.status !== 'All') {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
    }
    
    return filtered;
  },

  /**
   * 📬 Fetch detailed clinical profile
   */
  getPatientById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return MOCK_PATIENTS.find(p => p.id === id);
  }
};
