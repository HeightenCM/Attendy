// eslint-disable-next-line no-unused-vars
import React from "react";
import { CSVLink } from "react-csv";
// eslint-disable-next-line no-unused-vars
import xlsx from "json-as-xlsx";

const AttendeeList = (attendees) => {
  attendees = attendees.attendees;

  // function convertToXlsx(attendees) {
  //   const dataForXlsx = [
  //     {
  //       sheet: "Attendees",
  //       columns: [
  //         {
  //           label: "Email",
  //           value: "email",
  //         },
  //         { label: "Name", value: "name" },
  //       ],
  //       content: attendees,
  //     },
  //   ];

  //   // [
  //   //   {
  //   //     sheet: "Adults",
  //   //     columns: [
  //   //       { label: "User", value: "user" }, // Top level data
  //   //       { label: "Age", value: (row) => row.age + " years" }, // Custom format
  //   //       { label: "Phone", value: (row) => (row.more ? row.more.phone || "" : "") }, // Run functions
  //   //     ],
  //   //     content: [
  //   //       { user: "Andrea", age: 20, more: { phone: "11111111" } },
  //   //       { user: "Luis", age: 21, more: { phone: "12345678" } },
  //   //     ],
  //   //   },
  //   //   {
  //   //     sheet: "Children",
  //   //     columns: [
  //   //       { label: "User", value: "user" }, // Top level data
  //   //       { label: "Age", value: "age", format: '# "years"' }, // Column format
  //   //       { label: "Phone", value: "more.phone", format: "(###) ###-####" }, // Deep props and column format
  //   //     ],
  //   //     content: [
  //   //       { user: "Manuel", age: 16, more: { phone: 9999999900 } },
  //   //       { user: "Ana", age: 17, more: { phone: 8765432135 } },
  //   //     ],
  //   //   },
  //   // ]

  //   let settings = {
  //     fileName: "Event",
  //     extraLength: 3,
  //     writeMode: "writeFile",
  //     writeOptions: {},
  //     RTL: false,
  //   };
  //   xlsx(dataForXlsx, settings);
  // }

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
              <CSVLink data={attendees} filename={"Event.csv"}>
                <button type="button" className="btn btn-success ms-3">
                  .CSV
                </button>
              </CSVLink>
              {/* <button
                onClick={convertToXlsx(attendees)}
                type="button"
                className="btn btn-success ms-3"
              >
                .XLSX
              </button> */}
              {/* <button
                type="button"
                className="btn btn-primary ml-3"
              >Refresh</button> */}
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
                      {attendee.name} - {attendee.email} - {attendee.time}
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
