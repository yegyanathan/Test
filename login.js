import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles.css'; // Import CSS file for styling

const Login = () => {
  const { type } = useParams();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send login data to the server (replace dummy URL with actual endpoint)
    axios.post(`dummy_login_${type}_url`, formData)
      .then(response => {
        console.log('Login successful:', response.data);
        // Handle successful login, e.g., redirect to dashboard
      })
      .catch(error => {
        console.error('Error logging in:', error);
        // Handle login error
      });
  };

  return (
    <div className="login-container">
      <h2>Login as {type}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
