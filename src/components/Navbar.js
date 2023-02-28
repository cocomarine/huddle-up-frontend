import React, { useState } from "react";
import { MdReorder } from "react-icons/md";
import { Link, Router,  } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="navbar">
      <div className="left-side">
        <div className="links" id={showLinks ? "hidden" : ""}>

          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/myprofile"> My Profile</Link>
          <Link to="/signup">Sign up</Link>
          <Link to="/joinevents"> Join Events</Link>
          <Link to="/myevents"> My Events</Link>
        </div>
        <div className="nav-button" onClick={() => setShowLinks(!showLinks)}>
          <MdReorder size="2.5rem" color="white" />
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
