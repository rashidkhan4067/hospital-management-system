import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const ACCENT_COLORS = [
  { name: 'Apple Blue', value: '#007aff' },
  { name: 'Hospital Indigo', value: '#5e5ce6' },
  { name: 'Clinical Emerald', value: '#34c759' },
  { name: 'Alert Amber', value: '#ff9500' },
  { name: 'Surgical Rose', value: '#ff2d55' },
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('medi-theme') || THEMES.LIGHT);
  const [accentColor, setAccentColor] = useState(localStorage.getItem('medi-accent') || ACCENT_COLORS[0].value);

  useEffect(() => {
    // 🌑 Apply Dark Mode Class
    const root = window.document.documentElement;
    if (theme === THEMES.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('medi-theme', theme);
  }, [theme]);

  useEffect(() => {
    // 🎨 Apply Accent Color Variable
    const root = window.document.documentElement;
    root.style.setProperty('--color-accent-primary', accentColor);
    localStorage.setItem('medi-accent', accentColor);
  }, [accentColor]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  }, []);

  const changeAccent = useCallback((color) => {
    setAccentColor(color);
  }, []);

  const themeValue = useMemo(() => ({ 
    theme, 
    toggleTheme, 
    accentColor, 
    changeAccent 
  }), [theme, toggleTheme, accentColor, changeAccent]);

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
