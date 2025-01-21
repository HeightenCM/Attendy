import axios from "axios";

export async function postEvents(eventGroupDto) {
  const token = localStorage.getItem("token");
  let events;
  await axios
    .post("http://localhost:3000/api/event/createGroup", eventGroupDto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      events = response.data;
    });
  return events;
}

export async function getEvents() {
  const token = localStorage.getItem("token");
  let events;
  await axios
    .get("http://localhost:3000/api/event/getEvents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      events = response.data;
    });
  return events;
}

export async function deleteEvent(event) {
  const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:3000/api/event/delete?event=${event}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateEvent(event) {
  const response = await axios.put(
    `http://localhost:3000/api/event/update?id=${event.id}`,
    event,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
}

export const postEvent = async (event) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://localhost:3000/api/event/create",
    event,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
