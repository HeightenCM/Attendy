# Attendance monitoring web application

## Objective

Implementing a web application to monitor the attendance of a series of participants to a series of activities.

## Description

The application must allow registration of a series of events and storing the attendance information for these events.
The application is built on a Single Page Application architecture and is accessible from the browser on the desktop, mobile devices or tablets (depending on user preference).

## Functionality

An event organizer (EO) can add a group of events
A group of events can contain a single event or a group of events distributed over a period of time.
An event is initially in state CLOSED. At the programmed time, the event becomes OPEN. After the event duration has passed the event again becomes CLOSED.
On event creation an access code is generated (the application offers the option of representing this code as a text or as a QR code). The EO can then show the code to the participants on a projector.
Event participants input the code in the application and thus confirm their presence. Inputting the code can be done by taking a picture with the webcam for the QR code or by inputting the code in a text field for the text codes.
EO can monitor the list of attending participants and can see the moment at which each participant confirmed their attendance.
EO can export the list of participants in a CSV or XLSX file, both for a single event and for an event group.
