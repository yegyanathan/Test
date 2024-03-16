import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to the Event Management Platform</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login/admin">Login as Admin</Link>
      <Link to="/login/user">Login as User</Link>
    </div>
  );
};

export default LandingPage;
