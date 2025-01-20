// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { getEvents, postEvents, deleteEvent } from "../services/eventService";
import {
  generateCode,
  getAttendanceList,
} from "../services/participationService";
import { QRCodeSVG } from "qrcode.react";
import AttendeeList from "./AttendeeList";

// eslint-disable-next-line react/prop-types
const OrganizerDashboard = ({ name, initialEvents = [] }) => {
  const [events, setEvents] = useState(
    Array.isArray(initialEvents) ? initialEvents : []
  );
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newCode, setNewCode] = useState("");
  const [updatedEventDetails, setUpdatedEventDetails] = useState({
    name: "",
    startTime: "",
    endTime: "",
    repeat: false,
    repeatType: "daily",
    repeatCount: 1,
  });
  const [attendees, setAttendees] = useState([]);

  const determineEventStatus = (startTime, endTime) => {
    const now = new Date();
    return now >= new Date(startTime) && now <= new Date(endTime)
      ? "OPEN"
      : "CLOSED";
  };

  useEffect(() => {
    const fetchAllEvents = async () => {
      const events = await getEvents();
      setEvents(
        events.map((event) => ({
          ...event,
          status: determineEventStatus(event.startTime, event.endTime),
        }))
      );
    };
    fetchAllEvents();

    const intervalId = setInterval(() => {
      setEvents((prevEvents) =>
        prevEvents.map((event) => ({
          ...event,
          status: determineEventStatus(event.startTime, event.endTime),
        }))
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setUpdatedEventDetails({
      name: event.name,
      startTime: event.startTime || "",
      endTime: event.endTime || "",
      repeat: false,
      repeatType: "daily",
      repeatCount: 1,
    });
    setNewCode(event.code || "");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedEventDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleConfirmChanges = async () => {
    if (
      !updatedEventDetails.name ||
      !updatedEventDetails.startTime ||
      !updatedEventDetails.endTime
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const newEvents = [];
    let currentStartTime = new Date(updatedEventDetails.startTime);
    let currentEndTime = new Date(updatedEventDetails.endTime);

    for (
      let i = 0;
      i < (updatedEventDetails.repeat ? updatedEventDetails.repeatCount : 1);
      i++
    ) {
      newEvents.push({
        name: `${updatedEventDetails.name}${i > 0 ? ` (Repeat ${i})` : ""}`,
        startTime: currentStartTime.toISOString(),
        endTime: currentEndTime.toISOString(),
        status: determineEventStatus(currentStartTime, currentEndTime),
      });

      if (updatedEventDetails.repeatType === "daily") {
        currentStartTime.setDate(currentStartTime.getDate() + 1);
        currentEndTime.setDate(currentEndTime.getDate() + 1);
      } else if (updatedEventDetails.repeatType === "weekly") {
        currentStartTime.setDate(currentStartTime.getDate() + 7);
        currentEndTime.setDate(currentEndTime.getDate() + 7);
      }
    }

    const savedEvents = await postEvents(newEvents);
    setEvents(savedEvents);

    setSelectedEvent(null);
    alert("Event(s) created successfully!");
  };

  const handleGenerateCode = async (eventId) => {
    const code = await generateCode(eventId);
    console.log("New code", code);
    const auxEvents = events;
    auxEvents.find((item) => item.id === eventId).code = code;
    setEvents(auxEvents);
    setNewCode(code || "");
  };

  const handleDeleteEvent = async (eventId) => {
    await deleteEvent(eventId);
    const updatedEvents = await getEvents();
    setEvents(updatedEvents);
    setSelectedEvent(null);
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setUpdatedEventDetails({
      name: "",
      startTime: "",
      endTime: "",
      repeat: false,
      repeatType: "daily",
      repeatCount: 1,
    });
    setNewCode("");
  };

  const handleUpdateList = async (eventId) => {
    const attendees = await getAttendanceList(eventId);
    setAttendees(attendees);
  };

  const passAttendees = () => {
    console.log("attendees when passing: ",attendees);
    return attendees;
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="container">
        <h3 className="text-center mb-4">Welcome, Organizer {name}!</h3>
        <div className="row">
          <div className="col-5">
            <ul className="list-group">
              {events.map((event) => (
                <div key={event.id}>
                  <AttendeeList attendees={passAttendees()} />
                  <li
                    className={`list-group-item d-flex justify-content-between align-items-center ${
                      event.status === "OPEN"
                        ? "list-group-item-success"
                        : "list-group-item-danger"
                    }`}
                  >
                    <span
                      onClick={() => handleEventClick(event)}
                      style={{ cursor: "pointer" }}
                    >
                      {event.name}
                    </span>
                    <span
                      onClick={() => handleUpdateList(event.id)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{ cursor: "pointer" }}
                    >
                      See attendee list
                    </span>
                    <span>{event.status}</span>
                  </li>
                </div>
              ))}
            </ul>
            <button
              className="btn btn-primary mt-3 w-100"
              onClick={handleAddEvent}
            >
              Add Event
            </button>
          </div>

          <div className="col-7">
            <div className="card p-4 shadow">
              <h5>
                {selectedEvent
                  ? `Check Event: ${selectedEvent.name}`
                  : "Add New Event"}
              </h5>
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
              <div className="form-check mt-3">
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
                      className="form-select"
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
              {selectedEvent && (
                <>
                  <button
                    className="btn btn-warning mt-3 me-3"
                    onClick={() => handleGenerateCode(selectedEvent.id)}
                  >
                    Generate New Code!
                  </button>
                  <input
                    type="text"
                    className="form-control mt-3"
                    readOnly
                    value={newCode || ""}
                  />
                  {newCode && (
                    <QRCodeSVG value={newCode} size={128} className="mt-3" />
                  )}
                </>
              )}
              <div className="mt-3">
                {!selectedEvent && (
                  <button
                    className="btn btn-success me-3"
                    onClick={handleConfirmChanges}
                  >
                    Create Event
                  </button>
                )}
                <button
                  className="btn btn-secondary me-3"
                  onClick={handleAddEvent}
                >
                  Cancel
                </button>
                {selectedEvent && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                  >
                    Delete Event
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
