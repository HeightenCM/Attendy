import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Notification from './Notification';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Gaby add here an API call
    setTimeout(() => {
      alert('Logged in!');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-4">
        <div className="card p-4 shadow">
          <h3 className="text-center">Login</h3>
          <Notification message={"You will need an institutional email!"} type={"warning"}></Notification>
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
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
