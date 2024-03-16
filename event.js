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
import './styles.css';

const Event = () => {
  const [eventData, setEventData] = useState({
    organiser_id: '',
    event_type: 'online',
    access: 'private',
    description: '',
    start_time: '',
    end_time: '',
    ms_teams_link: '',
    location: '',
    history: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/create-event', eventData);
      console.log("Response:", response.data);
      // Handle success
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const toggleFields = () => {
    const { event_type } = eventData;
    const locationField = document.getElementById("locationField");
    const teamsLinkField = document.getElementById("teamsLinkField");

    if (event_type === "online") {
      locationField.style.display = "block";
      teamsLinkField.style.display = "none";
    } else {
      locationField.style.display = "none";
      teamsLinkField.style.display = "block";
    }
  };

  return (
    <div className="container">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="organiser_id">Organiser ID:</label>
        <input type="text" id="organiser_id" name="organiser_id" value={eventData.organiser_id} onChange={handleChange} required />

        <label htmlFor="event_type">Event Type:</label>
        <select id="event_type" name="event_type" value={eventData.event_type} onChange={(e) => { handleChange(e); toggleFields(); }}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>

        <div id="locationField" style={{ display: eventData.event_type === "online" ? "block" : "none" }}>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={eventData.location} onChange={handleChange} />
        </div>

        <div id="teamsLinkField" style={{ display: eventData.event_type === "offline" ? "block" : "none" }}>
          <label htmlFor="ms_teams_link">MS Teams Link:</label>
          <input type="text" id="ms_teams_link" name="ms_teams_link" value={eventData.ms_teams_link} onChange={handleChange} />
        </div>

        <label htmlFor="access">Access:</label>
        <select id="access" name="access" value={eventData.access} onChange={handleChange}>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={eventData.description} onChange={handleChange} required />

        <label htmlFor="start_time">Start Time:</label>
        <input type="datetime-local" id="start_time" name="start_time" value={eventData.start_time} onChange={handleChange} required />

        <label htmlFor="end_time">End Time:</label>
        <input type="datetime-local" id="end_time" name="end_time" value={eventData.end_time} onChange={handleChange} required />

        <button type="submit">Save</button>
        <button type="button">Send for Approval</button>
        <button type="button">Cancel</button>
      </form>

      <div className="history">
        {/* History area to show event status history */}
      </div>
    </div>
  );
};

export default Event;
