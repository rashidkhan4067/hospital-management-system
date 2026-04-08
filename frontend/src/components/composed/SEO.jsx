import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Advanced SEO Component
 * Dynamically updates document head based on current route/page
 */
const SEO = ({ 
  title, 
  description, 
  keywords = "hospital management, Al Shifaa, health tech", 
  image = "/og-image.png",
  type = "website" 
}) => {
  const location = useLocation();
  const baseUrl = window.location.origin;
  const url = `${baseUrl}${location.pathname}`;
  const displayTitle = `${title} | Al Shifaa Hospital`;

  React.useEffect(() => {
    // Update Title
    document.title = displayTitle;

    // Update Meta Tags
    const updateMeta = (name, content, attr = 'name') => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) updateMeta('description', description);
    updateMeta('keywords', keywords);
    
    // Open Graph
    updateMeta('og:title', displayTitle, 'property');
    if (description) updateMeta('og:description', description, 'property');
    updateMeta('og:type', type, 'property');
    updateMeta('og:url', url, 'property');
    updateMeta('og:image', image, 'property');

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', displayTitle);
    if (description) updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

  }, [displayTitle, description, keywords, image, type, url]);

  return null; // Side-effect component
};

export default SEO;
