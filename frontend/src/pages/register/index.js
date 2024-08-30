import React, { useState } from "react";
import Input from "../../CoreComponent/Input";
import axiosInstance from "../../common/http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.scss";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCon, setPasswordCon] = useState("");

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    passwordCon:""
  });

  const register = async () => {
    const url = "http://127.0.0.1:8000/api/register";
    const userData = {
      name: name,
      email,
      password,
      password_confirmation : passwordCon,
    };


    try {
      const response = await axiosInstance.post(url, userData);
      if (
        response.data.success === true &&
        response.data.message === "Account Created Successfully"
      ) {
        toast.success(response.data.message);
        navigate("/login"); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let errorName = "";
    let errorEmail = "";
    let errorPassword = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      errorName = "Please enter your name.";
    }
    if (!email) {
      errorEmail = "Please enter your email.";
    } else if (!emailRegex.test(email)) {
      errorEmail = "Please enter a valid email.";
    }
    if (!password) {
      errorPassword = "Please enter your password.";
    }

    setError({
      name: errorName,
      email: errorEmail,
      password: errorPassword,
    });

    if (name && email && emailRegex.test(email) && password) {
      setError({
        name: "",
        email: "",
        password: "",
      });
      register();
    }
  };

  return (
    <div className="register-page-container">
      <form onSubmit={handleRegister} className="register-form">
        <div className="title">
          <span>Sign Up</span>
          <span className="sub-title" onClick={()=>{
            navigate("/login")
          }}>login</span>
        </div>
        <div className="note">
          Create your account by filling the form below
        </div>

        <div className="fields-container">
          <Input
            label={"Name"}
            placeholder={"e.g. John Doe"}
            inputValue={name}
            setInputValue={setName}
            required={true}
            errorMsg={error.name}
          />
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
              <Input
            label={"Password  Confirmation"}
            placeholder={"password Confirmation"}
            inputValue={passwordCon}
            setInputValue={setPasswordCon}
            required={true}
            // errorMsg={error.password}
            type="password"
          />
        </div>
        <div className="register-btn-container">
          <button className="register-btn" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
