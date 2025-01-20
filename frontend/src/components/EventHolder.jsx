import React, { useState, useEffect } from "react";
import Event from "../models/event";
import EventForm from "./EventForm";

const EventHolder = ({
  event,
  groupName,
  eventIndex,
  onEventSave,
  onEventDelete,
}) => {
  const [currentEvent, setCurrentEvent] = useState(event);

  useEffect(() => {
    setCurrentEvent(event);
  }, [event]);

  const handleSave = async (updatedEvent) => {
    const savedEvent = await onEventSave(updatedEvent);
    setCurrentEvent(savedEvent);
  };

  const handleDelete = async () => {
    await onEventDelete(currentEvent);
  };

  const modalId = `eventModal-${groupName}-${eventIndex}`;

  return (
    <>
      <li
        className="list-group-item mt-2"
        style={{ cursor: "pointer" }}
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        {currentEvent.name}
      </li>
      <EventForm event={currentEvent} onSave={handleSave} modalId={modalId} />
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
};

export default EventHolder;
