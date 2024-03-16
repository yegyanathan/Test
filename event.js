// import React, { useState } from 'react';
// import './styles.css'; // Import CSS file for styling

// const Event = () => {
//   const [formData, setFormData] = useState({
//     event_type: 'offline',
//     access: 'private',
//     description: '',
//     start_time: '',
//     end_time: '',
//     ms_teams_link: '',
//     location: '',
//     status: 'Pending Approval',
//     purged: false,
//     history: [],
//     participantList: []
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission, e.g., sending data to backend
//     console.log(formData);
//   };

//   const handleApproval = () => {
//     setFormData({
//       ...formData,
//       status: 'Approved'
//     });
//   };

//   return (
//     <div className="container">
//       <div className="form-container">
//         <h2>Create Event</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Event Type:
//             <select name="event_type" value={formData.event_type} onChange={handleChange}>
//               <option value="offline">Offline</option>
//               <option value="online">Online</option>
//             </select>
//           </label>
//           <label>
//             Access:
//             <select name="access" value={formData.access} onChange={handleChange}>
//               <option value="private">Private</option>
//               <option value="public">Public</option>
//             </select>
//           </label>
//           {formData.access === 'private' && (
//             <div>
//               <label>
//                 Participant List:
//                 <input type="text" name="participantList" value={formData.participantList} onChange={handleChange} />
//                 <button type="button">Search</button>
//               </label>
//             </div>
//           )}
//           <label>
//             Description:
//             <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
//           </label>
//           <label>
//             Start Time:
//             <input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} />
//           </label>
//           <label>
//             End Time:
//             <input type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} />
//           </label>
//           {formData.event_type === 'online' ? (
//             <label>
//               MS Teams Link:
//               <input type="text" name="ms_teams_link" value={formData.ms_teams_link} onChange={handleChange} />
//             </label>
//           ) : (
//             <label>
//               Location:
//               <input type="text" name="location" value={formData.location} onChange={handleChange} />
//             </label>
//           )}
//           <button type="submit">Save</button>
//           <button type="button" onClick={handleApproval}>Send for Approval</button>
//         </form>
//         <div className="event-history">
//           <h3>Event Status History</h3>
//           <ul>
//             {formData.history.map((entry, index) => (
//               <li key={index}>
//                 <strong>Status:</strong> {entry.status} - {entry.reason && <span><strong>Reason:</strong> {entry.reason}</span>}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Event;

import React, { useState } from 'react';
import axios from 'axios';

const Event = () => {
  const [eventData, setEventData] = useState({
    organiserId: '',
    eventType: 'online',
    access: 'private',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    teamsLink: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('/api/create-event', eventData);
      console.log("Response:", response.data);
      setSuccess(true);
    } catch (err) {
      console.error("Error:", err);
      setError('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFields = () => {
    const { eventType } = eventData;
    const locationField = document.getElementById("locationField");
    const teamsLinkField = document.getElementById("teamsLinkField");

    if (eventType === "online") {
      locationField.style.display = "none";
      teamsLinkField.style.display = "block";
    } else {
      locationField.style.display = "block";
      teamsLinkField.style.display = "none";
    }
  };

  return (
    <div className="container">
      <h1 style={{ color: '#FF0000' }}>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="organiserId" style={{ marginBottom: '10px' }}>Organiser ID:</label>
        <input type="text" id="organiserId" name="organiserId" value={eventData.organiserId} onChange={handleChange} required />

        <label htmlFor="eventType" style={{ marginBottom: '10px' }}>Event Type:</label>
        <select id="eventType" name="eventType" value={eventData.eventType} onChange={(e) => { handleChange(e); toggleFields(); }}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>

        <label htmlFor="access" style={{ marginBottom: '10px' }}>Access:</label>
        <select id="access" name="access" value={eventData.access} onChange={handleChange}>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        <div id="locationField" style={{ display: eventData.eventType === "online" ? "none" : "block" }}>
          <label htmlFor="location" style={{ marginBottom: '10px' }}>Location:</label>
          <input type="text" id="location" name="location" value={eventData.location} onChange={handleChange} />
        </div>

        <div id="teamsLinkField" style={{ display: eventData.eventType === "online" ? "block" : "none" }}>
          <label htmlFor="teamsLink" style={{ marginBottom: '10px' }}>MS Teams Link:</label>
          <input type="text" id="teamsLink" name="teamsLink" value={eventData.teamsLink} onChange={handleChange} />
        </div>

        <label htmlFor="description" style={{ marginBottom: '10px' }}>Description:</label>
        <textarea id="description" name="description" value={eventData.description} onChange={handleChange} required />

        <label htmlFor="startTime" style={{ marginBottom: '10px' }}>Start Time:</label>
        <input type="datetime-local" id="startTime" name="startTime" value={eventData.startTime} onChange={handleChange} required />

        <label htmlFor="endTime" style={{ marginBottom: '10px' }}>End Time:</label>
        <input type="datetime-local" id="endTime" name="endTime" value={eventData.endTime} onChange={handleChange} required />

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#FF0000', color: '#FFFFFF', border: 'none', cursor: 'pointer', marginTop: '10px' }} disabled={loading}>Submit</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <div style={{ color: '#FF0000', marginTop: '10px' }}>{error}</div>}
      {success && <div style={{ color: '#008000', marginTop: '10px' }}>Event created successfully!</div>}
    </div>
  );
};

export default Event;

