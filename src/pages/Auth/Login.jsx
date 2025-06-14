import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { courseData } from "../../context/CourseContext";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");

  const [password, setpassword] = useState("");

  const { fetchMyCourse } = courseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Login</h2>
        </div>
        <form className="auth-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Please Wait" : "Login"}
          </button>

          <div className="auth-footer">
            <span>Don't have an account? </span>
            <Link to="/register" className="auth-link">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
