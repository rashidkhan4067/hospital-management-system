import api from '@/core/api';

/**
 * 🔗 Appointment Service (Architected for Clinical Precision)
 * Handles all CRUD operations for the Shifaa HMS Appointment pipeline.
 */
const appointmentService = {
    /**
     * 🛰️ Fetch Unified Appointment Registry
     * Supports multi-dimensional filtering (Status, Doctor, Range).
     */
    fetchAppointments: async (params = {}) => {
        const response = await api.get('/appointments/list/', { params });
        return response.data;
    },

    /**
     * 📅 Create Tactical Appointment
     * Features Idempotency-Key support for network resiliency.
     */
    createAppointment: async (data, idempotencyKey) => {
        const config = idempotencyKey ? { headers: { 'Idempotency-Key': idempotencyKey } } : {};
        const response = await api.post('/appointments/create/', data, config);
        return response.data;
    },

    /**
     * 🏥 Reschedule Intelligence
     * Updates only the temporal shards of the appointment.
     */
    reschedule: async (id, date, time) => {
        const response = await api.patch(`/appointments/${id}/reschedule/`, { 
            appointment_date: date, 
            start_time: time 
        });
        return response.data;
    },

    /**
     * 🛑 Tactical Cancellation
     */
    cancel: async (id, reason) => {
        const response = await api.post(`/appointments/${id}/cancel/`, { reason });
        return response.data;
    },

    /**
     * ✅ Clinical Finalization (Mark as Completed)
     */
    complete: async (id, doctorNotes) => {
        const response = await api.post(`/appointments/${id}/complete/`, { doctor_notes: doctorNotes });
        return response.data;
    }
};

export default appointmentService;
