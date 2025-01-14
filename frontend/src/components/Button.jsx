// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const Button = ({ type, label, onClick, disabled }) => {
  return (
    <button type={type} className="btn btn-primary w-100" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
