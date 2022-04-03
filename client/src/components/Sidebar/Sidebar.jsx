import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaLinkedin, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import aboutImage from "../../assets/about-img.jpg";
import "./Sidebar.css";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  // Get categories
  const getCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      // console.log(response);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Invoke getCategories upon initial render
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-heading">
        <h3>About Me</h3>
      </div>
      <img src={aboutImage} alt="about" className="about-img" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut similique
        sunt eum. Nostrum, nisi optio? Laboriosam molestiae vero aut
        necessitatibus.
      </p>
      <div className="sidebar-heading">
        <h3>Categories</h3>
      </div>
      <ul className="sidebar-categories">
        {categories.map((category) => {
          const { _id, name } = category;
          return (
            <li className="sidebar-category" key={_id}>
              <Link to={`/?category=${name}`}>{name}</Link>
            </li>
          );
        })}
      </ul>
      <div className="sidebar-heading">
        <h3>Social Media</h3>
      </div>
      <div className="social-icons">
        <FaLinkedin size="2rem" className="social-icon" />
        <FaYoutube
          size="2rem"
          style={{ marginLeft: "0.5rem" }}
          className="social-icon"
        />
        <FaInstagram
          size="2rem"
          style={{ marginLeft: "0.5rem" }}
          className="social-icon"
        />
        <FaTwitter
          size="2rem"
          style={{ marginLeft: "0.5rem" }}
          className="social-icon"
        />
      </div>
    </div>
  );
};

export default Sidebar;
