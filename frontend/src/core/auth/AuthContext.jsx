import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  setAuthSession, 
  clearAuthSession, 
  getAccessToken, 
  getStoredUser 
} from '@/core/auth/authUtils';

import { ROLES } from '@/core/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    const storedUser = getStoredUser();
    
    if (token && storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
      clearAuthSession();
    }
    setLoading(false);
  }, []);

  const login = (accessToken, refreshToken, userData) => {
    setAuthSession(accessToken, refreshToken, userData);
    setUser(userData);
  };

  const logout = () => {
    clearAuthSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      role: user?.role || ROLES.PATIENT, 
      isAuthenticated: !!user, 
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

