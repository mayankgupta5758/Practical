import { useEffect, useState } from 'react';
import { publicRequest, userRequest } from '../api';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await publicRequest.get('/events');
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      await userRequest(token).post(`/events/${eventId}/register`);
      alert('Registered successfully!');
    } catch (err) {
      alert('Already registered or error occurred.');
    }
  };

  return (
    <div>
      <h2>All Events</h2>
      {events.map(event => (
        <div key={event._id} style={{ marginBottom: 10 }}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <button onClick={() => handleRegister(event._id)}>Register</button>
        </div>
      ))}
    </div>
  );
}

export default EventsPage;
