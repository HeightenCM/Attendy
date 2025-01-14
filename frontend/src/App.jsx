import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  )
}

export default App
