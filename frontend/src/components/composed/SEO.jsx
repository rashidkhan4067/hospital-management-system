import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description }) {
  return (
    <Helmet>
      <title>{title ? `${title} | Shifaa HMS` : 'Shifaa Hospital Management System'}</title>
      <meta name="description" content={description || 'Enterprise-grade clinical command center and management system.'} />
    </Helmet>
  );
}
