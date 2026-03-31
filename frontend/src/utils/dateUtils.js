/**
 * @file utils/dateUtils.js
 * @description Helpers for date and time parsing/formatting.
 */

/**
 * Standardize time string for UI (HH:mm AM/PM)
 * @param {string} timeStr - Example: "14:30:00" or "09:00 AM"
 */
export const formatTimeShort = (timeStr) => {
  if (!timeStr) return '';
  // If it already has AM/PM, just return
  if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;
  
  try {
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  } catch {
    return timeStr;
  }
};

/**
 * Readable date format (Oct 15, 2027)
 */
export const formatReadableDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

/**
 * Format date for <input type="date" />
 */
export const formatDateForInput = (date = new Date()) => {
  return new Date(date).toISOString().split('T')[0];
};

/**
 * Returns "Today", "Tomorrow" or the date
 */
export const getRelativeDayLabel = (dateStr) => {
  const target = new Date(dateStr).toDateString();
  const today = new Date().toDateString();
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toDateString();
  
  if (target === today) return "Today";
  if (target === tomorrow) return "Tomorrow";
  return formatReadableDate(dateStr);
};

