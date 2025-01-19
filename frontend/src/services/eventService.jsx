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
    await axios.get('http://localhost:3000/api/event/createGroup', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    ).then(response =>{
        events = response.data;
    })
    return events;
}