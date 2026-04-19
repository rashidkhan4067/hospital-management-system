import { useState, useEffect } from 'react';

/**
 * 🛰️ useBreakpoint (MD3 Viewport Telemetry)
 * Detects current viewport node for responsive layout orchestration.
 */
export const useBreakpoint = (width = 1024) => {
  const [isAbove, setIsAbove] = useState(window.innerWidth >= width);

  useEffect(() => {
    const handler = () => setIsAbove(window.innerWidth >= width);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [width]);

  return isAbove;
};
