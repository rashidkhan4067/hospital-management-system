/**
 * 🛰️ Administrative Export Utilities
 * Handles clinical data serialization for CSV/Excel reporting.
 */

export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // 1. Add Headers
  csvRows.push(headers.join(','));

  // 2. Add Data
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header];
      // Escape commas and wrap in quotes
      const escaped = ('' + val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  // 3. Trigger Download
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
