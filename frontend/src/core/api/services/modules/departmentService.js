import analyticsService from '@/features/core_management/analytics/api/analyticsService';

/**
 * 🏢 Department Operations Service
 * Handles telemetry for section distribution and node occupancy.
 */
class DepartmentService {
    /**
     * Fetches real-time load distribution across clinical departments.
     * @returns {Promise<Array>} List of department load nodes.
     */
    async getDepartmentStats() {
        try {
            const pulse = await analyticsService.getGlobalPulse();
            return pulse.departments || [];
        } catch (err) {
            console.error('🏢 Department Matrix: Offline Protocol Engaged', err);
            // 🛡️ Fallback: Generate simulation data if the registry is restricted
            return [
                { id: "card", name: "CARDIOLOGY", load: 82, color: "#0ea5e9" },
                { id: "ped", name: "PEDIATRICS", load: 45, color: "#10b981" },
                { id: "ortho", name: "ORTHOPEDICS", load: 68, color: "#f59e0b" },
                { id: "neuro", name: "NEUROLOGY", load: 91, color: "#ef4444" }
            ].map(d => ({ ...d, is_simulated: true }));
        }
    }
}

export default new DepartmentService();


