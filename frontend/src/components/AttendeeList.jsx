// eslint-disable-next-line no-unused-vars
import React from "react";

const AttendeeList = (attendees) => {

  attendees = attendees.attendees
  
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
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
                {attendees &&
                  attendees.map((attendee) => (
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
