import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import CSS file for styling

const LandingPage = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>Welcome to the Event Management Platform</h1>
      </div>
      <div className="button-container">
        <Link to="/signup" className="button">Sign Up</Link>
        <Link to="/login" className="button">Login</Link>
      </div>
    </div>
  );
};

export default LandingPage;
