import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import "./Dashboard.css";

const AdminDB = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totallectures: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  async function fetchStats() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setStats(data.Stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="admin-dashboard">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <div className="stats-grid">
          <StatBox 
            title="Total Courses" 
            value={stats.totalCourses} 
            icon="📚" 
            loading={loading}
          />
          <StatBox 
            title="Total Lectures" 
            value={stats.totallectures} 
            icon="🎥"
            loading={loading}
          />
          <StatBox 
            title="Total Users" 
            value={stats.totalUsers} 
            icon="👥"
            loading={loading}
          />
        </div>
      </div>
    </Layout>
  );
};

const StatBox = ({ title, value, icon, loading }) => (
  <div className="stat-box">
    <div className="stat-icon">{icon}</div>
    <h3>{title}</h3>
    {loading ? (
      <div className="loading-bar"></div>
    ) : (
      <p className="stat-value">{value}</p>
    )}
  </div>
);

export default AdminDB;