import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to the Event Management Platform</h1>
      <div className="buttons-container">
        <Link to="/signup" className="button">Sign Up</Link>
        <Link to="/login/admin" className="button">Login as Admin</Link>
        <Link to="/login/user" className="button">Login as User</Link>
      </div>
    </div>
  );
};

export default LandingPage;
