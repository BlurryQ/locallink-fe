import '../styles/footer.css';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <div className="footer flex-between closed">
      <ul>
        Developer
        <li>
          <a href="https://github.com/BlurryQ">GitHub</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/jazz-barlow/">LinkedIn</a>
        </li>
      </ul>
      <ul>
        Contact Us
        <li>
          <a href="tel:+440202 123 4567">0202 123 4567</a>
        </li>
        <li>
          <a href="mailto:locallinkuser@gmail.com">locallinkuser@gmail.com</a>
        </li>
      </ul>
      <a href="/">
        <img src={logo} className="logo" alt="Local Link logo" />
      </a>
    </div>
  );
}
