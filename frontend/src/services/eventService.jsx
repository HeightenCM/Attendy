import axios from "axios";

export async function postEvents(eventGroupDto) {
    const token = localStorage.getItem('token')
    let events;
    await axios.post('http://localhost:3000/api/event/createGroup', eventGroupDto, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    ).then(response =>{
        events = response.data;
    })
    return events;
}

export async function getEvents() {
    const token = localStorage.getItem('token')
    let events;
    await axios.get('http://localhost:3000/api/event/getEvents', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    ).then(response =>{
        events = response.data;
    })
    console.log(events, Array.isArray(events))
    return events;
}

export async function deleteEvent(eventId){
    const token = localStorage.getItem('token')
    let events;
    await axios.delete(`http://localhost:3000/api/event/delete?id=${eventId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response =>{
        events = response.data;
    })
    console.log(events, Array.isArray(events))
    return events;
}

export const updateEvent = async (eventId, updatedData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:3000/api/event/update?id=${eventId}`, 
        updatedData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating the event:", error);
      throw error;
    }
  };