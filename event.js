import React, { useState } from 'react';
import './styles.css'; // Import CSS file for styling

const Event = () => {
  const [formData, setFormData] = useState({
    organiser_id: '',
    event_type: 'offline',
    access: 'private',
    description: '',
    start_time: '',
    end_time: '',
    ms_teams_link: '',
    location: '',
    status: 'Pending Approval',
    creation_date: '',
    purged: false,
    history: []
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
    // Handle form submission, e.g., sending data to backend
    console.log(formData);
  };

  const handleApproval = () => {
    setFormData({
      ...formData,
      status: 'Approved'
    });
  };

  const handleReject = () => {
    const reason = prompt('Enter reason for rejection:');
    setFormData({
      ...formData,
      status: 'Rejected',
      history: [...formData.history, { status: 'Rejected', reason }]
    });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          {/* Event form */}
        </form>
        <div className="event-history">
          <h3>Event Status History</h3>
          <ul>
            {formData.history.map((entry, index) => (
              <li key={index}>
                <strong>Status:</strong> {entry.status} - {entry.reason && <span><strong>Reason:</strong> {entry.reason}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Event;
