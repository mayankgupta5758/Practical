import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: 10, backgroundColor: '#eee' }}>
      <Link to="/events" style={{ marginRight: 10 }}>Events</Link>
      <Link to="/my-events" style={{ marginRight: 10 }}>My Registrations</Link>
      <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}

export default Navbar;
