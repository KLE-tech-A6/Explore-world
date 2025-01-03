import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import './Login.css';


const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fallback in case UserContext is undefined
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext is not provided. Wrap your app with UserProvider.");
  }

  const { setCurrentUser } = userContext;

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const changeInputHandler = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`http://localhost:5050/user/login`, loginData);
      const loggedInUser = response.data;

      if (!loggedInUser) {
        setError("Invalid login credentials. Please try again.");
      } else {
        setCurrentUser(loggedInUser);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2>Login</h2>
        <form className="form login__form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={loginData.email}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn primary">
            Login
          </button>
        </form>
        <small>
          Don't have an account? <Link to="/Signin">Sign Up</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
