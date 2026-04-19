import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api, { setOnTokenRefreshed } from '@/core/api/services/apiClient';
import { 
  setAuthSession, 
  clearAuthSession, 
  getAccessToken,
  getRefreshToken,
  getStoredUser
} from '@/core/auth/authUtils';

/**
 * 🔐 Auth Command Hub (Zustand Protocol)
 * Orchestrates clinical session state and credential distribution.
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: getStoredUser(),
      token: getAccessToken(),
      refreshToken: getRefreshToken(),
      isAuthenticated: !!getAccessToken(),
      loading: true,
      error: null,

      // 💉 Session Lifecycle Handlers
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('auth/login/', credentials);
          const { user, access, refresh } = response.data;
          
          set({ user, token: access, refreshToken: refresh, isAuthenticated: true, loading: false });
          setAuthSession(access, refresh || '', user);
          return { success: true };
        } catch (err) {
          const errMsg = err.response?.data?.detail || 'Identity Handshake Aborted';
          set({ error: errMsg, loading: false });
          return { success: false, error: errMsg };
        }
      },

      logout: () => {
        set({ user: null, token: null, refreshToken: null, isAuthenticated: false, error: null });
        clearAuthSession();
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token, refreshToken) => {
          set({ token, refreshToken, isAuthenticated: !!token });
          if(token) {
              setAuthSession(token, refreshToken || '', get().user);
          } else {
              clearAuthSession();
          }
      },
      setLoading: (loading) => set({ loading })
    }),
    {
      name: 'shifaa-auth-storage',
      onRehydrateStorage: (state) => {
        // When hydration starts, keep loading true
        return (state, error) => {
          if (state) {
            state.setLoading(false);
          }
        };
      },
      partialize: (state) => ({ 
        token: state.token, 
        refreshToken: state.refreshToken, 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// 🛡️ Sync logic to catch refreshes from the API interceptor
setOnTokenRefreshed((access, refresh) => {
  if (access) {
    useAuthStore.getState().setToken(access, refresh);
  } else {
    useAuthStore.getState().logout();
  }
});
