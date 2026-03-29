import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [role, setRole] = useState(localStorage.getItem('userRole'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would decode the JWT 
    // or fetch /users/me/ to get full user details here.
    if (token) {
      // Basic assignment based on local storage
      setUser({ role: role || 'patient', token });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token, role]);

  const login = (accessToken, userData) => {
    const userRole = userData?.role || 'patient';
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('user', JSON.stringify(userData));
    
    setToken(accessToken);
    setRole(userRole);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    setToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, role, isAuthenticated: !!token, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
