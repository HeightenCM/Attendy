// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { postEvents } from '../services/eventService';
import {QRCodeSVG} from 'qrcode.react';

// eslint-disable-next-line react/prop-types
const OrganizerDashboard = ({ name, initialEvents = [] }) => {
  const [events, setEvents] = useState(initialEvents); // State for the events displayed
  const [eventQueue, setEventQueue] = useState([]); // State for the events to be sent to the backend
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newCode, setNewCode] = useState('');
  const [updatedEventDetails, setUpdatedEventDetails] = useState({
    name: '',
    startTime: '',
    endTime: '',
    repeat: false,
    repeatType: 'daily',
    repeatCount: 1,
  });

  // Generate a random code
  const generateRandomCode = () => Math.random().toString(36).substr(2, 8).toUpperCase();

  // Handle clicking an event to edit
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setUpdatedEventDetails({
      name: event.name,
      startTime: event.startTime || '',
      endTime: event.endTime || '',
      repeat: false,
      repeatType: 'daily',
      repeatCount: 1,
    });
    setNewCode(event.code || '');
  };

  // Handle toggling event status
  const handleToggleStatus = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, status: event.status === 'OPEN' ? 'CLOSED' : 'OPEN' }
          : event
      )
    );
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedEventDetails((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Confirm changes or add new event
  const handleConfirmChanges = async () => {
    if (!updatedEventDetails.name || !updatedEventDetails.startTime || !updatedEventDetails.endTime) {
      alert('Please fill out all required fields.');
      return;
    }

    const newEvents = [];
    let currentStartTime = new Date(updatedEventDetails.startTime);
    let currentEndTime = new Date(updatedEventDetails.endTime);

    // Generate the event and its repeats if applicable
    for (let i = 0; i < (updatedEventDetails.repeat ? updatedEventDetails.repeatCount : 1); i++) {
      newEvents.push({
        name: `${updatedEventDetails.name}${i > 0 ? ` (Repeat ${i})` : ''}`,
        startTime: currentStartTime.toISOString(),
        endTime: currentEndTime.toISOString(),
        status: 'CLOSED', // Default status is CLOSED
        code: newCode || generateRandomCode(),
      });

      if (updatedEventDetails.repeatType === 'daily') {
        currentStartTime.setDate(currentStartTime.getDate() + 1);
        currentEndTime.setDate(currentEndTime.getDate() + 1);
      } else if (updatedEventDetails.repeatType === 'weekly') {
        currentStartTime.setDate(currentStartTime.getDate() + 7);
        currentEndTime.setDate(currentEndTime.getDate() + 7);
      }

      setEvents(await postEvents(newEvents));
    }

    // Update state for displayed events and the event queue
    // setEvents((prevEvents) => {
    //   const updatedList = selectedEvent
    //     ? prevEvents.map((event) =>
    //         event.id === selectedEvent.id ? { ...newEvents[0] } : event
    //       )
    //     : [...prevEvents, ...newEvents];
    //   return updatedList;
    // });

    setEventQueue((prevQueue) => [...prevQueue, ...newEvents]); // Add new/updated events to the queue

    setSelectedEvent(null);
    alert('Event details updated successfully!');
  };

  // Cancel editing or adding an event
  const handleCancelEdit = () => {
    setSelectedEvent(null);
    setUpdatedEventDetails({
      name: '',
      startTime: '',
      endTime: '',
      repeat: false,
      repeatType: 'daily',
      repeatCount: 1,
    });
    setNewCode('');
  };

  // Start creating a new event
  const handleAddEvent = () => {
    setSelectedEvent(null);
    setUpdatedEventDetails({
      name: '',
      startTime: '',
      endTime: '',
      repeat: false,
      repeatType: 'daily',
      repeatCount: 1,
    });
    setNewCode('');
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="container">
        <h3 className="text-center mb-4">Welcome, Organizer {name}!</h3>
        <div className="row">
          {/* Left: Event List */}
          <div className="col-5">
            <ul className="list-group">
              {events.map((event) => (
                <li
                  key={event.id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    event.status === 'OPEN' ? 'list-group-item-success' : 'list-group-item-danger'
                  }`}
                >
                  <span onClick={() => handleEventClick(event)} style={{ cursor: 'pointer' }}>
                    {event.name}
                  </span>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleToggleStatus(event.id)}
                  >
                    {event.status === 'OPEN' ? 'Set CLOSED' : 'Set OPEN'}
                  </button>
                </li>
              ))}
            </ul>
            <button className="btn btn-primary mt-3 w-100" onClick={handleAddEvent}>
              Add Event
            </button>
          </div>

          {/* Right: Event Details */}
          <div className="col-7">
            <div className="card p-4 shadow">
              <h5>{selectedEvent ? `Edit Event: ${selectedEvent.name}` : 'Add New Event'}</h5>
              <div className="form-group">
                <label>Event Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={updatedEventDetails.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Start Time:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="startTime"
                  value={updatedEventDetails.startTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>End Time:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="endTime"
                  value={updatedEventDetails.endTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group form-check mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="repeat"
                  checked={updatedEventDetails.repeat}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Repeat Event</label>
              </div>
              {updatedEventDetails.repeat && (
                <>
                  <div className="form-group mt-3">
                    <label>Repeat Type:</label>
                    <select
                      className="form-control"
                      name="repeatType"
                      value={updatedEventDetails.repeatType}
                      onChange={handleInputChange}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                  <div className="form-group mt-3">
                    <label>Repeat Count:</label>
                    <input
                      type="number"
                      className="form-control"
                      name="repeatCount"
                      value={updatedEventDetails.repeatCount}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>
                </>
              )}
              <div className="d-flex align-items-center mt-3">
                <button
                  className="btn btn-warning me-3"
                  onClick={() => setNewCode(generateRandomCode())}
                >
                  Generate New Code!
                </button>
                <input type="text" className="form-control" readOnly value={newCode} />
              </div>
              <div className="mt-3">
                <button className="btn btn-info me-3" onClick={() => {}}>
                  Generate QR Code!
                </button>
                {newCode && <QRCodeSVG value={newCode} size={128} />}
              </div>
              <div className="mt-3">
                <button className="btn btn-success me-3" onClick={handleConfirmChanges}>
                  Confirm
                </button>
                <button className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
