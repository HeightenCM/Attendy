import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';

const ParticipantDashboard = ({ name, fetchValidCodes }) => {
  const [code, setCode] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [message, setMessage] = useState(null);
  const [validCodes, setValidCodes] = useState([]); // Stores valid codes fetched from the server

  // Fetch valid codes when the component mounts
  useEffect(() => {
    const loadValidCodes = async () => {
      const codes = await fetchValidCodes(); // Fetch valid codes (function provided as a prop)
      setValidCodes(codes);
    };
    loadValidCodes();
  }, [fetchValidCodes]);

  // Handle manual code entry
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  // Validate the entered or scanned code
  const handleConfirm = () => {
    if (validCodes.includes(code)) {
      setMessage({ text: 'Code is valid! Welcome.', type: 'success' });
    } else {
      setMessage({ text: 'Invalid code. Please try again.', type: 'error' });
    }
  };

  // Open the camera for QR scanning
  const handleOpenCamera = () => {
    setCameraActive(true);
  };

  // Close the camera
  const handleCloseCamera = () => {
    setCameraActive(false);
  };

  // Handle QR code scan success
  const handleScan = (scannedData) => {
    if (scannedData) {
      setCode(scannedData.text); // Automatically set the scanned code
      setCameraActive(false); // Close the camera
      handleConfirm(); // Validate the scanned code
    }
  };

  // Handle errors during QR scanning
  const handleError = (err) => {
    console.error('QR Code scan error:', err);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-6">
        <div className="card p-4 shadow">
          <h3 className="text-center">Welcome, participant {name}!</h3>
          <p className="mt-3">Enter the code given by the organizer:</p>
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
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
              />
              <button className="btn btn-secondary mt-2" onClick={handleCloseCamera}>
                Close Camera
              </button>
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

