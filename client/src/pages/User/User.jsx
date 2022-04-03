import { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext/UserContext";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./User.css";

const IMAGE_PATH = process.env.REACT_APP_IMAGE_PATH;

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const User = () => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [userIsFocused, setUserIsFocused] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [pwdIsFocused, setPwdIsFocused] = useState(false);

  const { user, dispatch } = useContext(UserContext);

  // Update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE" });
      const updatedUser = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      // If image selected
      if (image) {
        const newImage = new FormData();
        const filename = `${uuidv4()}${image.name}`;
        newImage.append("name", filename);
        newImage.append("file", image);
        updatedUser.profilePic = filename;
        try {
          await axios.post("/api/upload", newImage);
        } catch (error) {
          console.error(error);
        }
      }

      const response = await axios.put(`/api/users/${user._id}`, updatedUser, {
        headers: { Authorization: user.token },
      });

      // console.log(response);
      dispatch({ type: "UPDATE_SUCCESS", payload: response.data });
      setSuccess(response.data.message);
    } catch (error) {
      console.error(error);
      dispatch({ type: "UPDATE_ERROR" });
    }
  };

  // Delete user
  const handleDelete = async () => {
    try {
      // If token exists
      if (user.token) {
        const response = await axios.delete(`/api/users/${user._id}`, {
          headers: { Authorization: user.token },
        });

        // console.log(response);
        localStorage.removeItem("user");

        // Redirect home
        window.location.replace("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Focus username input upon initial render
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  // Test username
  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(username));
  }, [username]);

  // Test password
  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  return (
    <section className="user-info">
      <div className="user-account">
        <h4>
          Want to remove your account?{" "}
          <span className="del" onClick={() => handleDelete()}>
            Delete Account
          </span>
        </h4>
      </div>
      <form className="user-form" onSubmit={handleSubmit}>
        <label htmlFor="profile-picture">Profile Picture</label>
        <img
          src={
            image
              ? URL.createObjectURL(image)
              : `${IMAGE_PATH}${user.profilePic}`
          }
          alt={user.username}
          className="user-profile-img"
        />

        {/* Image */}
        <input
          type="file"
          name="image"
          id="image-upload"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* Username */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          required
          ref={usernameRef}
          value={username}
          placeholder={user.username}
          onFocus={() => setUserIsFocused(true)}
          onBlur={() => setUserIsFocused(false)}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
        {!validUsername && userIsFocused && username && (
          <p>
            Username must be 4 to 24 characters and start with a letter.
            Letters, numbers, hyphens, and underscores are permitted.
          </p>
        )}

        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          required
          ref={emailRef}
          placeholder={user.email}
        />

        {/* Password */}
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          name="password"
          placeholder="●●●●●●●●"
          required
          ref={passwordRef}
          onFocus={() => setPwdIsFocused(true)}
          onBlur={() => setPwdIsFocused(false)}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!validPassword && pwdIsFocused && (
          <p>
            Password must be 8 to 24 characters, include uppercase and lowercase
            letters, a number, and a special character. Special characters that
            are permitted: ! @ # $ %
          </p>
        )}

        {/* Button */}
        <div className="btn">
          <button
            type="submit"
            className="user-btn"
            disabled={!validUsername || !validPassword ? true : false}
          >
            Submit
          </button>
        </div>
      </form>
      {success && (
        <p style={{ color: "teal", fontSize: "2rem", marginBottom: "2rem" }}>
          {success}
        </p>
      )}
    </section>
  );
};

export default User;
