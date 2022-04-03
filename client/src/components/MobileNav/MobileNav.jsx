import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import "./MobileNav.css";

const MobileNav = ({ handleLogout }) => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const mobileIcon = (
    <BiMenu
      size="2rem"
      className="mobile-icon"
      onClick={() => setOpen((prevOpen) => !prevOpen)}
    />
  );

  const closeIcon = (
    <MdClose
      size="2rem"
      className="mobile-icon"
      onClick={() => setOpen((prevOpen) => !prevOpen)}
    />
  );

  return (
    <div className="mobile-nav">
      <div className="mobile-logo">
        <span>
          <Link to="/">Blog App</Link>
        </span>
      </div>
      {open ? closeIcon : mobileIcon}
      {open && (
        <ul className="mobile-nav-items" onClick={() => setOpen(false)}>
          <li className="mobile-nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/about">About</Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/create">Create</Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/login" onClick={handleLogout}>
              {user ? "Logout" : "Login"}
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/user">{user ? "Account" : "Register"}</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default MobileNav;
