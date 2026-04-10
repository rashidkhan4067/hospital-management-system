import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

/**
 * 🔐 Auth Command Hub (Zustand Protocol)
 * Orchestrates clinical session state and credential distribution.
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: localStorage.getItem('shifaa_key'),
      isAuthenticated: !!localStorage.getItem('shifaa_key'),
      loading: false,
      error: null,

      // 💉 Session Lifecycle Handlers
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          // Placeholder for real backend clinical sync
          // const res = await axios.post('/api/v1/auth/login', credentials);
          // const { user, access } = res.data;
          
          // Simulation Node
          const user = { id: 1, name: 'Director Rashid', role: 'admin', initials: 'DR' };
          const access = 'shifaa-prod-telemetry-token-' + Date.now();

          set({ user, token: access, isAuthenticated: true, loading: false });
          localStorage.setItem('shifaa_key', access);
          return { success: true };
        } catch (err) {
          const errMsg = err.response?.data?.detail || 'Handshake Terminal Abort';
          set({ error: errMsg, loading: false });
          return { success: false, error: errMsg };
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, error: null });
        localStorage.removeItem('shifaa_key');
        // Optional: window.location.href = '/login';
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => {
          set({ token, isAuthenticated: !!token });
          if(token) localStorage.setItem('shifaa_key', token);
          else localStorage.removeItem('shifaa_key');
      }
    }),
    {
      name: 'shifaa-auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
