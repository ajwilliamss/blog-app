import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [validUsername, setValidUsername] = useState(false);
  const [userIsFocused, setUserIsFocused] = useState(false);

  const [validPassword, setValidPassword] = useState(false);
  const [pwdIsFocused, setPwdIsFocused] = useState(false);

  const [confirmIsFocused, setConfirmIsFocused] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const usernameRef = useRef(null);

  const { username, email, password, password2 } = formData;

  // Add input to formData state
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Register user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/register", {
        username,
        email,
        password,
      });
      // console.log(response.data);

      setSuccess(true);
      setSuccessMessage(response.data.message);
      setFormData({ username: "", email: "", password: "", password2: "" });
    } catch (error) {
      console.error(error);
      setSuccess(false);
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
    // Compare passwords
    setIsMatch(password === password2);
  }, [password, password2]);

  return (
    <>
      {success ? (
        <section className="register-page">
          <p className="register-success">
            {successMessage}{" "}
            <Link to="/login" style={{ fontWeight: "bold" }}>
              here
            </Link>
          </p>
        </section>
      ) : (
        <section className="register-page">
          <form className="register-form" onSubmit={handleSubmit}>
            <h1>Register</h1>
            {/* Username */}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="ajwilliams"
              ref={usernameRef}
              value={username}
              onChange={handleChange}
              required
              onFocus={() => setUserIsFocused(true)}
              onBlur={() => setUserIsFocused(false)}
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
              placeholder="example@email.com"
              value={email}
              onChange={handleChange}
              required
            />

            {/* Password */}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password123"
              value={password}
              onChange={handleChange}
              required
              onFocus={() => setPwdIsFocused(true)}
              onBlur={() => setPwdIsFocused(false)}
            />
            {!validPassword && pwdIsFocused && (
              <p>
                Password must be 8 to 24 characters, include uppercase and
                lowercase letters, a number, and a special character. Special
                characters that are permitted: ! @ # $ %
              </p>
            )}

            {/* Confirm password */}
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              placeholder="password123"
              value={password2}
              onChange={handleChange}
              required
              onFocus={() => setConfirmIsFocused(true)}
              onBlur={() => setConfirmIsFocused(false)}
            />
            {!isMatch && confirmIsFocused && (
              <p>Confirm password must match the password.</p>
            )}

            {/* Button */}
            <div className="register-btn">
              <button
                type="submit"
                disabled={
                  !validUsername || !validPassword || !isMatch ? true : false
                }
              >
                Register
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
