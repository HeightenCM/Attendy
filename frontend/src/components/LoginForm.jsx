// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TextInput from './TextInput';
import Button from './Button';
import Notification from './Notification';
import { login, getRole } from '../services/authService';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({'message': 'Remember: Your account uses an institutional email.', 'type': 'info'});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(formData);
      const role = getRole();
      if(role === 'participant'){
        navigate('/Participant');
      } else if(role === 'organizer'){
        navigate('/Organizer');
      }
    } catch (error) {
      console.error('Login failed',error);
      setNotification({'message': 'Login failed. Please check your credentials. Remember: Your account uses an institutional email!', 'type': 'danger'});
    } finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-4">
        <div className="card p-4 shadow">
          <img src='/attendy_logo.png'></img>
          <h3 className="text-center">Login to Attendy account</h3>
          {notification && <Notification message={notification.message} type={notification.type} />}
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" label={isSubmitting ? 'Logging in...' : 'Login'} disabled={isSubmitting} />
          </form>
          <div className="mt-3 text-center">
            <p>
              New here? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
