import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export function signup(userDto) {
    axios.post('placeholderrl', userDto) //to change url once we have backend working
        .then(response =>{
            localStorage.setItem('token', response.data.token)
        })
}

export function login(userDto) { //the same as signup, but we will probably have a different url
    axios.post('placeholderrl', userDto) //to change url once we have backend working
        .then(response =>{
            localStorage.setItem('token', response.data.token)
        })
}


export function sendParticipationCode(code) {
    const headers = { 
        'Authorization': 'token' //to change once we have login working
    };
    axios.post('placeholderurl', code, { headers }) //to change once we have backend working
}

export function getRole(){ //returns null, 'participant' or 'organizer'
    const token = localStorage.getItem('token');
    if(!token)
        return null;
    try{
        const decodedToken = jwtDecode(token)
        return decodedToken.role;
    }catch(error){
        console.error('Invalid token', error)
        return null;
    }
}