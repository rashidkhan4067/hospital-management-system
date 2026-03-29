/**
 * Utility functions for date and time formatting
 */

/**
 * Formats a time string (HH:mm:ss) to HH:mm
 */
export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  return timeStr.substring(0, 5);
};

/**
 * Formats a date string to a more readable format
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  } catch (e) {
    return dateStr;
  }
};
