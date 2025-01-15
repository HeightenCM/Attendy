import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export function signup(userDto) {
    axios.post('http://localhost:3000/api/user/signup', userDto) //to change url to constant
        .then(response =>{
            console.log(response.data)
            localStorage.setItem('token', response.data)
        })
}

export function login(userDto) {
    axios.post('http://localhost:3000/api/user/login', userDto) //to change url to constant
        .then(response =>{
            localStorage.setItem('token', response.data)
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