import React from "react";
import { useState } from "react";

const AttendeeList = (attendees) => {
  let aux = [];
  if (!Array.isArray(attendees)) {
    aux.push(attendees);
    attendees = aux;
  }
  console.log("Aux is ", aux);
  const [attendeesList, setAttendeesList] = useState(aux);
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Attendee List
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul className="list-group">
                {attendeesList &&
                  attendeesList.map((attendee) => (
                    <li className="list-group-item" key={attendee.email}>
                      {attendee.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendeeList;
