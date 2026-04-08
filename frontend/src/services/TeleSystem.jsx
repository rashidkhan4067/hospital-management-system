import React, { useEffect } from 'react';
import { useUI } from '@/core/ui/UIContext';
import api from './apiClient';

/**
 * 📡 Global Intelligence Telemetry Shard
 * Attaches the API client to the UI Context to synchronize global loading and error states.
 */
export default function TeleSystem({ children }) {
  const { setGlobalLoading, setGlobalError } = useUI();

  useEffect(() => {
    let requestCount = 0;

    const requestInterceptor = api.interceptors.request.use((config) => {
      requestCount++;
      setGlobalLoading(true);
      return config;
    }, (error) => {
      requestCount--;
      if (requestCount <= 0) setGlobalLoading(false);
      return Promise.reject(error);
    });

    const responseInterceptor = api.interceptors.response.use((response) => {
      requestCount--;
      if (requestCount <= 0) setGlobalLoading(false);
      setGlobalError(null);
      return response;
    }, (error) => {
      requestCount--;
      if (requestCount <= 0) setGlobalLoading(false);
      
      // Filter out auth refresh errors to prevent flicker
      if (error.response?.status !== 401) {
        setGlobalError(error.response?.data?.message || error.message || 'Clinical Connection Error');
      }
      
      return Promise.reject(error);
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [setGlobalLoading, setGlobalError]);

  return <>{children}</>;
}
