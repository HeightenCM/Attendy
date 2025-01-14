// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const Notification = ({ message, type }) => {
  return (
    <div className={`alert alert-${type} mt-3`} role="alert">
      {message}
    </div>
  );
};

export default Notification;
