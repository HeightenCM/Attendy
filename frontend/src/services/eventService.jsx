import axios from "axios";

export function createEvents(eventGroupDto) {
    axios.post('http://localhost:3000/api/event/createGroup', eventGroupDto, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    )
        .then(response =>{
            return response;
        })
}