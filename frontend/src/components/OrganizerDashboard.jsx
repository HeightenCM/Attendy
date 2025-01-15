import React, { useState } from 'react';


const OrganizerDashboard = ({ name, initialEvents = [] }) => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newCode, setNewCode] = useState('');
  const [updatedEventDetails, setUpdatedEventDetails] = useState({
    startTime: '',
    endTime: '',
  });

  // Helper to generate a random code
  const generateRandomCode = () => {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  // Handle selecting an event from the list
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setUpdatedEventDetails({
      startTime: event.startTime,
      endTime: event.endTime,
    });
  };

  // Handle input changes for the event details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle confirming changes
  const handleConfirmChanges = () => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? { ...event, ...updatedEventDetails, code: newCode || event.code }
            : event
        )
      );
      alert('Event details updated successfully!');
      setSelectedEvent(null);
    }
  };

  // Handle adding a new event
  const handleAddEvent = () => {
    const newEvent = {
      id: events.length + 1,
      name: `New Event ${events.length + 1}`,
      startTime: '',
      endTime: '',
      status: 'CLOSED',
      code: '',
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div className="container d-flex flex-column min-vh-100">
      <h3 className="text-center">Welcome, Organizer {name}!</h3>
      <div className="row mt-4">
        {/* Left: Event List */}
        <div className="col-4">
          <ul className="list-group">
            {events.map((event) => (
              <li
                key={event.id}
                className={`list-group-item ${
                  event.status === 'OPEN' ? 'list-group-item-success' : 'list-group-item-danger'
                }`}
                onClick={() => handleEventClick(event)}
                style={{ cursor: 'pointer' }}
              >
                {event.name}
              </li>
            ))}
          </ul>
          <button className="btn btn-primary mt-3" onClick={handleAddEvent}>
            Add Event
          </button>
        </div>

        {/* Right: Event Details */}
        <div className="col-8">
          {selectedEvent ? (
            <div className="card p-4 shadow">
              <h5>Edit Event: {selectedEvent.name}</h5>
              <div className="form-group">
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
              <div className="d-flex align-items-center mt-3">
                <button
                  className="btn btn-warning me-3"
                  onClick={() => setNewCode(generateRandomCode())}
                >
                  Generate New Code!
                </button>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={newCode || selectedEvent.code}
                />
              </div>
              <button
                className="btn btn-success mt-3"
                onClick={handleConfirmChanges}
              >
                Confirm
              </button>
            </div>
          ) : (
            <p className="text-muted">Select an event to edit its details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
