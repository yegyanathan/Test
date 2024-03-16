import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css'; // Import CSS file for styling

const User = () => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch active public events from the server
    axios.get('dummy_active_events_url')
      .then(response => {
        setActiveEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching active events:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li><Link to="/events/participated">Events Participated In</Link></li>
          <li><Link to="/events/organized">Events Organized</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          <h2>Active Public Events</h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="event-list">
            {activeEvents.length === 0 ? (
              <p>No active public events available</p>
            ) : (
              <ul>
                {activeEvents.map(event => (
                  <li key={event.id}>
                    <h3>{event.title}</h3>
                    <p>Description: {event.description}</p>
                    <p>Start Time: {event.start_time}</p>
                    <p>End Time: {event.end_time}</p>
                    <p>Location: {event.location}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
