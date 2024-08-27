import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import "./style.scss";
import NavBar from "./components/Navbar";
import MyFavorite from "./pages/myFavorite";
import AboutUs from "./pages/aboutUs";
import CreateNewBook from "./pages/createBook";

const App = () => {
  useEffect(() => {
    const handleScroll = () => {
      console.log("rrrrrr");
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        console.log("hiii");
      }
    };

    const container = document.getElementById("main");
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div id="main" className="main">
      <ToastContainer />
      <NavBar />
      <Routes className="main">
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/favorite" element={<MyFavorite />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/create" element={<CreateNewBook />} />

      </Routes>
    </div>
  );
};

export default App;
