import React, { useState } from 'react';

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

  const handleReject = () => {
    // In a real application, you would have a modal or a form to input rejection comments
    const reason = prompt('Enter reason for rejection:');
    setFormData({
      ...formData,
      status: 'Rejected',
      history: [...formData.history, { status: 'Rejected', reason }]
    });
  };

  const handleSearch = (searchTerm) => {
    // Perform search based on searchTerm (this is a mock example)
    const filteredParticipants = formData.participantList.filter(participant =>
      participant.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Update participant list with filtered results
    setFormData({
      ...formData,
      participantList: filteredParticipants
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Organiser ID:
          <input type="text" name="organiser_id" value={formData.organiser_id} onChange={handleChange} />
        </label>
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
        {formData.event_type === 'online' && (
          <label>
            MS Teams Link:
            <input type="text" name="ms_teams_link" value={formData.ms_teams_link} onChange={handleChange} />
          </label>
        )}
        {formData.event_type === 'offline' && (
          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </label>
        )}
        {formData.access === 'private' && (
          <div>
            <label>
              Participant List:
              <input type="text" onChange={(e) => handleSearch(e.target.value)} />
              <button type="button" onClick={() => handleSearch}>Search</button>
            </label>
            <ul>
              {formData.participantList.map((participant, index) => (
                <li key={index}>{participant}</li>
              ))}
            </ul>
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
        <button type="submit">Save</button>
        <button type="button" onClick={handleApproval}>Send for Approval</button>
        <button type="button" onClick={handleReject}>Reject</button>
      </form>
      <div>
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
  );
};

export default Event;
