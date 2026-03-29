import api from './apiClient';

export const bookAppointment = async (appointmentData) => {
  const response = await api.post('appointments/', appointmentData);
  return response.data;
};

export const getMyAppointments = async () => {
  const response = await api.get('appointments/me/');
  return response.data;
};

export const cancelAppointment = async (id) => {
  // Using a DELETE request or a POST/PATCH depending on backend implementation
  const response = await api.delete(`appointments/${id}/`);
  return response.data;
};
