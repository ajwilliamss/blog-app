import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { Link } from "react-router-dom";
import MobileNav from "../MobileNav/MobileNav";
import userPlaceholder from "../../assets/user-placeholder.png";
import "./Nav.css";

const IMAGE_PATH = process.env.REACT_APP_IMAGE_PATH;

const Nav = () => {
  const { user, dispatch } = useContext(UserContext);

  // Logout user
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <span>
            <Link to="/">Blog App</Link>
          </span>
        </div>
        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/create">Create</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" onClick={handleLogout}>
              {user ? "Logout" : "Login"}
            </Link>
          </li>
        </ul>
        {user ? (
          <Link to="/user">
            <img
              src={
                user.profilePic
                  ? `${IMAGE_PATH}${user.profilePic}`
                  : userPlaceholder
              }
              alt="user profile"
              className="nav-user-img"
            />
          </Link>
        ) : (
          <Link to="/login">
            <img
              src={userPlaceholder}
              alt="user profile"
              className="nav-user-img"
            />
          </Link>
        )}
      </nav>
      <MobileNav handleLogout={handleLogout} />
    </header>
  );
};

export default Nav;
