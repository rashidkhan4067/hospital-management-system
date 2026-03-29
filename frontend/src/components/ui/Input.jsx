import React from 'react';

/**
 * Common Input component with glassmorphic style and icon support
 */
export const Input = ({ 
  label, 
  icon: Icon, 
  error, 
  id, 
  className = '', 
  wrapperClassName = '',
  ...props 
}) => {
  return (
    <div className={`input-container ${wrapperClassName}`.trim()}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="input-wrapper">
        {Icon && <Icon className="input-icon" size={20} />}
        <input 
          id={id}
          className={`input-glass ${Icon ? 'with-icon' : ''} ${className}`.trim()} 
          {...props} 
        />
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Input;
