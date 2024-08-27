import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo">BookStore</div>
      </div>
      <ul className="navbar-links">
        <div
          className="option-btn"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </div>
        <div
          className="option-btn"
          onClick={() => {
            navigate("/favorite");
          }}
        >
          My Favorite
        </div>
        <div
          className="option-btn"
          onClick={() => {
            navigate("/about");
          }}
        >
          About Us
        </div>
        <div
          className="option-btn"
          onClick={() => {
            navigate("/create");
          }}
        >
         Add Book
        </div>
        <a
          className="option-btn"
          href="mailto:ayatalmomani665@gmail.com?subject=Contact&body=Hello, I would like to get in touch regarding..."
        >
          Contact
        </a>
      </ul>
      <div className="navbar-auth">
        <div
          className="auth-btn"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </div>
        <div
          className="auth-btn register-btn"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
