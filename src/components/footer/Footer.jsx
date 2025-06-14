import React from 'react'
import "./footer.css"
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";



const Footer = () => {
  return (
    <footer className="portfolio-footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3>EduSphere Learning</h3>
          <p>Thank you for choosing our e-learning platform. Connect with us over socials.</p>
          <div className="social-links">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaGithubSquare /></a>
          </div>
          <div className="live-chat">
            <HiOutlineChatAlt2 />
            <span>Connect with us over live chat!</span>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="contact-info">
            <li>+91 8088125484</li>
            <li>lohithlplohith@gmail.com</li>
            <li>Bengaluru,India </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EduSphere. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer