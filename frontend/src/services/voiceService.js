import api from './apiClient';

export const processVoice = async (audioBlob, email) => {
  const formData = new FormData();
  // Ensure the extension aligns with what MediaRecorder outputs (usually webm on modern browsers)
  formData.append('audio', audioBlob, 'recording.webm');
  if (email) {
    formData.append('email', email);
  }

  // Use the standard configured API client
  const response = await api.post('voice/pipeline/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};
