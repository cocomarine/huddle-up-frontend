import React, { useState } from "react";
import { MdReorder } from "react-icons/md";
import "../styles/navbar.css";


const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="navbar">
      <div className="left-side">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/myevents"> My Events</a>
          <a href="/myprofile"> My Profile</a>
          <a href="/signup">Sign up</a>
          {/* <a href="/"> Sign Out</a> */}
        </div>
        <div className="nav-button" onClick={() => setShowLinks(!showLinks)} >
          < MdReorder size="2.5rem" color="white"/>
        </div>
      </div>
      {/* <div className="right-side">
        <input type="text" placeholder="Search..."></input>
        <button>Search</button>
      </div> */}
    </div>
  );
};

export default Navbar;
