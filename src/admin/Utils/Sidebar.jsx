import React from "react";
import "./common.css";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaBookReader } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/admin/dashboard">
            <div className="icon">
              <GoHomeFill />
            </div>
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/course">
            <div className="icon">
              <FaBookReader />
            </div>
            <span>Courses</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/users">
            <div className="icon">
              <FaUserAlt />
            </div>
            <span>Users</span>
          </Link>
        </li>

        <li>
          <Link to="/account">
            <div className="icon">
              <IoLogOut />
            </div>
            <span>LogOut</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
