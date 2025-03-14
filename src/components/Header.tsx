import '../styles/header.css';
import Search from './Search';
import logo from '../assets/logo.png';
import { useUser } from '../context/UserContext';

export default function Header() {
  const { user, logout } = useUser();
  console.log(user);
  return (
    <div className="flex-between header">
      <a href="/">
        <img src={logo} className="logo" alt="Local Link logo" />
      </a>
      <Search />
      <ul className="flex-between w-10">
        {user.email ? (
          <ul>
            <li>{user.email}</li>
            <button onClick={logout}>Log Out</button>
          </ul>
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
