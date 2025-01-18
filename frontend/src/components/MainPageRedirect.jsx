import React, { useEffect, useState } from 'react';
import { getRole } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const MainPageRedirect = () => {
    const [role, setRole] = useState(getRole());

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedRole = getRole();
            setRole(updatedRole);
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    if (!role) useNavigate('/');
    if (role === 'participant') useNavigate('/Participant');
    if (role === 'organizer') useNavigate('/Organizer');
    return null;
};

export default MainPageRedirect;