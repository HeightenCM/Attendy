import React, { useState } from 'react';

const ParticipantDashboard = ({ name }) => {
  const [code, setCode] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [message, setMessage] = useState(null);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleConfirm = () => {
    // Replace with actual validation logic
    if (code === 'VALID_CODE') {
      setMessage({ text: 'All done!', type: 'success' });
    } else {
      setMessage({ text: 'Code entered wrong.', type: 'error' });
    }
  };

  const handleOpenCamera = () => {
    setCameraActive(true);
    // Implement camera logic, e.g., using a library like `react-webcam`
  };

  const handleCloseCamera = () => {
    setCameraActive(false);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-6">
        <div className="card p-4 shadow">
          <h3 className="text-center">Welcome, participant {name}!</h3>
          <p className="mt-3">Introduce the code given in class:</p>
          <input
            type="text"
            className="form-control mb-3"
            value={code}
            onChange={handleCodeChange}
            placeholder="Enter the code"
          />
          <p>Or scan the QR Code:</p>
          {!cameraActive && (
            <button className="btn btn-primary mb-3" onClick={handleOpenCamera}>
              Open Camera
            </button>
          )}
          {cameraActive && (
            <div className="camera-container mb-3">
              {/* Replace with an actual webcam component */}
              <div style={{ border: '2px solid #ccc', padding: '10px', textAlign: 'center' }}>
                <p>Camera feed (implement webcam here)</p>
                <button className="btn btn-secondary mt-2" onClick={handleCloseCamera}>
                  Close Camera
                </button>
              </div>
            </div>
          )}
          <button className="btn btn-success" onClick={handleConfirm}>
            Confirm
          </button>
          {message && (
            <div
              className={`alert mt-3 ${
                message.type === 'success' ? 'alert-success' : 'alert-danger'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantDashboard;
