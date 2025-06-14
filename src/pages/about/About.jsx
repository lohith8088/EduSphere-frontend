import React from "react";
import "./about.css";
import { FaChalkboardTeacher, FaCertificate, FaUserGraduate } from "react-icons/fa";
import { MdOutlineDiversity3 } from "react-icons/md";

const About = () => {
  return (
    <div className="about">
      <div className="about-hero">
        <h1>Empowering Your Learning Journey</h1>
        <p>Discover how EduSphere transforms education through innovation and excellence</p>
      </div>

      <div className="about-content">
        <div className="about-main">
          <h2>Our Story</h2>
          <p>
            Founded in 2023, EduSphere began with a simple mission: to make quality education 
            accessible to everyone, everywhere. What started as a small team of passionate 
            educators has grown into a platform serving thousands of learners worldwide.
          </p>
          <p>
            We believe learning should be engaging, practical, and tailored to individual needs. 
            Our courses combine expert knowledge with interactive experiences to ensure real 
            skill development.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <FaChalkboardTeacher className="feature-icon" />
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals with years of practical experience</p>
          </div>

          <div className="feature-card">
            <FaCertificate className="feature-icon" />
            <h3>Certified Courses</h3>
            <p>Earn recognized certifications to boost your career</p>
          </div>

          <div className="feature-card">
            <MdOutlineDiversity3 className="feature-icon" />
            <h3>Diverse Community</h3>
            <p>Join learners from across the globe in collaborative learning</p>
          </div>

          <div className="feature-card">
            <FaUserGraduate className="feature-icon" />
            <h3>Career Support</h3>
            <p>Get job placement assistance and career guidance</p>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <h4>50+</h4>
            <p>Courses Available</p>
          </div>
          <div className="stat-item">
            <h4>10,000+</h4>
            <p>Students Enrolled</p>
          </div>
          <div className="stat-item">
            <h4>95%</h4>
            <p>Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;