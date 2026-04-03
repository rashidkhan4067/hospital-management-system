/**
 * @file constants/theme.js
 * @description Design tokens for the Al Shifaa Clinic UI.
 */

export const COLORS = {
  // Primary - Vibrant & Trustworthy
  primary: {
    main: '#6366f1', // Indigo
    light: '#818cf8',
    dark: '#4f46e5',
    glow: 'rgba(99, 102, 241, 0.4)',
  },
  
  // Secondary - Modern & Calm
  secondary: {
    main: '#0ea5e9', // Sky Blue
    light: '#38bdf8',
    dark: '#0284c7',
    glow: 'rgba(14, 165, 233, 0.4)',
  },

  // Success - Healthy & Positive
  success: {
    main: '#10b981', // Emerald
    light: '#34d399',
    dark: '#059669',
    glow: 'rgba(16, 185, 129, 0.4)',
  },

  // Warning - Attention Required
  warning: {
    main: '#f59e0b', // Amber
    light: '#fbbf24',
    dark: '#d97706',
    glow: 'rgba(245, 158, 11, 0.4)',
  },

  // Error - Critical
  error: {
    main: '#ef4444', // Red
    light: '#f87171',
    dark: '#dc2626',
    glow: 'rgba(239, 68, 68, 0.4)',
  },

  // Surfaces & Backgrounds
  background: {
    base: '#0f172a',    // Deep Navy
    surface: 'rgba(30, 41, 59, 0.6)', // Glassy surface
    card: 'rgba(15, 23, 42, 0.8)',
  }
};

export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
  secondary: 'linear-gradient(135deg, #0ea5e9 0%, #2dd4bf 100%)',
  surface: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  text: 'linear-gradient(to right, #ffffff, #94a3b8)',
};

export const GLASS = {
  panel: 'backdrop-filter: blur(12px) saturate(180%); background-color: rgba(17, 25, 40, 0.75); border: 1px solid rgba(255, 255, 255, 0.125);',
  card: 'backdrop-filter: blur(16px); background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06);',
};

export const ANIMATIONS = {
  enter: 'animate-enter',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  spin: 'va-spin', // custom spin from index.css
};
