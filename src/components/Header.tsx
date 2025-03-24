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

  const handleBurgerPress = (): void => {
    const burgerList = document.querySelector('.hamburger-list');
    const footer = document.querySelector('.footer');
    if (!burgerList || !footer) return;
    const burgerStatus: string = burgerList.classList[2];
    if (burgerStatus === 'closed') {
      burgerList.classList.remove('closed');
      burgerList.classList.add('open');
      footer.classList.remove('closed');
      footer.classList.add('open');
    } else {
      burgerList.classList.remove('open');
      burgerList.classList.add('closed');
      footer.classList.remove('open');
      footer.classList.add('closed');
    }
  };

  let username: string = '';
  if (user.email) username = user.email.split('@')[0];
  if (username.length > 10) username = username.slice(0, 10);

  return (
    <div className="flex-between header">
      <a href="/">
        <img src={logo} className="logo" alt="Local Link logo" />
      </a>
      <Search />
      <button className="hamburger" onClick={handleBurgerPress}>
        =
      </button>
      <ul className="flex-between hamburger-list closed">
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
              <li>{username}</li>
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
      </ul>
    </div>
  );
}
