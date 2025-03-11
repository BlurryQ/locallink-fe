import '../styles/header.css';
import Search from './Search';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <div className="flex-between header">
      <a href="/">
        <img src={logo} className="logo" alt="Local Link logo" />
      </a>
      <Search />
      <ul className="flex-between w-10">
        <li>
          <a href="/signup">Sign Up</a>
        </li>
        <li>Theme</li>
      </ul>
    </div>
  );
}
