/**
 * 🎨 Material 3 Design Tokens (Google Standard)
 * Rebuilt for Shifaa HMS: Transitioned from legacy 'Deep Navy' project to M3 Clean Light Architecture.
 */

export const COLORS = {
  // 🛰️ Primary - Google Blue (Core Action)
  primary: {
    main: '#1a73e8', 
    light: '#e8f0fe',
    dark: '#174ea6',
    container: '#d2e3fc',
    onContainer: '#174ea6',
  },
  
  // 🌿 Secondary - Clinical Teal
  secondary: {
    main: '#00838f',
    light: '#e0f2f1',
    dark: '#005662',
    container: '#b2ebf2',
    onContainer: '#005662',
  },

  // ✅ Success - Diagnostic Green
  success: {
    main: '#1e8e3e',
    light: '#e6f4ea',
    dark: '#137333',
  },

  // ⚠️ Warning - Triage Amber
  warning: {
    main: '#f9ab00',
    light: '#fef7e0',
    dark: '#ea8600',
  },

  // 🚨 Error - Critical Red
  error: {
    main: '#d93025',
    light: '#feeced',
    dark: '#a50e0e',
  },

  // ☁️ Surfaces & Elevation (Material 3 Spec)
  background: {
    base: '#F8F9FA',      // Google Surface Neutral
    surface: '#FFFFFF',   // Card Surface
    outline: '#DADCE0',   // Border Variant
    scrim: 'rgba(32, 33, 36, 0.4)',
  },

  // 📝 Typography Neutrals
  text: {
    primary: '#202124',   // High Emphasis
    secondary: '#5f6368', // Medium Emphasis
    tertiary: '#80868b',  // Low Emphasis/Icons
  }
};

export const RADII = {
  card: '24px',
  dialog: '28px',
  input: '12px',
  button: '100px', // M3 Pill shape
};

export const SHADOWS = {
  elevation1: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
  elevation2: '0 1px 2px 0 rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15)',
};
