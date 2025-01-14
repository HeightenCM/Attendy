import React from 'react';

const Notification = ({ message, type }) => {
  return (
    <div className={`alert alert-${type} mt-3`} role="alert">
      {message}
    </div>
  );
};

export default Notification;
