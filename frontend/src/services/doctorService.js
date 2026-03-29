import api from './apiClient';

export const getDoctors = async (params) => {
  // params can be used for search, filtering by specialty, etc.
  const response = await api.get('doctors/', { params });
  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await api.get(`doctors/${id}/`);
  return response.data;
};

export const getSlots = async (doctorId, date) => {
  const response = await api.get(`doctors/${doctorId}/slots/`, {
    params: { date }
  });
  return response.data;
};
