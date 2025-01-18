import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPageRedirect from './components/MainPageRedirect';
import OrganizerPage from './components/OrganizerDashboard';
import ParticipantPage from './components/ParticipantDashboard';
import LoginPage from './components/LoginForm';
import SignupPage from './components/RegisterForm';
import { getRole } from './services/authService';

const PrivateRoute = ({ children, role }) => {
    const userRole = getRole();
    if (!userRole) return <Navigate to="/" />;
    if (role && userRole !== role) return <Navigate to="/" />;
    return children;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<SignupPage />} />
                <Route path="/redirect" element={<MainPageRedirect />} />
                <Route path="/Organizer" element={<PrivateRoute role="organizer"><OrganizerPage /></PrivateRoute>} />
                <Route path="/Participant" element={<PrivateRoute role="participant"><ParticipantPage /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;