import React, { useState } from "react";
import Input from "../../CoreComponent/Input";
import axiosInstance from "../../common/http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    const url = "http://127.0.0.1:8000/api/login";
    const userData = {
      email,
      password,
    };

    try {
      const response = await axiosInstance.post(url, userData);
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        console.log(token);
        
      }
      toast.success(response?.data?.message || "Login successful");
      navigate("/"); // أو أي مسار تود توجيه المستخدم إليه بعد تسجيل الدخول
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let errorEmail = "";
    let errorPassword = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errorEmail = "Please enter your email.";
    } else if (!emailRegex.test(email)) {
      errorEmail = "Please enter a valid email.";
    }

    if (!password) {
      errorPassword = "Please enter your password.";
    }

    setError({
      email: errorEmail,
      password: errorPassword,
    });

    if (email && emailRegex.test(email) && password) {
      setError({
        email: "",
        password: "",
      });
      login();
    }
  };

  return (
    <div className="login-page-container">
      <form onSubmit={handleLogin} className="login-form">
        <div className="title">
          <span>Log in</span>
          <span
            className="sub-title"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </span>
        </div>
        <div className="note">Welcome back! Please enter your details</div>

        <div className="fields-container">
          <Input
            label={"Email"}
            placeholder={"e.g. example@example.com"}
            inputValue={email}
            setInputValue={setEmail}
            required={true}
            errorMsg={error.email}
          />
          <Input
            label={"Password"}
            placeholder={"Your password"}
            inputValue={password}
            setInputValue={setPassword}
            required={true}
            errorMsg={error.password}
            type="password"
          />
        </div>
        <div className="login-btn-container">
          <button className="login-btn" type="submit" 
>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;