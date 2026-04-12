import api from '@/core/api/services/apiClient';

/**
 * 🛌 Patient Clinical Service
 * Manages patient-specific clinical identity and medical profile shards.
 */
export const completeOnboarding = async (profileData) => {
    // 🧪 Mapping Frontend M3 Schema to Backend clinical shards
    const payload = {
        fullName: profileData.fullName,
        email: profileData.email,
        phone: `${profileData.countryCode}${profileData.phone}`,
        date_of_birth: profileData.dob,
        gender: profileData.gender,
        allergies: profileData.allergies,
        medical_history: profileData.chronicConditions, // Chronic conditions mapped to history
        emergency_contact_name: profileData.emergencyName,
        emergency_contact_phone: profileData.emergencyPhone,
        address: profileData.address,
        // Institutional constraints
        current_medications: profileData.currentMedications, 
    };

    const response = await api.post('patients/profiles/complete-onboarding/', payload);
    return response.data;
};

export const getMyProfile = async () => {
    const response = await api.get('patients/profiles/me/'); // Assuming a 'me' endpoint or handle in view
    return response.data;
};
