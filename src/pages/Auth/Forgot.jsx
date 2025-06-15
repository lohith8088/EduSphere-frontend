import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [btnloading, setbtnloading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setbtnloading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/forgot `, {
        email,
      });
      toast.success("Reset link sent to email");
      navigate("/login");
      setbtnloading(false);
    } catch (error) {
      console.log(error);
      toast.error("Invalid email");
      setbtnloading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Forgot Password</h2>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Enter email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={btnloading} 
            className="auth-btn common-btn"
          >
            {btnloading ? "Please Wait..." : "Forgot Password"}
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

export default Forgot;