import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Verify account</h2>
        </div>
        <form className="auth-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button disabled={btnLoading} className="common-btn">
            {btnLoading ? "Please wait... " : "Verify"}
          </button>
          <div className="auth-footer">
            <p>
              Go to
              <Link className="auth-link" to="/login">
                Login
              </Link>{" "}
              page
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify;
