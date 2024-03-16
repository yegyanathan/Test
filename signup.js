import React, { useState } from 'react';
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
          {/* Signup form inputs */}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
