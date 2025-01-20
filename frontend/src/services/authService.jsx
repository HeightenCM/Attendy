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

export async function getName(){
    let name;
    await axios.get('http://localhost:3000/api/user/name',{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response =>{
            name = response.data
        })
    return name;
}

export function disconnect(){
    localStorage.removeItem('token');
}