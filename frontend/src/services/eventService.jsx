import axios from "axios";

export function createEvents(eventGroupDto) {
    const token = localStorage.getItem('token')
    axios.post('http://localhost:3000/api/event/createGroup', eventGroupDto, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )
    .then(response =>{
        return response;
    })
}