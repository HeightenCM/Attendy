import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export async function signup(userDto) {
    await axios.post('http://localhost:3000/api/user/signup', userDto) //to change url to constant
        .then(response =>{
            localStorage.setItem('token', response.data)
        })
}

export async function login(userDto) {
    await axios.post('http://localhost:3000/api/user/login', userDto) //to change url to constant
        .then(response =>{
            localStorage.setItem('token', response.data)
        })
}


export function sendParticipationCode(code) {
    const headers = { 
        'Authorization': `${localStorage.getItem('token')}` //to change once we have login working
    };
    axios.post('placeholderurl', code, { headers }) //to change once we have backend working
}

export function getRole(){ //returns null, 'participant' or 'organizer'
    const token = localStorage.getItem('token');
    if(!token)
        return null;
    try{
        const decodedToken = jwtDecode(token)
        if(decodedToken.role) {
            return 'organizer'
        } else {
            return 'participant'
        }
    }catch(error){
        console.error('Invalid token', error)
        return null;
    }
}