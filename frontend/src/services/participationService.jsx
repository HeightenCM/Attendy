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

export async function sendParticipationCode(code){ //returns name of event if code is correct
    let eventName;
    const headers = { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    const codeJson = {"code":code}
    await axios.post('http://localhost:3000/api/participation/sendCode', codeJson, { headers })
        .then(res =>{
            eventName = res.data;
            console.log(res.data)
        })
    console.log(eventName)
    return eventName;
}

export async function getAttendanceList(id){
    let list;
    const headers = { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    await axios.get(`http://localhost:3000/api/participation/attendanceList?id=${id}`, { headers }).then(res =>{
            list = res.data
        })
    return list;
}

export async function generateCode(id){
    let code
    const headers = { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    await axios.patch(`http://localhost:3000/api/participation/generateCode?id=${id}`, {}, { headers }).then(res =>{
            code = res.data
        })
    return code
}