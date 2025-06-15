import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";


const ResetPass = () => {
  const [password, setpassword] = useState("");
  const [btnloading, setbtnloading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setbtnloading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/user/reset?token=${params.token}`,
        {
          password,
        }
      );
      toast.success("Password reset successfully");
      navigate("/login");
      setbtnloading(false);
    } catch (error) {
      console.log(error);
      toast.error("Password reset link is expired");
      setbtnloading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Reset Password</h2>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Enter password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={btnloading}
            className="auth-btn common-btn"
          >
            {btnloading ? "Please Wait..." : "Reset Password"}
          </button>
        </form>
        <div className="auth-footer">
          Remember your password?{" "}
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
