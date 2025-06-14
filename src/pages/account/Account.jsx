import React from "react";
import { MdDashboard } from "react-icons/md";
import "./account.css";
import { IoLogOut } from "react-icons/io5";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { setIsAuth, setUser, user, isAuth, loading } = UserData();
  const navigate = useNavigate();

  const Logouthandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged out");
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;
  if (!isAuth || !user) return <p>You must be logged in to view this page.</p>;

  return (
    <div className="profile-container">
      <div className="profile">
        <h2>My Profile</h2>
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button
            className="common-btn "
            onClick={() => navigate(`/${user._id}/dashboard`)}
          >
            <MdDashboard className="dashboard-icon" /> Dashboard
          </button>

          {user.role === "admin" && (
            <>
              <button
                className="common-btn "
                onClick={() => navigate(`/admin/dashboard`)}
              >
                <MdDashboard className="dashboard-icon" /> Admin Dashboard
              </button>
            </>
          )}

          <button onClick={Logouthandler} className="common-btn logoff">
            <IoLogOut className="logoff-icon" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
