import React from 'react';

const PageLoader = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      background: 'var(--bg-primary, #ffffff)',
      color: 'var(--primary-600, #2563eb)'
    }}>
      <div className="loader">
        {/* Simple spinner using CSS */}
        <style>
          {`
            .loader {
              border: 4px solid #f3f3f3;
              border-top: 4px solid #2563eb;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default PageLoader;
