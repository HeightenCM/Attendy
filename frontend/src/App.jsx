import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import ParticipantDashboard from './components/ParticipantDashboard'
import OrganizerDashboard from './components/OrganizerDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/Participant" element={<ParticipantDashboard />} />     
        <Route path="/Organizer" element={<OrganizerDashboard />} />   
        <Route path="*" element={<LoginForm />}/>
      </Routes>
    </Router>
  )
}

export default App
