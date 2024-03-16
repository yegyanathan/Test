import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import CSS file for styling

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    empId: '',
    password: '',
    email: '',
    phoneNumber: '',
    location: '',
    role: 'user'
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
    // Send signup data to the server (replace dummy URL with actual endpoint)
    axios.post('dummy_signup_url', formData)
      .then(response => {
        console.log('Signup successful:', response.data);
        // Handle successful signup, e.g., redirect to login page
      })
      .catch(error => {
        console.error('Error signing up:', error);
        // Handle signup error
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </label>
          <label>
            Employee ID:
            <input type="text" name="empId" value={formData.empId} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </label>
          <label>
            Role:
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
