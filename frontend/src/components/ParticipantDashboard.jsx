import React from 'react';

const ParticipantDashboard = ({ label, type, name, value, onChange, required }) => {
    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">{label}</label>
        <input
          type={type}
          className="form-control"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    );
  };


export default ParticipantDashboard;