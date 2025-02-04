// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TextInput from './TextInput';
import Button from './Button';
import Notification from './Notification';
import { signup } from '../services/authService';
import { getRole } from '../services/authService';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' , isOrganizer: false});
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const email = formData.email;
    if (email === '') {
      setNotification(null);
      return;
    }

    if (!email.includes('@')) {
      setNotification({
        message: 'Please input a valid email address!',
        type: 'danger',
      });
    } else {
      const extractedName = email.split('@')[0];

      if (email.endsWith('@stud.ase.ro')) {
        formData.isOrganizer = false;
        setNotification({
          message: `Welcome to Attendy, student ${extractedName}!`,
          type: 'success',
        });
        setFormData((prevData) => ({ ...prevData, name: email.split('@')[0] }));
      } else if (email.endsWith('ase.ro')) {
        formData.isOrganizer = true;
        setNotification({
          message: `Greeting professor ${extractedName}! Welcome to Attendy!`,
          type: 'success',
          
        });
        setFormData((prevData) => ({ ...prevData, name: email.split('@')[0] }));
      } else {
        setNotification({
          message: 'Invalid email. Please use your institutional address. Hint: Ends in ase.ro.',
          type: 'warning',
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.email]);

  useEffect(()=>{
    const name = formData.name;
    if (name === '') {
        setNotification(null);
        return;
      }
    setNotification({
        message:`Welcome to Attendy, ${name}!`,
        type:'success',
    });
  }, [formData.name]);

  // Handle form submission (Gaby, te ocupi)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signup(formData);
      const role = getRole();
      console.log(role);
      if (role === 'organizer') {
        navigate('/Organizer');
      } else if (role === 'participant') {
        navigate('/Participant');
      }
    } catch (error) {
      console.error('Signup failed', error);
      if(error.response)
        setNotification({
        message: error.response.data.message,
        type: 'danger',});
      else
        setNotification({
        message: error.message,
        type: 'danger',});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-4">
        <div className="card p-4 shadow-lg" style={{ boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)' }}>
        <img src='/attendy_logo.png'></img>
          <h3 className="text-center">Create your Attendy account</h3>

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
            <TextInput
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Button type="submit" label={isSubmitting ? 'Registering...' : 'Register'} disabled={isSubmitting} />
          </form>
          <div className="mt-3 text-center">
            <p>
              Already a user? <Link to="/">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
