import '../styles/header.css';

// components
import Search from './Search';

// context
import { useUser } from '../context/UserContext';

// image
import logo from '../assets/logo.png';

export default function Header() {
  const userContext = useUser();
  if (!userContext) return;
  const { user, logout } = userContext;
  return (
    <div className="flex-between header">
      <a href="/">
        <img src={logo} className="logo" alt="Local Link logo" />
      </a>
      <Search />
      <ul className="flex-between">
        {user.email ? (
          <>
            <li>
              <a href="/events/mine">My Events</a>
            </li>{' '}
            <li>
              <a href="/events/new">New Event</a>
            </li>
            <li>
              <a href="/tickets">Tickets</a>
            </li>
            <ul>
              <li>{user.email}</li>
              <button onClick={logout}>Log Out</button>
            </ul>
          </>
        ) : (
          <ul>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        )}
        <li>Theme</li>
      </ul>
    </div>
  );
}
