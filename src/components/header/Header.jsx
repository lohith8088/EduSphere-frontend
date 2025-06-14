import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = ({ isAuth }) => {
  return (
    <header className="header-container">
      <div className="logo-container">
        <span className="logo">EduSphere</span>
      </div>

      <nav className="nav-links">
        <Link to={"/"} className="nav-link">
          Home
        </Link>
        <Link to={"/courses"} className="nav-link">
          Courses
        </Link>
        <Link to={"/about"} className="nav-link">
          About
        </Link>
       {isAuth? <Link to={"/account"} className="nav-link">
          Account
        </Link>:<Link to={"/login"} className="nav-link">
          Login
        </Link>}
      </nav>
    </header>
  );
};

export default Header;
