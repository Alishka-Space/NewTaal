import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-item">
        <h3 className="footer-item-title">Support</h3>
        <ul className="footer-item-list">
          <li className="footer-item-link">Contact Us</li>
          <li className="footer-item-link">Become a supplier</li>
          <li className="footer-item-link">Become a Partner</li>
        </ul>
      </div>
      <div className="footer-item">
        <h3 className="footer-item-title">Links</h3>
        <ul className="footer-item-list">
          <li className="footer-item-link">About Us</li>
          <li className="footer-item-link">Privacy Police</li>
          <li className="footer-item-link">Term of Use</li>
        </ul>
      </div>
      <div className="footer-item">
        <div className="footer-icons">
          <div className="icon">
            <i style={{ color: "#d35400" }} className="bi bi-instagram"></i>
          </div>
          <div className="icon">
            <i style={{ color: "#2980b9" }} className="bi bi-facebook"></i>
          </div>
          <div className="icon">
            <i style={{ color: "#3498db" }} className="bi bi-twitter"></i>
          </div>
          <div className="icon">
            <i style={{ color: "#95a5a6" }} className="bi bi-github"></i>
          </div>
        </div>
        <div className="footer-copy-right">Copyright &copy; TaalCoach</div>
      </div>
    </footer>
  );
};

export default Footer;
