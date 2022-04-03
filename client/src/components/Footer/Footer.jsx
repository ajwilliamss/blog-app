import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="logo column1">
          <span>
            <Link to="/">Blog App</Link>
          </span>
          <ul className="footer-address">
            <li>123-456-7890</li>
            <li>City name, country</li>
            <li>123 Street Address</li>
          </ul>
        </div>
        <div className="column2">
          <ul className="footer-nav-items">
            <li className="footer-nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/create">Create</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="column3">
          <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <p>
          &copy; {new Date().getFullYear()} AJ Williams | All rights reserved |
          Terms Of Service | Privacy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
