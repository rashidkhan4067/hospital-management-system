import React from 'react';

/**
 * Common PageHeader component with breadcrumbs or subtitle
 */
export const PageHeader = ({ title, subtitle, badge: BadgeComponent, className = '' }) => {
  return (
    <header className={`page-header animate-enter ${className}`.trim()}>
      {BadgeComponent && <div className="mb-4">{BadgeComponent}</div>}
      <h1 className="text-gradient">{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </header>
  );
};

export default PageHeader;
