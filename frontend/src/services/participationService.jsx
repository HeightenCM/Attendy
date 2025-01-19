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
    const headers = { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    const codeJson = {"code":code}
    axios.post('http://localhost:3000/api/participation/sendCode', codeJson, { headers })
        .then(res =>{
            if(res.status === 200)
                return res.data
            else
                return null
        })
}

export function getAttendanceList(id){
    const headers = { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    axios.get(`http://localhost:3000/api/participation/attendanceList?id=${id}`, { headers }).then(res =>{
            if(res.status === 200)
                return res.data
            else
                return null
        })
}

export function generateCode(id){
    const headers = { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    axios.patch(`http://localhost:3000/api/participation/generateCode?id=${id}`, {}, { headers }).then(res =>{
            if(res.status === 200)
                return res.data
            else
                return null
        })
}