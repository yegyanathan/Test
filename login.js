import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './styles.css'; // Import CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user'
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = () => {
    // Send login data to the server with role parameter
    axios.post('dummy_login_url', formData)
      .then(response => {
        console.log('Login successful:', response.data);
        // Handle successful login, e.g., redirect to dashboard
        history.push('/dashboard');
      })
      .catch(error => {
        console.error('Error logging in:', error);
        // Handle login error
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <div className="role-selector">
          <label>
            <input type="radio" name="role" value="user" checked={formData.role === 'user'} onChange={handleChange} />
            User
          </label>
          <label>
            <input type="radio" name="role" value="admin" checked={formData.role === 'admin'} onChange={handleChange} />
            Admin
          </label>
        </div>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
