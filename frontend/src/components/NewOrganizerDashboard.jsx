import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import EventGroup from "./EventGroup";
import {
  getEvents,
  postEvent,
  deleteEvent,
  updateEvent,
} from "../services/eventService";
import { getName } from "../services/authService";
import Event from "../models/event";
import { use } from "react";

const NewOrganizerDashboard = ({ name }) => {
  const [eventGroups, setEventGroups] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    queryEvents();
    getUsername();
  }, []);

  const addGroup = () => {
    const newGroup = `Group ${eventGroups.length + 1}`;
    setEventGroups([...eventGroups, { groupName: newGroup, events: [] }]);
  };

  const queryEvents = async () => {
    const events = await getEvents();
    const groupedEvents = groupEventsByGroup(events);
    setEventGroups(groupedEvents);
  };

  const getUsername = async () => {
    const name = await getName();
    setUsername(name);
  };

  const groupEventsByGroup = (events) => {
    const groups = {};
    events.forEach((event) => {
      if (!groups[event.group]) {
        groups[event.group] = [];
      }
      groups[event.group].push(event);
    });
    return Object.keys(groups).map((groupName) => ({
      groupName,
      events: groups[groupName],
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="container">
        <h3 className="text-center mb-4">Welcome, Organizer {username}!</h3>
        <div className="row"></div>
        <div className="col-5">
          <div className="container mt-4">
            <button className="btn btn-primary mb-4" onClick={addGroup}>
              Add Event Group
            </button>
            <div className="accordion" id="accordionGroups">
              {eventGroups.map((group, groupIndex) => (
                <div key={group.groupName} className="accordion-item">
                  <h2 className="accordion-header" id={`heading-${groupIndex}`}>
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${groupIndex}`}
                      aria-expanded="true"
                      aria-controls={`collapse-${groupIndex}`}
                    >
                      {group.groupName}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${groupIndex}`}
                    className="accordion-collapse collapse show"
                    aria-labelledby={`heading-${groupIndex}`}
                    data-bs-parent="#accordionGroups"
                  >
                    <div className="accordion-body">
                      <EventGroup
                        groupIndex={group.groupName}
                        eventsGiven={group.events}
                        onEventSave={updateEvent}
                        onEventDelete={deleteEvent}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrganizerDashboard;
