import axios from "axios"

export function openEvent(eventDto) {
    axios.post('http://localhost:3000/api/participation/openEvent', eventDto)
}

export function getNewCode(eventDto){ //should only work if event is open
    axios.get('http://localhost:3000/api/participation/getCode', eventDto)
        .then(res => {
            return res.data
        })
}

export function sendParticipationCode(code){ //returns name of event if code is correct
    axios.post('http://localhost:3000/api/participation/ParticipantCode',code)
        .then(res =>{
            if(res.status === 200)
                return res.data
            else
                return false
        })
}