import { useEffect, useRef, useContext } from "react";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { isError, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  // Login user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGIN" });
      const response = await axios.post("/api/users/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      // console.log(response.data);

      // Add user to local storage
      localStorage.setItem("user", JSON.stringify(response.data));

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      // If login successful redirect home
      navigate("/");
    } catch (error) {
      console.error(error);
      dispatch({ type: "LOGIN_ERROR" });
    }
  };

  // Focus email input upon initial render
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <section className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="example@email.com"
          ref={emailRef}
          required
        />

        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="password123"
          ref={passwordRef}
          required
        />

        {/* Buttons */}
        <div className="login-btns">
          <button type="submit">Login</button>
          <Link to="/register">
            <button type="button">Register</button>
          </Link>
        </div>
        {isError && (
          <p className="login-error">
            Unable to login. Email or password incorrect
          </p>
        )}
      </form>
    </section>
  );
};

export default Login;
