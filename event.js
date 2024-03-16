import React, { useState } from 'react';
import './styles.css'; // Import CSS file for styling

const Event = () => {
  const [formData, setFormData] = useState({
    event_type: 'offline',
    access: 'private',
    description: '',
    start_time: '',
    end_time: '',
    ms_teams_link: '',
    location: '',
    status: 'Pending Approval',
    purged: false,
    history: [],
    participantList: []
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

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Event Type:
            <select name="event_type" value={formData.event_type} onChange={handleChange}>
              <option value="offline">Offline</option>
              <option value="online">Online</option>
            </select>
          </label>
          <label>
            Access:
            <select name="access" value={formData.access} onChange={handleChange}>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </label>
          {formData.access === 'private' && (
            <div>
              <label>
                Participant List:
                <input type="text" name="participantList" value={formData.participantList} onChange={handleChange} />
                <button type="button">Search</button>
              </label>
            </div>
          )}
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </label>
          <label>
            Start Time:
            <input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} />
          </label>
          <label>
            End Time:
            <input type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} />
          </label>
          {formData.event_type === 'online' ? (
            <label>
              MS Teams Link:
              <input type="text" name="ms_teams_link" value={formData.ms_teams_link} onChange={handleChange} />
            </label>
          ) : (
            <label>
              Location:
              <input type="text" name="location" value={formData.location} onChange={handleChange} />
            </label>
          )}
          <button type="submit">Save</button>
          <button type="button" onClick={handleApproval}>Send for Approval</button>
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
