/**
 * 📅 Appointment Domain Helpers
 * Isolated logic specifically for the Appointments feature.
 */

export const formatAppointmentTime = (date, time) => {
    if (!date || !time) return 'Pending Sync';
    return `${date} • ${time}`;
};

export const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'scheduled': return 'emerald';
        case 'pending':   return 'amber';
        case 'cancelled': return 'rose';
        default:          return 'slate';
    }
};
