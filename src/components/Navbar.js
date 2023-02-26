import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/navbar.css";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Home from "./Home";
import MyProfile from "./MyProfile";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left-side">
      <div className="links">
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/myevents"> My Events</a>
          <a href="/myprofile"> My Profile</a>
          <a href="/signup">Sign up</a>
          {/* <a href="/"> Sign Out</a> */}
        </div>
        <button>Open</button>
      </div>
      <div className="right-side">
        <input type="text" placeholder="Search..."></input>
        <button>Search</button>
        
      </div>
    </div>
  );
};

export default Navbar;
