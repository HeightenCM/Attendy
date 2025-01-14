import React from 'react';

const Button = ({ type, label, onClick, disabled }) => {
  return (
    <button
      type={type}
      className="btn btn-primary w-100"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
