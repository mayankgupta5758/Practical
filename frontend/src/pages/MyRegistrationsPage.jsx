import { useEffect, useState } from 'react';
import { userRequest } from '../api';

function MyRegistrationsPage() {
  const [myEvents, setMyEvents] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMyEvents = async () => {
      const res = await userRequest(token).get(`/users/${userId}/events`);
      setMyEvents(res.data);
    };
    fetchMyEvents();
  }, []);

  const handleCancel = async (eventId) => {
    try {
      await userRequest(token).delete(`/events/${eventId}/cancel/${userId}`);
      alert('Registration cancelled!');
      setMyEvents(myEvents.filter(event => event._id !== eventId));
    } catch (err) {
      alert('Error cancelling.');
    }
  };

  return (
    <div>
      <h2>My Registered Events</h2>
      {myEvents.map(event => (
        <div key={event._id} style={{ marginBottom: 10 }}>
          <h3>{event.title}</h3>
          <button onClick={() => handleCancel(event._id)}>Cancel Registration</button>
        </div>
      ))}
    </div>
  );
}

export default MyRegistrationsPage;
