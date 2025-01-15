import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import ParticipantDashboard from './components/ParticipantDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/father" element={<ParticipantDashboard />} />       
        <Route path="*" element={<LoginForm />}/>
      </Routes>
    </Router>
  )
}

export default App
