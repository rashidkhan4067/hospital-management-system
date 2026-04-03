/**
 * 📊 Data Export Tools
 * Simple tools to export data to CSV for Excel.
 */
export const exportToCSV = (data, fileName = 'Hospital_Report', columns = []) => {
    if (!data || !data.length) return false;

    const headers = columns.length ? columns : Object.keys(data[0]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + headers.join(",") + "\n"
      + data.map(row => {
          return headers.map(header => {
              const val = row[header] ?? '';
              return `"${val.toString().replace(/"/g, '""')}"`;
          }).join(",");
      }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
};
