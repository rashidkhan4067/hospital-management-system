/**
 * 🛠️ Project-Wide Formatters
 * Pure functions for data transformation and UI-ready node presentation.
 */

/**
 * 🌀 Initials Generator
 * Transforms "User Name" into "UN". Robust to single-word nodes.
 */
export const getInitials = (name) => {
    if (!name) return '??';
    const fragments = name.trim().split(/\s+/);
    if (fragments.length === 1) return fragments[0].slice(0, 2).toUpperCase();
    return (fragments[0][0] + fragments[fragments.length - 1][0]).toUpperCase();
};

/**
 * 🕒 Time Ago Formatter
 * Humanizes raw ISO timestamps into historical relative nodes.
 */
export const timeAgo = (dateStr) => {
    if (!dateStr) return '...';
    const timestamp = new Date(dateStr).getTime();
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 172800) return 'Yesterday';
    
    return new Date(dateStr).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
};
