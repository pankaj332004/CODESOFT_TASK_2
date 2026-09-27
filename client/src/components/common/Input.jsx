import React from 'react';

export const Input = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  icon = null,
  helperText,
  required = false,
  className = '',
  as = 'input',
  children,
  rows = 3,
  ...props
}) => {
  const Component = as;

  return (
    <div className={`qm-input-group ${error ? 'has-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className="qm-label">
          {label} {required && <span className="req-asterisk">*</span>}
        </label>
      )}

      <div className="qm-input-wrapper">
        {icon && <span className="input-affix-icon">{icon}</span>}
        
        {as === 'select' ? (
          <select
            id={id}
            value={value}
            onChange={onChange}
            className={`qm-input-field qm-select ${icon ? 'with-icon' : ''}`}
            {...props}
          >
            {children}
          </select>
        ) : as === 'textarea' ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`qm-input-field qm-textarea ${icon ? 'with-icon' : ''}`}
            {...props}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`qm-input-field ${icon ? 'with-icon' : ''}`}
            {...props}
          />
        )}
      </div>

      {error ? (
        <p className="qm-input-error">{error}</p>
      ) : helperText ? (
        <p className="qm-input-helper">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
