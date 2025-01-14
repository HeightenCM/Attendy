import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextInput from './TextInput';
import Button from './Button';
import Notification from './Notification';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate email dynamically when the user enters it
  useEffect(() => {
    const email = formData.email;
    if (email === '') {
      setNotification(null); // Clear notification when email is empty
      return;
    }

    // Check if the email ends with @ase.ro
    if (!email.endsWith('ase.ro')) {
      setNotification({
        message: 'Invalid email address. Please use a valid institutional email. Hint: It ends with ase.ro.',
        type: 'danger',
      });
    } else {
      // Extract the name from the email and determine the role
      const extractedName = email.split('@')[0];

      if (email.endsWith('@stud.ase.ro')) {
        setNotification({
          message: `Student detected: ${extractedName}.`,
          type: 'info',
        });
      } else if (email.endsWith('@ase.ro')) {
        setNotification({
          message: `Teacher detected: ${extractedName}.`,
          type: 'success',
        });
      } else {
        setNotification({
          message: 'Invalid account type. Please provide a valid student or teacher email.',
          type: 'warning',
        });
      }
    }
  }, [formData.email]); // Trigger useEffect when the email changes

  // Handle form submission (on clicking Register)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (e.g., API call)
    setTimeout(() => {
      alert('Registered successfully!');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-4">
        <div className="card p-4 shadow-lg" style={{ boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)' }}>
          <h3 className="text-center">Create your Attendy account</h3>

          {/* Display the Notification */}
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
