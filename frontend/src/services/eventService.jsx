import axios from "axios";

export function createEvents(eventGroupDto) {
    axios.post('http://localhost:3000/api/event/createGroup', eventGroupDto) //to change url to constant
        .then(response =>{
            return response;
        })
}