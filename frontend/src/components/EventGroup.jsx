import React, { useState } from "react";
import EventHolder from "./EventHolder";
import Event from "../models/event";
import { postEvent } from "../services/eventService";

const EventGroup = ({ groupName, eventsGiven, onEventSave, onEventDelete }) => {
  const [events, setEventsArray] = useState(eventsGiven);

  const addEvent = async () => {
    const newEvent = new Event("Event", "", "", false, "daily", 1, groupName);
    const savedEvent = await postEvent(newEvent);
    setEventsArray([...events, savedEvent]);
  };

  const handleEventSave = async (updatedEvent, index) => {
    const savedEvent = await onEventSave(updatedEvent);
    const newEvents = [...events];
    newEvents[index] = savedEvent;
    setEventsArray(newEvents);
  };

  const handleEventDelete = async (eventToDelete, index) => {
    await onEventDelete(eventToDelete);
    const newEvents = events.filter((_, i) => i !== index);
    setEventsArray(newEvents);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-primary mb-3" onClick={addEvent}>
          Add Event
        </button>
      </div>
      <ul className="list-group">
        {events.map((event, index) => (
          <EventHolder
            key={`${groupName}-${index}`}
            event={event}
            groupName={groupName}
            eventIndex={index}
            onEventSave={handleEventSave}
            onEventDelete={handleEventDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default EventGroup;
