import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests

const User = () => {
  const [activePublicEvents, setActivePublicEvents] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch currently active public events from the server
    axios.get('url_to_get_active_public_events')
      .then(response => {
        setActivePublicEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching active public events:', error);
      });
  }, []); // Empty dependency array to run only once on component mount

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOrganisedEvents = () => {
    // Fetch events organised by the user (replace url_to_get_organised_events with actual URL)
    axios.get('url_to_get_organised_events')
      .then(response => {
        console.log('Events organised by me:', response.data);
        // Handle displaying events organised by the user
      })
      .catch(error => {
        console.error('Error fetching organised events:', error);
      });
  };

  const handleInvitedEvents = () => {
    // Fetch events the user is invited for (replace url_to_get_invited_events with actual URL)
    axios.get('url_to_get_invited_events')
      .then(response => {
        console.log('Events I\'m invited for:', response.data);
        // Handle displaying events the user is invited for
      })
      .catch(error => {
        console.error('Error fetching invited events:', error);
      });
  };

  return (
    <div>
      <div className="menu">
        <button onClick={handleMenuToggle}>&#9776;</button>
        {menuOpen && (
          <div className="dropdown">
            <button onClick={handleOrganisedEvents}>Events Organised by Me</button>
            <button onClick={handleInvitedEvents}>Events I'm Invited For</button>
          </div>
        )}
      </div>
      <div>
        <h2>Currently Active Public Events</h2>
        <ul>
          {activePublicEvents.map(event => (
            <li key={event.id}>
              <strong>{event.name}</strong> - {event.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default User;
